"use client"
import React, { useState } from 'react';
import {NavBar} from "@/components/navbar";
import Container from "@/components/container";
import OrderSummary from "@/components/cart/OrderSummary";
import Footer from "@/components/footer";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {CreditCard, SaudiRiyal} from "lucide-react";
import Image from "next/image";
import visaLogo from "@/assets/visa.svg";
import mastercardLogo from "@/assets/mastercard.svg";
import tabby from "@/assets/tabby.svg";
import mada from "@/assets/mada.svg";
import { cn } from '@/lib/utils';
// import {Separator} from "@/components/ui/separator";
const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);

    return (
        <>
            <NavBar />
            <Container className="py-4">
                <div>
                    <h1 className="text-3xl">الدفع</h1>
                    <p className="mt-4">اختر طريقة الدفع</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 max-sm:place-items-center mt-4 gap-4">
                    <div className="col-span-2">
                        <Accordion type="single" collapsible className="">
                            
                            {/* Existing Visa Card */}
                            <AccordionItem 
                                value="visa1"
                                className="bg-gray-100 last:rounded-xl last:rounded-t-none first:rounded-xl first:rounded-b-none border-0 overflow-hidden"
                            >
                                <AccordionTrigger 
                                    className="px-4 py-3 hover:bg-gray-200 transition-colors hover:no-underline [&[data-state=open]>div>svg]:rotate-180"
                                    onClick={() => setSelectedMethod('visa1')}
                                >
                                    <div className="flex items-center w-full">
                                        <Checkbox 
                                            checked={selectedMethod === 'visa1'}
                                            className="size-6 mr-2 rounded-full bg-white border-primary border-2"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="bg-white rounded-md p-2 ms-3">
                                            <CreditCard width={28} height={28} className="w-7 h-7"/>
                                        </div>
                                        <div className="ms-3">
                                            <span>**** 4862</span>
                                        </div>
                                        <div className="ms-auto flex items-center gap-2">
                                            <Image
                                                src={visaLogo}
                                                alt="visa logo"
                                                width={50}
                                                height={50}
                                                className="h-8 w-auto"
                                            />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                
                                <AccordionContent className="px-4 pb-4 bg-white border-t border">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-1">الاسم على البطاقة</p>
                                            <p className="font-medium">Mahmoud Omar</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-1">رقم البطاقة</p>
                                            <p className="font-medium">**** 4656</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-1">تاريخ الانتهاء</p>
                                            <p className="font-medium">09/2032</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* New Visa/Mastercard */}
                            <AccordionItem 
                                value="visa2"
                                className="bg-gray-100 last:rounded-xl last:rounded-t-none first:rounded-xl first:rounded-b-none border-0 overflow-hidden"
                            >
                                <AccordionTrigger 
                                    className="px-4 py-3 hover:bg-gray-200 transition-colors hover:no-underline [&[data-state=open]>div>svg]:rotate-180"
                                    onClick={() => setSelectedMethod('visa2')}
                                >
                                    <div className="flex items-center w-full">
                                        <Checkbox 
                                            checked={selectedMethod === 'visa2'}
                                            className="size-6 mr-2 rounded-full bg-white border-primary border-2"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="bg-white rounded-md p-2 ms-3">
                                            <CreditCard width={28} height={28} className="w-7 h-7"/>
                                        </div>
                                        <div className="ms-3">
                                            <span>فيزا</span>
                                        </div>
                                        <div className="ms-auto flex items-center gap-2">
                                            <Image
                                                src={mastercardLogo}
                                                alt="mastercard logo"
                                                width={50}
                                                height={50}
                                                className="h-8 w-auto"
                                            />
                                            <Image
                                                src={visaLogo}
                                                alt="visa logo"
                                                width={50}
                                                height={50}
                                                className="h-8 w-auto"
                                            />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                
                                <AccordionContent className="px-4 pb-4 bg-white border-t border">
                                    <div className="grid grid-cols-1 gap-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber-visa2" className="text-sm font-medium text-gray-700">
                                                رقم البطاقة
                                            </Label>
                                            <Input
                                                id="cardNumber-visa2"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full py-6 rounded-3xl"
                                                dir="rtl"
                                            />
                                        </div>
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                           <div className="space-y-2">
                                               <Label htmlFor="expiry-visa2" className="text-sm font-medium text-gray-700">
                                                   تاريخ الانتهاء
                                               </Label>
                                               <Input
                                                   id="expiry-visa2"
                                                   placeholder="شهر/سنة"
                                                   className="w-full py-6 rounded-3xl"
                                                   dir="rtl"
                                               />
                                           </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName-visa2" className="text-sm font-medium text-gray-700">
                                                رمز التحقق (cvc)
                                            </Label>
                                            <Input
                                                id="cardName-visa2"
                                                placeholder="رمز التحقق"
                                                className="w-full py-6 rounded-3xl"
                                                dir="rtl"
                                            />
                                        </div>
                                       </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Tabby */}
                            <AccordionItem 
                                value="tabby"
                                className="bg-gray-100 last:rounded-xl last:rounded-t-none first:rounded-xl first:rounded-b-none border-0 overflow-hidden"
                            >
                                <AccordionTrigger 
                                    className="px-4 py-3 hover:bg-gray-200 transition-colors hover:no-underline [&[data-state=open]>div>svg]:rotate-180"
                                    onClick={() => setSelectedMethod('tabby')}
                                >
                                    <div className="flex items-center w-full">
                                        <Checkbox 
                                            checked={selectedMethod === 'tabby'}
                                            className="size-6 mr-2 rounded-full bg-white border-primary border-2"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="bg-white rounded-md p-2 ms-3">
                                            <Image 
                                                src={tabby} 
                                                alt="tabby icon" 
                                                width={28}
                                                height={28}
                                                className="w-7 h-7"
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <span>تابي</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                
                                <AccordionContent className="px-4 py-4 bg-white border-t border">
                                    <ul className="list-disc space-y-4 text-muted-foreground px-4 border-b border-gray-300 pb-4">
                                        <li>ادفع 25% وقسط الباقى على 3 شهور</li>
                                        <li>بدون فوائد او رسوم</li>
                                        <li>نقبل اى بطاقة بنكية او ائتمانية</li>
                                    </ul>
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">جدولة الدفع</h4>
                                        <div className="space-y-3">
                                            {/* Payment 1 - Today */}
                                            <div className="flex items-center justify-between p-3  rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-medium">
                                                        01
                                                    </div>
                                                    <span className="text-sm text-gray-700">اليوم</span>
                                                </div>
                                                <span className="text-xl font-light flex items-center gap-1">
                                                    50
                                                <SaudiRiyal className="size-6"/>
                                                </span>
                                            </div>
                                            {/*<Separator orientation={'vertical'} className="my-2"/>*/}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Mada */}
                            <AccordionItem 
                                value="mada"
                                className="bg-gray-100 last:rounded-xl last:rounded-t-none first:rounded-xl first:rounded-b-none border-0 overflow-hidden"
                            >
                                <AccordionTrigger 
                                    className="px-4 py-3 hover:bg-gray-200 transition-colors hover:no-underline [&[data-state=open]>div>svg]:rotate-180"
                                    onClick={() => setSelectedMethod('mada')}
                                >
                                    <div className="flex items-center w-full">
                                        <Checkbox 
                                            checked={selectedMethod === 'mada'}
                                            className="size-6 mr-2 rounded-full bg-white border-primary border-2"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="bg-white rounded-md p-2 ms-3">
                                            <Image 
                                                src={mada} 
                                                alt="mada icon" 
                                                width={28}
                                                height={28}
                                                className="w-7 h-7"
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <span>مدى</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                
                                <AccordionContent className="px-4 pb-4 bg-white border">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName-mada" className="text-sm font-medium text-gray-700">
                                                الاسم على البطاقة
                                            </Label>
                                            <Input 
                                                id="cardName-mada"
                                                placeholder="أدخل الاسم"
                                                className="w-full"
                                                dir="rtl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber-mada" className="text-sm font-medium text-gray-700">
                                                رقم البطاقة
                                            </Label>
                                            <Input 
                                                id="cardNumber-mada"
                                                placeholder="**** **** **** ****"
                                                className="w-full"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry-mada" className="text-sm font-medium text-gray-700">
                                                تاريخ الانتهاء
                                            </Label>
                                            <Input 
                                                id="expiry-mada"
                                                placeholder="MM/YY"
                                                className="w-full"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                            نشط
                                        </div>
                                        <span className="text-sm text-gray-600">مدى</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </div>
                    <div className="col-span-1">
                        <OrderSummary/>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default PaymentPage;