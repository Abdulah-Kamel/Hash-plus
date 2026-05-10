import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitQuiz } from "@/actions/submissionActions";
import { toast } from "sonner";

const QuizViewer = ({ module, courseId, contentType }) => {
  const questions = module?.quiz || module?.quizData || [];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex, optionText) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optionText
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Construct the submission payload
    const submissionData = questions.map((q, index) => ({
      _id: q._id || q.id,
      question: q.question,
      answer: selectedAnswers[index]
    }));

    const res = await submitQuiz(
      courseId, 
      contentType, 
      module.sectionId, 
      module._id || module.id, 
      submissionData
    );

    if (res.success) {
      toast.success("تم تسليم الاختبار بنجاح");
      setSubmitted(true);
    } else {
      toast.error(res.error || "حدث خطأ أثناء تسليم الاختبار");
    }
    
    setIsSubmitting(false);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500">لا يوجد أسئلة في هذا الاختبار</p>
      </div>
    );
  }

  // Calculate score locally if answers are available
  let score = 0;
  if (submitted) {
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score++;
    });
  }

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
        {module.description && (
          <p className="text-gray-600 mt-2">{module.description}</p>
        )}
      </div>

      {submitted && (
        <Card className="border-green-200 bg-green-50 shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">تم تسليم الاختبار</h3>
            <p className="text-green-700">النتيجة: {score} من {questions.length}</p>
          </CardContent>
        </Card>
      )}

      {questions.map((q, index) => {
        const isCorrect = submitted && selectedAnswers[index] === q.answer;
        const isWrong = submitted && selectedAnswers[index] !== q.answer;

        return (
          <Card key={index} className={`border ${isCorrect ? 'border-green-300' : isWrong ? 'border-red-300' : 'border-gray-200'} shadow-sm rounded-xl overflow-hidden`}>
            <CardHeader className={`${isCorrect ? 'bg-green-50' : isWrong ? 'bg-red-50' : 'bg-gray-50'} py-4 flex items-center gap-2`}>
              <span className="py-1 px-3 bg-white font-light rounded-full w-fit shadow-sm text-sm">
                {index + 1}
              </span>
              <p className="text-right flex-1 font-medium">{q.question}</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {q.options?.map((option, optIdx) => {
                const isSelected = selectedAnswers[index] === option;
                return (
                  <div key={optIdx} className="flex items-center gap-3">
                    <Checkbox
                      id={`q-${index}-opt-${optIdx}`}
                      className="h-5 w-5 rounded-full"
                      checked={isSelected}
                      disabled={submitted}
                      onCheckedChange={() => handleOptionChange(index, option)}
                    />
                    <Label
                      htmlFor={`q-${index}-opt-${optIdx}`}
                      className={`text-right flex-1 cursor-pointer leading-relaxed ${submitted && option === q.answer ? 'text-green-600 font-bold' : ''}`}
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {!submitted && (
        <div className="flex justify-end mt-8">
          <Button
            className="px-10 py-6 rounded-full text-lg bg-primary hover:bg-primary/90 text-white"
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(selectedAnswers).length < questions.length}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال الإجابات"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizViewer;
