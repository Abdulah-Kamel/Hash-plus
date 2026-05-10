import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitTask } from "@/actions/submissionActions";
import { toast } from "sonner";

const TaskViewer = ({ module, courseId, contentType }) => {
  const taskUrl = module?.task?.url || module?.taskData?.url || module?.taskUrl || module?.url;
  
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url && !description) {
      toast.error("يرجى إدخال الرابط أو الوصف على الأقل");
      return;
    }

    setIsSubmitting(true);
    
    // image upload is omitted for simplicity unless requested
    const payload = {
      url,
      description
    };

    const res = await submitTask(
      courseId, 
      contentType, 
      module.sectionId, 
      module._id || module.id, 
      payload
    );

    if (res.success) {
      toast.success("تم تسليم المهمة بنجاح");
      setSubmitted(true);
    } else {
      toast.error(res.error || "حدث خطأ أثناء تسليم المهمة");
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="w-full space-y-6">
      <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{module.title}</h2>
          {module.description && (
            <p className="text-gray-600 max-w-lg mb-8">{module.description}</p>
          )}
          {taskUrl ? (
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2"
              onClick={() => window.open(taskUrl, '_blank')}
            >
              تحميل الملف / عرض المهمة
              <Download className="w-5 h-5 mr-2" />
            </Button>
          ) : (
            <p className="text-red-500">الملف غير متوفر</p>
          )}
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">تسليم المهمة</h3>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
              <h4 className="text-lg font-bold text-green-800 mb-2">تم تسليم المهمة بنجاح!</h4>
              <p className="text-green-700">يمكنك المتابعة إلى الدرس التالي.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-right block">رابط المشروع (اختياري)</label>
                <div className="relative">
                  <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    type="url" 
                    placeholder="https://..." 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pr-10 bg-gray-50 text-left"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 text-right block">ملاحظات / وصف (اختياري)</label>
                <Textarea 
                  placeholder="اكتب ملاحظاتك هنا..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 min-h-[120px]"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || (!url && !description)}
                  className="px-10 py-6 rounded-full text-lg bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmitting ? "جاري التسليم..." : "تسليم المهمة"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskViewer;
