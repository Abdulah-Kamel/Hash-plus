import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import OtpForm from "@/components/otp/otpForm";
import {NavBar} from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Link from "next/link";
import {Mail} from "lucide-react";

export const metadata = {
  title: "تأكيد الحساب - رمز التحقق",
  description: "أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لتأكيد حسابك وإكمال عملية التسجيل في Hash Plus.",
  keywords: [
    "تأكيد الحساب",
    "رمز التحقق",
    "OTP",
    "تفعيل الحساب",
    "تأكيد البريد الإلكتروني",
    "رمز الأمان"
  ],
  openGraph: {
    title: "Hash Plus - تأكيد الحساب",
    description: "أدخل رمز التحقق لتأكيد حسابك وإكمال التسجيل",
    url: "https://hashplus.com/otp",
    images: [
      {
        url: "/og-otp.jpg",
        width: 1200,
        height: 630,
        alt: "Hash Plus - تأكيد الحساب",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OtpPage() {
    return (
        <>
            <NavBar/>
            <Container className="my-6 flex justify-center items-center py-12">
                <Card className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">ارسلنا اليك رمز التحقق</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Mail className="text-secondary w-14 sm:w-25 h-14 sm:h-25 mx-auto mb-4"/>
                           <div className="text-center my-5 text-base font-light">
                               <p className="text-[#4B5675]">أدخل رمز التحقق المرسل عبر الايميل</p>
                               <p className="mt-2">mahmo****@gmail.com</p>
                           </div>
                        </div>
                        <OtpForm/>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <div className="mb-3 text-sm max-sm:text-xs">
                            لم يصلك الرمز؟ (37 ثانية)
                            <Link href="#" className="ms-2 text-primary hover:underline">ارسل مرة اخرى</Link>
                        </div>
                        <Button type="submit" className="w-full px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs">
                            تاكيد
                        </Button>
                    </CardFooter>
                </Card>
            </Container>
            <Footer/>
        </>
    )
}
