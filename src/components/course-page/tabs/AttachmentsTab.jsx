import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {File, SquareArrowOutUpLeft, Link} from "lucide-react";
import { coursesData } from "@/data/coursesData";
import HorizontalCourseCard from "@/components/course-details/HorizontalCourseCard";
import {TabsContent} from "@/components/ui/tabs";

const AttachmentsTab = () => {
    return (
        <TabsContent value="attachments">
            <Card className="border-none shadow-none">
                <CardHeader>
                        <h3 className="text-xl font-bold">الملحقات</h3>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default AttachmentsTab;
