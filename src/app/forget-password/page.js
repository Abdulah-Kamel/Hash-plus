"use client"
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import FormField from "@/components/form/FormField";
import {Spinner} from "@/components/ui/spinner";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {NavBar} from "@/components/navbar";
import Container from "@/components/container";
import Footer from "@/components/footer";
import {handleForgetPassword} from "@/actions/forgetPasswordAction";


const ForgetPasswordPage = ({role}) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const formSchema = z.object({
        email: z.email("البريد الإلكتروني غير صحيح"),
    })

    const {handleSubmit, control, reset} = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    useEffect(() => {
        reset({
            email: '',
        });
    }, [reset]);

    async function onSubmit(data) {
        setLoading(true)
        const result = await handleForgetPassword(data);
        if (result.success) {
            setLoading(false)
            toast.success(result.data.message, {
                position: "top-right",
                duration: 3000,
                classNames: "toast-success text-black mt-14"
            });
            router.push("/reset-password");

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
                    <h1 className="mb-3 font-bold sm:text-xl">نسيت كلمة السر</h1>
                    <CardHeader className="px-0">
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField control={control} name="email" label="البريد الإلكتروني"
                                           placeholder="البريد الإلكتروني"
                                           type="email" autoComplete="email"/>
                                {/* Submit Buttons */}
                                <div className="flex-col gap-2">
                                    <Button type="submit"
                                            className="w-full cursor-pointer px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs"
                                            disabled={loading}>
                                        {
                                            loading ?
                                                <Spinner className="size-8"/>
                                                :
                                                "ارسل الرمز"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </>
    );
};

export default ForgetPasswordPage;