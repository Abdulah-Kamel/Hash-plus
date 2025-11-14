import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MultipleChoiceQuestion = ({
  question,
  questionIndex,
  selectedAnswers,
  onAnswerChange,
}) => {
  const handleOptionChange = (optionId, isChecked) => {
    const currentAnswers = selectedAnswers[question._id] || [];
    let newAnswers;

    if (isChecked) {
      newAnswers = [...currentAnswers, optionId];
    } else {
      newAnswers = currentAnswers.filter((id) => id !== optionId);
    }

    onAnswerChange(question._id, newAnswers);
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
        {question.options?.map((option, optionIndex) => {
          const isSelected = (selectedAnswers[question._id] || []).includes(
            option._id
          );

          return (
            <div key={option._id} className="flex items-center gap-3">
              <Checkbox
                id={`question-${question._id}-option-${option._id}`}
                className="h-6 w-6 rounded-full"
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleOptionChange(option._id, checked)
                }
              />
              <Label
                htmlFor={`question-${question._id}-option-${option._id}`}
                className="text-right flex-1 cursor-pointer"
              >
                {option.text}
              </Label>
            </div>
          );
        })}

        {question.explanation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-right">
              <strong>تفسير:</strong> {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultipleChoiceQuestion;
