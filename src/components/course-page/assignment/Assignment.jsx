import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

const Assignment = () => {
    return (
        <>
            <div className="mt-7 flex justify-between items-center">
                <h2 className="text-2xl">اختبار 1</h2>
                <Button variant={"outline"} className="font-normal px-16 py-6 rounded-full">العوده الى الدوره
                    <ArrowLeft className="size-6" />
                </Button>
            </div>
            <div className="my-4 space-y-6">
                <Card className="p-0">
                    <CardHeader className="bg-gray-100 py-4 rounded-t-xl flex items-center gap-2">
                        <span className="py-1 px-3 bg-white font-light rounded-full w-fit">1</span>
                        <p>ما هي الأداة المستخدمة للعمل على اندرويد؟</p>
                    </CardHeader>
                    <CardContent className="p-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" defaultChecked />
                            <Label htmlFor="terms-2">تعريف بالمعلم</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-0">
                    <CardHeader className="bg-gray-100 py-4 rounded-t-xl flex items-center gap-2">
                        <span className="py-1 px-3 bg-white font-light rounded-full w-fit">2</span>
                        <p>ما هي الأداة المستخدمة للعمل على اندرويد؟</p>
                    </CardHeader>
                    <CardContent className="p-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" defaultChecked />
                            <Label htmlFor="terms-2">تعريف بالمعلم</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms-2" className="h-6 w-6 rounded-full" />
                            <Label htmlFor="terms-2">ما الذي سوف تستفيد به من الدورة</Label>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button variant={"outline"} className="font-normal px-16 py-6 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white">حفظ</Button>
                </div>
            </div>
        </>
    );
};

export default Assignment;