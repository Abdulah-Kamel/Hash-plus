import {NavBar} from "@/components/navbar";
import Hero from "@/components/hero";
import {LogoCarousel} from "@/components/shared";
import Features from "@/components/features";
import Courses from "@/components/courses";
import Categories from "@/components/categories";
import Growth from "@/components/growth";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import OnlineCourses from "@/components/online-courses";
import Cta from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
     <>
         <NavBar/>
         <Hero/>
         <LogoCarousel />
         <Features />
         <Courses />
         <Categories/>
         <Growth/>
         <Testimonials/>
         <Faq />
         <OnlineCourses />
         <Cta />
         <Footer />
     </>
      );
}
