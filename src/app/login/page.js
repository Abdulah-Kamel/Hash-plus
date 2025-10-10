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
export default function loginPage() {
    return (
        <>
            <NavBar/>
            <Container className="my-6 flex justify-center items-center  py-12">
                <Tabs dir="rtl" defaultValue="student" className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
                <h1 className="mb-3 font-bold sm:text-xl">تسجيل الدخول</h1>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger className="rounded-2" value="student">تقنى</TabsTrigger>
                        <TabsTrigger value="teacher">معلم</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student" className="mt-2">
                        <Card className="w-full max-w-2xl border-none shadow-none">
                            <CardContent>
                                <LoginForm/>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button type="submit" className="w-full px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs">
                                    تسجيل الدخول
                                </Button>
                                <Button variant="outline" className="w-full px-5 py-2 sm:py-6 rounded-lg mt-2 max-sm:text-xs">
                                  تسجيل الدخول عن طريق جوجل
                                    <Image src={googleIcon} alt="google logog icon" className="h-5 w-5"/>
                                </Button>
                                <div className="mt-3 max-sm:text-xs">
                                    ليس لديك حساب؟
                                <Link href="/register" className="ms-2 text-primary hover:underline">انشاء حساب جديد</Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="teacher" className="mt-2">
                        <Card className="w-full max-w-2xl border-none shadow-none">
                            <CardContent>
                                <LoginForm/>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button type="submit" className="w-full px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs">
                                    تسجيل الدخول
                                </Button>
                                <Button variant="outline" className="w-full px-5 py-2 sm:py-6 rounded-lg mt-2 max-sm:text-xs">
                                    تسجيل الدخول عن طريق جوجل
                                    <Image src={googleIcon} alt="google logog icon" className="h-5 w-5"/>
                                </Button>
                                <div className="mt-3 max-sm:text-xs">
                                    ليس لديك حساب؟
                                    <Link href="/register" className="ms-2 text-primary hover:underline">انشاء حساب جديد</Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    </Tabs>
            </Container>
            <Footer/>
        </>
            )
}
