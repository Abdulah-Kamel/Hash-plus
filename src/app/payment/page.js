"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, SaudiRiyal, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import MoyasarForm from "@/components/payment/MoyasarForm";
import { useAuth } from "@/hooks/useAuth";

// Helper to get cookie on client side
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const PaymentPage = () => {
  const router = useRouter();
  const { items, removeItem, getTotal, coupon, applyCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  console.log(items);

  useEffect(() => {
    if (loading) return;
    setMounted(true);
  }, [loading]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  const totalAmount = getTotal();

  // If cart is empty, redirect to shop
  if (items.length === 0) {
    return (
      <Container className="py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">السلة فارغة</h2>
        <p className="text-gray-500 mb-8">ليس لديك أي عناصر في السلة حالياً.</p>
        <Button
          onClick={() => router.push("/shop")}
          className="rounded-full px-8 py-6 text-lg cursor-pointer"
        >
          العودة للمتجر
        </Button>
      </Container>
    );
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      // Backend validation would go here
    }
  };

  const handlePaymentCompleted = async (payment) => {
    console.log("Payment completed from Moyasar:", payment);
    // Usually handled by the callback page, but just in case we can do logic here
  };

  // Generate description for Moyasar
  const orderDescription =
    items.length === 1
      ? `اشتراك: ${items[0].title}`
      : `طلب لـ ${items.length} دورات/معسكرات`;

  // Get user from cookie for customer_id
  let customer_id = "";
  try {
    customer_id = user?._id;
  } catch (e) {
    console.error("Error parsing user cookie:", e);
  }

  // Construct metadata as requested
  // type: ["platform", "bootcamp"], subscriptionName, plan_months, bootcampId, plan_amount, couponId, discountAmount, originalAmount
  const metadata = {
    customer_id,
    type: items[0]?.contentType === "bootcamp" ? "bootcamp" : "platform",
    subscriptionName: "platform",
    plan_months: 0, // Fallback if plan_months is needed
    bootcampId: items.map((item) => item.id), // Array of bootcamp IDs
    plan_amount: totalAmount,
    couponId: coupon || "",
    discountAmount: 0, // Update if coupon logic is implemented
    originalAmount: items.reduce((acc, item) => acc + (item.price || 0), 0),
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Checkout Header */}
      <div className="bg-white border-b border-gray-100 py-6 mb-8 shadow-sm">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                إتمام الدفع
              </h1>
            </div>
            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                دفع آمن ومشفر 100%
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Payment Methods Section */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  بيانات البطاقة
                </h2>
                <p className="text-gray-500 text-sm">
                  أدخل تفاصيل بطاقتك الائتمانية أو بطاقة مدى لإتمام الاشتراك
                </p>
              </div>
              <div className="p-6 md:p-8 bg-white">
                {totalAmount > 0 ? (
                  <div className="max-w-xl mx-auto">
                    <MoyasarForm
                      amount={totalAmount}
                      description={orderDescription}
                      metadata={metadata}
                      onCompleted={handlePaymentCompleted}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-green-50 text-green-700 p-6 rounded-2xl inline-block mb-6 w-full max-w-md border border-green-100">
                      <h3 className="text-xl font-bold mb-2">طلب مجاني</h3>
                      <p className="text-green-600">
                        هذا الطلب مجاني بالكامل ولا يتطلب إدخال بيانات دفع!
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          router.push(
                            "/payment/callback?status=paid&id=free_enrollment",
                          )
                        }
                        className="w-full max-w-sm rounded-full py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
                      >
                        تأكيد الاشتراك الآن
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">ملخص الطلب</h2>
              </div>

              <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0 group"
                    >
                      <div className="relative w-20 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-xs font-medium">
                            دورة
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-1.5">
                          <span className="text-sm font-bold text-primary">
                            {item.price === 0 ? "مجاناً" : item.price}
                          </span>
                          {item.price > 0 && (
                            <SaudiRiyal className="w-3.5 h-3.5 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="flex justify-between items-center text-[15px] text-gray-600 font-medium">
                    <span>المجموع الفرعي</span>
                    <div className="flex items-center gap-1">
                      <span>{totalAmount}</span>
                      <SaudiRiyal className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {coupon && (
                    <div className="flex justify-between items-center text-[15px] text-green-600 font-medium">
                      <span>الخصم (كوبون)</span>
                      <div className="flex items-center gap-1">
                        <span>0</span>
                        <SaudiRiyal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-2xl font-extrabold pt-4 text-gray-900 mt-2">
                    <span>الإجمالي</span>
                    <div className="flex items-center gap-1.5">
                      <span>{totalAmount}</span>
                      <SaudiRiyal className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-3 bg-gray-50 p-2 rounded-lg">
                    الأسعار تشمل ضريبة القيمة المضافة 15%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
/*
{
    "amount": 20000,
    "currency": "SAR",
    "description": "طلب لـ 2 دورات/معسكرات",
    "publishable_api_key": "pk_test_72n3qfTMQbUQoJteB8xJoFduH4JtQnopN4Y39fXM",
    "metadata": {
        "customer_id": "69fbaec9787d16c2b0cd40f1",
        "type": "bootcamp",
        "subscriptionName": "platform",
        "plan_months": 0,
        "bootcampId": [
            "69f25218891a3b2537bbfbe0",
            "69ef84ff4ee36f1a0ccb8148"
        ],
        "plan_amount": 200,
        "couponId": "",
        "discountAmount": 0,
        "originalAmount": 200
    },
    "callback_url": "http://localhost:3000/payment/callback",
    "source": {
        "type": "creditcard",
        "name": "test test",
        "number": "4201320111111010",
        "month": "02",
        "year": "28",
        "cvc": "235"
    }
}
*/
export default PaymentPage;
