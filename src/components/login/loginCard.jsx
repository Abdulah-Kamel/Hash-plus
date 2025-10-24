"use client"
import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RegisterForm from "@/components/register/registerForm";
import LoginForm from "@/components/login/loginForm";

const LoginCard = () => {
    const [role, setRole] = React.useState("student");
    return (
        <Card className="w-full max-w-[700px] border border-gray-100 shadow-lg px-3 py-5 sm:p-10 rounded-md">
            <h1 className="mb-3 font-bold sm:text-xl">تسجيل الدخول</h1>

            <CardHeader className="px-0">
                <Tabs dir="rtl" defaultValue="student" className="w-full" onValueChange={(value) => {
                    setRole(value)}}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger className="rounded-2" value="student">تقنى</TabsTrigger>
                        <TabsTrigger value="teacher">معلم</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <LoginForm role={role}/>
            </CardContent>
        </Card>
    );
};

export default LoginCard;