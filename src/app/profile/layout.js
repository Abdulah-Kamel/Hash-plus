"use client";
import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import ProfileSideBar from "@/components/profile/ProfileSideBar";

export default function ProfileLayout({ children }) {
  return (
    <>
      <NavBar />
      <Container className="py-12">
        <h1 className="font-bold text-2xl lg:text-3xl">الملف الشخصى</h1>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="col-span-1">
            <ProfileSideBar />
          </div>
          <div className="col-span-2">
            {children}
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}