"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">البريد الالكترونى</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="البريد الالكترونى"
                        className="h-10 sm:h-12"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between ">
                        <Label htmlFor="password">كلمه السر</Label>
                        <a
                            href="#"
                            className="text-primary inline-block text-sm underline-offset-4 hover:underline"
                        >
                            نسيت كلمه السر؟
                        </a>
                    </div>
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
                            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        تذكرنى
                    </Label>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;