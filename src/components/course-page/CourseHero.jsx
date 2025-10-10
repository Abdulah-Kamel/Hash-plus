import React from 'react';
import CourseVideo from './CourseVideo';
import CourseTabs from './CourseTabs';
import CourseDescription from './CourseDescription';
import CourseRequirements from './CourseRequirements';
import CourseOutcomes from './CourseOutcomes';
import CourseStats from './CourseStats';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseHero = ({ data }) => {
  return (
    <div className="space-y-6">
        <CourseVideo video={data.video} />
        <CourseTabs />
        <Card>
            <CardHeader>
                <CardTitle>عن الدورة</CardTitle>
            </CardHeader>
            <CardContent>
                <CourseDescription description={data.description} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>متطلبات الدورة</CardTitle>
            </CardHeader>
            <CardContent>
                <CourseRequirements requirements={data.requirements} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>ماذا ستتعلم</CardTitle>
            </CardHeader>
            <CardContent>
                <CourseOutcomes outcomes={data.outcomes} />
            </CardContent>
        </Card>
        <CourseStats />
    </div>
  );
};

export default CourseHero;
