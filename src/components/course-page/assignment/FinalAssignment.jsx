import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft, File, Link, SquareArrowOutUpLeft} from "lucide-react";
import RichTextEditor from "@/components/course-page/assignment/RichTextEditor";
import UploadDropzone from "@/components/UploadDropzone";

const FinalAssignment = () => {
    return (
        <>
            <div className="mt-7 flex justify-between items-center">
                <h2 className="text-2xl">المشروع النهائى</h2>
                <Button variant={"outline"} className="font-normal px-16 py-6 rounded-full">العوده الى الدوره
                    <ArrowLeft className="size-6" />
                </Button>
            </div>
            <div className="my-4 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">فكرة المشروع</h3>
                    <p className="text-muted-foreground font-normal">معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">المطلوب</h3>
                    <ol className="list-decimal text-muted-foreground px-4 space-y-4">
                        <li>
                            تطوير مهاراتك في مجالات التقنيات الحديثة
                        </li>
                        <li>
                            تطوير مهاراتك في مجالات التقنيات الحديثة
                        </li>
                        <li>
                            تطوير مهاراتك في مجالات التقنيات الحديثة
                        </li>
                        <li>
                            تطوير مهاراتك في مجالات التقنيات الحديثة
                        </li>
                    </ol>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">الملفات الخاصة بالمشروع</h3>
                    <div className="p-4 rounded-lg flex items-center justify-between gap-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="bg-teal-300 p-2 rounded-md">
                                <File />
                            </div>
                            <p>
                                معسكرات وبرامج احترافية
                            </p>
                        </div>
                        <SquareArrowOutUpLeft className="cursor-pointer"/>
                    </div>
                    <div className="p-4 rounded-lg flex items-center justify-between gap-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="bg-teal-300 p-2 rounded-md">
                                <Link />
                            </div>
                            <p>
                                معسكرات وبرامج احترافية
                            </p>
                        </div>
                        <SquareArrowOutUpLeft className="cursor-pointer"/>
                    </div>
                </div>
                <div className="mt-4">
                    <RichTextEditor/>
                </div>
                <div>
                    <UploadDropzone/>
                </div>
                <div className="flex justify-end">
                    <Button variant={"outline"} className="font-normal px-16 py-6 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white">ارسال</Button>
                </div>
            </div>
        </>

    );
};

export default FinalAssignment;