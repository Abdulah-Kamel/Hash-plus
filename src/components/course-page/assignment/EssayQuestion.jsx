import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EssayQuestion = ({
  question,
  questionIndex,
  selectedAnswers,
  onAnswerChange,
}) => {
  const handleAnswerChange = (value) => {
    onAnswerChange(question._id, value);
  };

  return (
    <Card className="p-0">
      <CardHeader className="bg-gray-100 py-4 rounded-t-xl flex items-center gap-2">
        <span className="py-1 px-3 bg-white font-light rounded-full w-fit">
          {questionIndex + 1}
        </span>
        <p className="text-right flex-1">{question.question}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{question.points} نقطة</span>
          <span
            className={`px-2 py-1 rounded-full ${
              question.difficulty === "easy"
                ? "bg-green-100 text-green-800"
                : question.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {question.difficulty === "easy"
              ? "سهل"
              : question.difficulty === "medium"
              ? "متوسط"
              : "صعب"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`essay-${question._id}`} className="text-right block">
            اكتب إجابتك هنا:
          </Label>
          <Textarea
            id={`essay-${question._id}`}
            placeholder="اكتب إجابتك التفصيلية هنا..."
            className="min-h-32 text-right"
            dir="rtl"
            value={selectedAnswers[question._id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>

        <div className="text-xs text-gray-500 text-right">
          <p>الحد الأدنى: 50 كلمة | الحد الأقصى: 500 كلمة</p>
          <p>
            عدد الكلمات الحالي:{" "}
            {
              (selectedAnswers[question._id] || "")
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }
          </p>
        </div>

        {question.explanation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-right">
              <strong>إرشادات:</strong> {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EssayQuestion;
