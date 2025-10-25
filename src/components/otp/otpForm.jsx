"use client"
import React, {useEffect, useState} from 'react';
import {InputOTP, InputOTPGroup, InputOTPSlot,} from "@/components/ui/input-otp"
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {handleEmailConfirm} from "@/components/otp/otpActions";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner";
import {useRouter} from "next/navigation";

const OtpForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formSchema = z.object({
        otp: z.string().min(4, "الرمز يجب أن يكون 4 أرقام"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        form.reset({
            otp: '',
        });
    }, [form.reset]);

    async function onSubmit(data) {
        setLoading(true)
        const result = await handleEmailConfirm(data);
        if (result.status === "success") {
            setLoading(false)
            toast.success(result.message, {
                position: "top-right",
                duration: 3000,
                classNames: "toast-success text-black mt-14"
            });
            router.push("/login");

        } else {
            console.log(result.error)
            setLoading(false)
            toast.error("حدث خطأ أثناء تسجيل الدخول", {
                position: "top-right",
                duration: 3000,
                classNames: "toast-error text-black mt-14",
                description: <p className="font-light text-black">{result.error}</p>,
            });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({field}) => (
                            <FormItem>
                                <FormControl className='mb-0'>
                                    <div className="flex justify-center mb-8">
                                        <InputOTP maxLength={4} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0}/>
                                                <InputOTPSlot index={1}/>
                                                <InputOTPSlot index={2}/>
                                                <InputOTPSlot index={3}/>
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-center mb-4"/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full px-5 py-2 sm:py-6 rounded-lg max-sm:text-xs cursor-pointer"
                            disabled={loading}>
                        {
                            loading ?
                                <Spinner className="size-8"/>
                                :
                                "تاكيد"
                        }
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default OtpForm;
