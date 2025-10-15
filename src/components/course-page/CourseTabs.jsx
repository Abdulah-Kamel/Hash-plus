import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AttachmentsTab, CommunityTab, InstructorTab, ReviewsTab, SummaryTab} from "@/components/course-page/tabs";

const CourseTabs = ({ courseData }) => {
    const tabs = [
        { id: 1, value: "summary", label: 'الملخص' },
        { id: 2, value: "instructor", label: 'المعلم' },
        { id: 3, value: "reviews", label: 'التقييمات' },
        { id: 4, value: "attachments", label: 'الملحقات' },
        { id: 5, value: "community", label: 'مجتمع الدورة' },
    ];

    return (
        <Tabs defaultValue="summary" className="w-full mb-4" dir={"rtl"}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-md:h-30">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <SummaryTab courseData={courseData} />
            {/* Instructor Tab */}
            <InstructorTab />
            {/* Reviews Tab */}
            <ReviewsTab />
            <AttachmentsTab/>
            <CommunityTab/>
        </Tabs>
    );
};

export default CourseTabs;
