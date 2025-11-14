import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TrueFalseQuestion = ({
  question,
  questionIndex,
  selectedAnswers,
  onAnswerChange,
}) => {
  const selectedAnswer = selectedAnswers[question._id];

  const handleAnswerSelect = (answer) => {
    onAnswerChange(question._id, answer);
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
      <CardContent className="p-4">
        <div className="flex gap-4 justify-center">
          <Button
            variant={selectedAnswer === true ? "default" : "outline"}
            className={`px-8 py-3 rounded-full ${
              selectedAnswer === true
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-green-600 text-green-600 hover:bg-green-50"
            }`}
            onClick={() => handleAnswerSelect(true)}
          >
            صحيح
          </Button>
          <Button
            variant={selectedAnswer === false ? "default" : "outline"}
            className={`px-8 py-3 rounded-full ${
              selectedAnswer === false
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border-red-600 text-red-600 hover:bg-red-50"
            }`}
            onClick={() => handleAnswerSelect(false)}
          >
            خطأ
          </Button>
        </div>

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

export default TrueFalseQuestion;
