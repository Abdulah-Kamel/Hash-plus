import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginForm from "@/components/login/loginForm";
import {NavBar} from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "تسجيل الدخول",
  description: "سجل دخولك إلى حسابك في Hash Plus للوصول إلى دوراتك المسجل بها ومتابعة تقدمك التعليمي.",
  keywords: [
    "تسجيل الدخول",
    "دخول الحساب",
    "تسجيل دخول Hash Plus",
    "الوصول للحساب",
    "دوراتي",
    "حسابي"
  ],
  openGraph: {
    title: "Hash Plus - تسجيل الدخول",
    description: "سجل دخولك للوصول إلى دوراتك ومتابعة تقدمك التعليمي",
    url: "https://hashplus.com/login",
    images: [
      {
        url: "/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "Hash Plus - تسجيل الدخول",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
};
import Container from "@/components/container";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link";
import Image from "next/image";
import googleIcon from "@/assets/google-icon.svg";
import LoginCard from "@/components/login/loginCard";
export default function loginPage() {
    return (
        <>
            <NavBar/>
            <Container className="my-6 flex justify-center items-center  py-12">
                <LoginCard/>
            </Container>
            <Footer/>
        </>
            )
}
