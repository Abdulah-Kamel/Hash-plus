import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowLeft, SaudiRiyal, X} from "lucide-react";

const OrderSummary = () => {
    return (
        <Card className="bg-gray-100 rounded-xl px-4">
            <CardHeader className="border-b border-gray-300">
                <h2 className="text-2xl">ملخص الطلب</h2>
                <div className="flex justify-between items-center mt-2">
                          <span className="flex items-center gap-1">
                              مجمع المنتجات
                              <X/>
                              4
                          </span>
                    <span className="flex items-center gap-1">
                              50
                          <SaudiRiyal/>
                          </span>
                </div>
            </CardHeader>
            <CardContent className="px-4">
                <div>
                    <div className="flex justify-between items-center mt-4 text-3xl">
                        <span className="text-2xl">الاجمالى</span>
                        <span className="flex items-center gap-1">
                                  182
                              <SaudiRiyal className="size-6"/>
                              </span>
                    </div>
                    <div className="mt-6">
                        <button className="w-full bg-primary text-white py-3 cursor-pointer hover:bg-primary/90 mt-4 flex items-center justify-center rounded-full gap-1">
                            اكمل الطلب
                            <ArrowLeft/>
                        </button>
                    </div>
                    <div className="mt-6">
                        <h4>تفعيل الكوبون</h4>
                        <div className="flex items-center gap-2">
                            <Input type={"text"} className="mt-2 bg-white py-6 rounded-full" placeholder="اكتب الكوبون"/>
                            <Button className="bg-primary text-white py-6 cursor-pointer hover:bg-primary/90 rounded-full">تفعيل</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;