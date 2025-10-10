"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="full-name">الاسم الكامل</Label>
                    <Input id="full-name" type="text" placeholder="الاسم الكامل" required className="h-10 sm:h-12" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">البريد الالكترونى</Label>
                    <Input id="email" type="email" placeholder="البريد الالكترونى" required className="h-10 sm:h-12" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">كلمه السر</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="كلمه السر"
                            required
                            className="h-10 sm:h-12 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">تأكيد كلمه السر</Label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="تأكيد كلمه السر"
                            required
                            className="h-10 sm:h-12 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        أوافق على الشروط والأحكام
                    </Label>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
