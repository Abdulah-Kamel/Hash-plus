"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, SaudiRiyal, ArrowLeft, Clock, BookOpen, Star, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { getCart, removeFromCart } from "@/actions/cartActions";
import { toast } from "sonner";
import Rating from "@/components/shared/Rating";
import courseProfile from "@/assets/courseProfile.png";

const CartPage = () => {
  const router = useRouter();
  const { items, removeItem, setItems, getTotal, coupon, applyCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Sync cart with backend
    const syncCart = async () => {
      setIsLoading(true);
      const res = await getCart();
      if (res.success && res.data) {
        // Assume backend returns { items: [{ bootcamp: {...} }] } or similar
        // For robustness, if the backend items are populated, we can map them.
        // If the backend items are just IDs, we might need to fetch details.
        // For now, if the API returns a 'cart' object with populated bootcamps:
        const cartData = res.data.cart || res.data;
        const backendItems = cartData.items || cartData.bootcamps || [];
        
        if (backendItems.length > 0) {
          const formattedItems = backendItems.map(item => {
            // Depending on backend structure, 'item' might be the bootcamp itself, or { bootcamp: {...} }
            const content = item.bootcamp || item.course || item;
            return {
              id: content._id || content.id,
              title: content.title || "دورة تدريبية",
              price: typeof content.price === 'object' ? content.price?.amount : (content.price || 0),
              thumbnail: content.thumbnail || content.image || null,
              contentType: content.contentType || (item.bootcamp ? "bootcamp" : "course"),
              instructor: content.instructor?.name || content.instructor || "ولاء القحطاني",
              instructorId: content.instructor?._id || content.instructorId || 1,
              rating: content.metadata?.avgRatings || content.rating || 0,
              duration: content.metadata?.duration || content.duration || 0,
              level: content.level || "beginner",
            };
          }).filter(i => i.id); // filter out invalid mappings
          
          if (formattedItems.length > 0) {
             setItems(formattedItems);
          }
        } else {
          // If backend cart is empty, clear local items (or keep local if we want to push local to backend, but usually backend wins)
          // For now, let backend be the source of truth
          setItems([]);
        }
      }
      setIsLoading(false);
    };
    
    syncCart();
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  const totalAmount = getTotal();

  // If cart is empty
  if (items.length === 0) {
    return (
      <Container className="py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800">جاري تحميل السلة...</h2>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">السلة فارغة</h2>
            <p className="text-gray-500 mb-8">ليس لديك أي عناصر في السلة حالياً.</p>
            <Button onClick={() => router.push("/shop")} className="rounded-full px-8 py-6 text-lg cursor-pointer">
              تصفح الدورات
            </Button>
          </>
        )}
      </Container>
    );
  }

  const handleRemoveItem = async (id) => {
    // Optimistic UI update
    removeItem(id);
    
    // Call backend API
    const res = await removeFromCart(id);
    if (!res.success) {
      toast.error("حدث خطأ أثناء إزالة العنصر من السلة");
      // Ideally we would rollback, but we can just let the next sync fix it
    } else {
      toast.success("تم إزالة العنصر من السلة");
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      // Backend validation would go here later
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">سلة الشراء</h1>
          <p className="text-gray-600 font-medium">{items.length} محتويات في السلة</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Order Summary Sidebar (Left Side in RTL) */}
          <div className="w-full lg:w-[350px] flex-shrink-0 order-2 lg:order-1">
            <div className="bg-gray-50/80 rounded-2xl p-6 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">ملخص الطلب</h2>
              
              <div className="flex justify-between items-center text-gray-600 font-medium mb-6">
                <span>مجموع المنتجات × {items.length}</span>
                <div className="flex items-center gap-1 font-bold">
                  <span>{totalAmount}</span>
                  <SaudiRiyal className="w-4 h-4" />
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl font-black text-gray-900 mb-8">
                <span>الإجمالي</span>
                <div className="flex items-center gap-1">
                  <span>{totalAmount}</span>
                  <SaudiRiyal className="w-6 h-6" />
                </div>
              </div>

              <Button 
                onClick={() => router.push("/payment")}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-bold mb-8 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                أكمل الطلب
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">تفعيل كوبون</h4>
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-white border-gray-200 focus-visible:ring-primary rounded-full h-12 text-center flex-1" 
                    placeholder="اكتب الكوبون"
                    dir="ltr"
                  />
                  <Button 
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    className="bg-[#7c8efc] text-white hover:bg-primary h-12 px-6 rounded-full cursor-pointer font-medium"
                  >
                    تفعيل
                  </Button>
                </div>
                {coupon && (
                  <p className="text-sm text-green-600 mt-3 font-medium text-center bg-green-50 py-2 rounded-lg">
                    ✓ تم تفعيل الكوبون ({coupon})
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cart Items List (Right Side in RTL) */}
          <div className="flex-1 order-1 lg:order-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 relative overflow-hidden transition-shadow hover:shadow-md">
                
                {/* Delete Button (Top Left) */}
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-4 left-4 p-2 rounded-full border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer z-10"
                  aria-label="حذف المنتج"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Thumbnail */}
                <div className="relative w-full sm:w-[140px] h-[140px] sm:h-auto rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50">
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/50 font-bold text-xl bg-primary/10">
                      {item.contentType === "bootcamp" ? "معسكر" : "دورة"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col py-1 pr-2 sm:pr-0">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="rounded-full border-gray-300 font-normal px-3">
                      {item.contentType === "bootcamp" ? "معسكر" : "دورة"}
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-gray-300 font-normal px-3">
                      {item.level === "beginner" ? "مبتدئ" : item.level === "intermediate" ? "متوسط" : item.level === "advanced" ? "متقدم" : "برمجة"}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight pr-0 sm:pr-2">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#a855f7] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">الأعلى تقييماً</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-700">{item.rating?.toFixed(1) || "4.5"}</span>
                      <Rating rating={item.rating || 4.5} />
                      <span className="text-xs text-gray-500">(625)</span>
                    </div>
                  </div>

                  {/* Instructor & Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Image 
                        src={courseProfile} 
                        alt="المعلم" 
                        width={20} 
                        height={20} 
                        className="rounded-full bg-gray-100"
                      />
                      <span>{item.instructor || "ولاء القحطاني"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{item.duration || 40} ساعة</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>متوفر</span>
                    </div>
                  </div>
                </div>

                {/* Price (Bottom Left) */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-2xl font-black text-gray-900">
                  <span>{item.price === 0 ? "مجاناً" : item.price}</span>
                  {item.price > 0 && <SaudiRiyal className="w-5 h-5 text-gray-700" />}
                </div>

              </div>
            ))}
          </div>

        </div>
      </Container>
    </div>
  );
};

export default CartPage;
