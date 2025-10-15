import React from 'react';
import CourseDescription from "@/components/course-page/CourseDescription";
import CourseRequirements from "@/components/course-page/CourseRequirements";
import CourseOutcomes from "@/components/course-page/CourseOutcomes";
import CourseStats from "@/components/course-page/CourseStats";
import {TabsContent} from "@/components/ui/tabs";

const SummaryTab = ({ courseData }) => {
    return (
        <TabsContent value="summary">
            <CourseDescription description={courseData.description} />
            <CourseRequirements requirements={courseData.requirements} />
            <CourseOutcomes outcomes={courseData.outcomes} />
            <CourseStats />
        </TabsContent>
    );
};

export default SummaryTab;
