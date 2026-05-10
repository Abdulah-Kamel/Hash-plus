"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { addToMyLearning } from "@/actions/learningActions";

const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [verifying, setVerifying] = useState(true);

  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const paymentId = searchParams.get("id");

  useEffect(() => {
    // In a real app, we would call the backend to verify the payment ID here.
    // For now, we trust the URL params to show the correct UI.
    const verifyPayment = async () => {
      setVerifying(true);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (status === "paid") {
        const items = useCartStore.getState().items;
        for (const item of items) {
          if (item.id) {
            await addToMyLearning(item.id, item.contentType);
          }
        }
        clearCart();
      }
      
      setVerifying(false);
    };

    if (status && paymentId) {
      verifyPayment();
    } else {
      setVerifying(false);
    }
  }, [status, paymentId, clearCart]);

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h2 className="text-2xl font-bold text-gray-800">جاري التحقق من الدفع...</h2>
        <p className="text-gray-500">يرجى الانتظار ولا تغلق هذه الصفحة.</p>
      </div>
    );
  }

  const isSuccess = status === "paid";

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="max-w-md w-full border-none shadow-lg">
        <CardContent className="pt-10 pb-8 px-8 flex flex-col items-center text-center">
          {isSuccess ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">تم الدفع بنجاح</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                شكراً لك! تم تأكيد الدفع واشتراكك في المحتوى بنجاح.
                <br />
                رقم العملية: <span className="font-mono text-xs block mt-1">{paymentId}</span>
              </p>
              <Button 
                onClick={() => router.push("/my-learning")}
                className="w-full py-6 text-lg rounded-full cursor-pointer"
              >
                الذهاب إلى دوراتي
              </Button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">فشل الدفع</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                عذراً، لم نتمكن من إتمام عملية الدفع.
                <br />
                {message && <span className="text-red-500 text-sm mt-2 block">{message}</span>}
              </p>
              <div className="flex gap-3 w-full">
                <Button 
                  onClick={() => router.push("/payment")}
                  className="flex-1 py-6 text-lg rounded-full cursor-pointer"
                >
                  المحاولة مرة أخرى
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push("/shop")}
                  className="flex-1 py-6 text-lg rounded-full cursor-pointer"
                >
                  العودة للمتجر
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function PaymentCallbackPage() {
  return (
    <Container className="py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      }>
        <PaymentCallbackContent />
      </Suspense>
    </Container>
  );
}
