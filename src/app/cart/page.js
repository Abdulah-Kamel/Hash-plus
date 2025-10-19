import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { coursesData } from "@/data/coursesData";
import React from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

const CartPage = () => {
  return (
    <>
      <NavBar />
      <Container className="py-4">
        <div>
          <h1 className="text-3xl">سلة الشراء</h1>
          <p className="mt-4">4 محتويات فى السة</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 max-sm:place-items-center mt-4 gap-4">
          <div className="col-span-2 space-y-4">
            {coursesData.slice(0, 3).map((course) => (
              <CartItem key={course.id} course={course} />
            ))}
          </div>
          <div className="col-span-1">
              <OrderSummary/>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
