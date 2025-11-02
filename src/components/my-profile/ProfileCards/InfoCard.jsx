import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Edit2,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import blogImage from "@/assets/BlogImage.png";
const InfoCard = ({ progress = 80 }) => {
  return (
    <Card className="px-5 py-0">
      <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <div className="col-span-1">
          <div className="border-b py-3">
            <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
              <h3 className="font-normal text-xl">اكتمال الملف</h3>
              <Progress value={progress} className="h-1" dir="rtl" />
              <p className="text-muted-foreground font-normal flex justify-between items-center">
                <span>نسبة الاكتمال</span>
                <span>{progress}%</span>
              </p>
            </div>
          </div>
          <div className="border-b py-3">
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">اللغات</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <Plus className="size-5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <Edit2 className="size-5 text-primary" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      العربية:
                      <span className="text-muted-foreground ms-1">
                        اللغة الأم
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-medium">
                      الأنجليزية:
                      <span className="text-muted-foreground ms-1">محترف</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b py-3">
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">التعليم</h3>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <Plus className="size-5 text-primary" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mediu text-lg">جامعة الملك فهد</h4>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                      >
                        <Trash2 className="size-5 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 className="size-5 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-normal">
                    كلية التصميم، قسم تصميم جرافيك
                  </p>
                  <p className="text-muted-foreground text-sm">2019 - 2024</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b py-3">
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">التعليم</h3>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <Plus className="size-5 text-primary" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mediu text-lg">جامعة الملك فهد</h4>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                      >
                        <Trash2 className="size-5 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 className="size-5 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-normal">
                    كلية التصميم، قسم تصميم جرافيك
                  </p>
                  <p className="text-muted-foreground text-sm">2019 - 2024</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b py-3">
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">المهارات</h3>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <Edit2 className="size-5 text-primary" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-3" dir="rtl">
                  {/* First row - 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Adobe Photoshop
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Adobe Photoshop
                    </Badge>
                  </div>

                  {/* Remaining rows - 3 columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Adobe XD
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Adobe XD
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Lovart
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Figma
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Miro
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 border-s px-4">
          <div className="py-5 space-y-6 border-b">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">الوصف الذاتى</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                >
                  <Edit2 className="size-5 text-primary" />
                </Button>
              </div>
              <div className="text-right space-y-3">
                <p className="text-muted-foreground leading-8 font-normal">
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا
                  النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
                  التي يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات
                  يتيح لك مولد النص العربي زيادة عدد الفقرات كما تريد، النص لن
                  يبدو مقسماً ولا يحوي أخطاءً لغوية، مولد النص العربي مفيد
                  لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل في كثير من
                  الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
                </p>
              </div>
            </div>
          </div>
          <div className="py-5 space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-normal text-xl">المشاريع</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-10 w-10 rounded-full border border-primary hover:bg-gray-100 cursor-pointer"
                  >
                    <ArrowUpDown className="size-5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2 h-10 rounded-full border border-primary text-primary hover:text-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <span className="text-sm">أضف مشروع جديد</span>
                    <Plus className="size-5" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="overflow-hidden border-0 shadow-none gap-4">
                  <Image
                    src={blogImage}
                    alt="Project 1"
                    className="w-full h-60 object-cover rounded-xl"
                  />
                  <CardContent className="p-0">
                    <h4 className="font-medium text-lg text-gray-900 text-right">
                      مشروع Hash Plus
                    </h4>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-0 shadow-none gap-4">
                  <Image
                    src={blogImage}
                    alt="Project 1"
                    className="w-full h-60 object-cover rounded-xl"
                  />
                  <CardContent className="p-0">
                    <h4 className="font-medium text-lg text-gray-900 text-right">
                      مشروع Hash Plus
                    </h4>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-0 shadow-none gap-4">
                  <Image
                    src={blogImage}
                    alt="Project 1"
                    className="w-full h-60 object-cover rounded-xl"
                  />
                  <CardContent className="p-0">
                    <h4 className="font-medium text-lg text-gray-900 text-right">
                      مشروع Hash Plus
                    </h4>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 h-12 w-12 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <ChevronRight className="size-5 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 h-12 w-12 rounded-2xl border border-primary bg-primary/10 text-primary cursor-pointer"
                >
                  <span>1</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 h-12 w-12 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-gray-600">2</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 h-12 w-12 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <ChevronLeft className="size-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
