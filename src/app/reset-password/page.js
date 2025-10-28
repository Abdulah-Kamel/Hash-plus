"use client"
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {NavBar} from "@/components/navbar";
import Container from "@/components/container";
import Footer from "@/components/footer";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {handleResetPassword} from "@/actions/resetPasswordAction";
import {toast} from "sonner";

const ResetPasswordPage = ({role}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formSchema = z.object({
        otp: z.string().min(4, "الرمز يجب أن يكون 4 أرقام"),
        newPassword: z.string().min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
            newPassword: ''
        },
    });

    useEffect(() => {
        form.reset({
            otp: '',
            newPassword: ''
        });
    }, [form.reset]);

    async function onSubmit(data) {
        console.log(data)
        setLoading(true)
        const result = await handleResetPassword(data);
        if (result.success) {
            setLoading(false)
            toast.success(result.data.message, {
                position: "top-right",
                duration: 3000,
                classNames: "toast-success text-black mt-14"
            });
            // router.push("/reset-passowrd");

        } else {
            setLoading(false)
            toast.error(result.data.message, {
                position: "top-right",
                duration: 3000,
                classNames: "toast-error text-black mt-14",
                description: <p className="font-light text-black">{result.error}</p>,
            });
        }
    }

    return (
        <>
            <NavBar/>
            <Container className="my-6 flex justify-center items-center  py-12">
                <Card className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
                    <h1 className="mb-3 font-bold sm:text-xl">إعادة تعيين كلمة السر</h1>
                    <CardHeader className="px-0">
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex items-center gap-1">
                                                <FormLabel className="text-base font-medium justify-center">رمز
                                                    التحقق</FormLabel>
                                                <FormControl className='mb-0'>
                                                    <InputOTP maxLength={4} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0}/>
                                                            <InputOTPSlot index={1}/>
                                                            <InputOTPSlot index={2}/>
                                                            <InputOTPSlot index={3}/>
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-center mb-4"/>
                                            <FormDescription>
                                                ادخل رمز التحقق المرسل عبر البريد الإلكتروني.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>كلمة السر الجديدة</FormLabel>
                                            <FormControl>
                                                <Input type="password"
                                                       placeholder="ادخل كلمة السر الجديدة" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit"
                                        className="w-full cursor-pointer px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs"
                                        disabled={loading}>
                                    {loading ? <Spinner className="size-8"/> : "إعادة تعيين كلمة السر"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </>
    );
};

export default ResetPasswordPage;