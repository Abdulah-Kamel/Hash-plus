import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import RegisterForm from "@/components/register/registerForm";
import {NavBar} from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link";
import googleIcon from "@/assets/google-icon.svg"
import Image from "next/image";

export default function RegisterPage() {
    return (
        <>
            <NavBar/>
            <Container className="my-6 flex justify-center items-center py-12">
                <Card className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
                    <h1 className="mb-3 font-bold sm:text-xl">انشاء حساب جديد</h1>
                    <CardHeader>
                        <Tabs dir="rtl" defaultValue="student" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger className="rounded-2" value="student">تقنى</TabsTrigger>
                                <TabsTrigger value="teacher">معلم</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm/>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs">
                            إنشاء حساب
                        </Button>
                        <Button variant="outline" className="w-full px-5 py-2 sm:py-6 rounded-lg mt-2 max-sm:text-xs">
                            تسجيل الدخول عن طريق جوجل
                            <Image src={googleIcon} alt="google logog icon" className="h-5 w-5"/>
                        </Button>
                        <div className="mt-3 max-sm:text-xs">
                            لديك حساب بالفعل؟
                        <Link href="/login" className="ms-2 text-primary hover:underline">تسجيل الدخول</Link>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            <Footer/>
        </>
    )
}
