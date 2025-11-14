"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAssignment } from "./assignMentActions";
import { ArrowLeft, Clock, Award } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import EssayQuestion from "./EssayQuestion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Assignment = () => {
  const [assignment, setAssignment] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { assignmentId, id: courseId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAssignment = async () => {
      const res = await getAssignment(assignmentId);
      if (res.success) {
        setAssignment(res.data.data);
        if (res.data.data.timeLimit) {
          setTimeRemaining(res.data.data.timeLimit * 60); 
        }
      }
    };
    fetchAssignment();
  }, [assignmentId]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Submitting answers:", selectedAnswers);
    setIsSubmitting(false);
  };

  const handleBackToCourse = () => {
    router.push(`/course-page/${courseId}`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            key={question._id}
            question={question}
            questionIndex={index}
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
          />
        );
      case "true_false":
        return (
          <TrueFalseQuestion
            key={question._id}
            question={question}
            questionIndex={index}
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
          />
        );
      case "essay":
        return (
          <EssayQuestion
            key={question._id}
            question={question}
            questionIndex={index}
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
          />
        );
      default:
        return null;
    }
  };
  if (!assignment) {
    return (
      <div className="mt-7 flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الاختبار...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-7 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-right">{assignment.title}</h2>
          <p className="text-gray-600 text-right mt-1">
            {assignment.description}
          </p>
        </div>
        <Button
          variant="outline"
          className="font-normal px-8 py-3 rounded-full"
          onClick={handleBackToCourse}
        >
          العودة إلى الدورة
          <ArrowLeft className="size-5 mr-2" />
        </Button>
      </div>

      <Card className="my-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">الوقت المتبقي</p>
                <p className="font-bold text-lg">
                  {timeRemaining
                    ? formatTime(timeRemaining)
                    : `${assignment.timeLimit} دقيقة`}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">عدد الأسئلة</p>
                <p className="font-bold text-lg">{assignment.totalQuestions}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">درجة النجاح</p>
                <p className="font-bold text-lg">{assignment.passingScore}%</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">المحاولات المتاحة</p>
                <p className="font-bold text-lg">{assignment.maxAttempts}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {assignment.instructions && (
        <Card className="mb-6 px-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-right">
              تعليمات الاختبار
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-right leading-relaxed">
              {assignment.instructions}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {assignment.questions?.map((question, index) =>
          renderQuestion(question, index)
        )}
      </div>

حححح      <div className="flex justify-between items-center mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-right">
          <p className="text-sm text-gray-600">
            تم الإجابة على {Object.keys(selectedAnswers).length} من{" "}
            {assignment.totalQuestions} سؤال
          </p>
          {timeRemaining && timeRemaining < 300 && (
            <p className="text-red-600 text-sm font-medium">
              تحذير: يتبقى أقل من 5 دقائق!
            </p>
          )}
        </div>
        <Button
          className="px-12 py-3 rounded-full bg-primary hover:bg-primary/90"
          onClick={handleSubmit}
          disabled={isSubmitting || Object.keys(selectedAnswers).length === 0}
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال الإجابات"}
        </Button>
      </div>
    </>
  );
};

export default Assignment;
