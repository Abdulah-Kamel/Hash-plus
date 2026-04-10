"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getContentById } from "@/actions/contentActions";
import ContentBuilderTopBar from "@/components/creator/content-builder/ContentBuilderTopBar";
import ContentBuilderSidebar from "@/components/creator/content-builder/ContentBuilderSidebar";
import TargetLearnersSection from "@/components/creator/content-builder/TargetLearnersSection";

const ContentBuilderPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("target-learners");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Content data
  const [contentTitle, setContentTitle] = useState("");
  const [contentType, setContentType] = useState("course");
  const [learningOutcomes, setLearningOutcomes] = useState([
    "احتراف التصميم",
    "معرفة قواعد تجربة المستخدم",
    "معرفة قواعد تجربة المستخدم",
    "معرفة قواعد تجربة المستخدم",
  ]);
  const [prerequisites, setPrerequisites] = useState([
    "احتراف التصميم",
    "معرفة قواعد تجربة المستخدم",
  ]);

  // Fetch content data
  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const res = await getContentById(id);
        if (res.success) {
          const data = res.data.data;
          setContentTitle(data.title || "");
          setContentType(data.contentType || "course");
          if (data.learningOutcomes?.length > 0) {
            setLearningOutcomes(data.learningOutcomes);
          }
          if (data.prerequisites?.length > 0) {
            setPrerequisites(data.prerequisites);
          }
        }
      } catch (err) {
        console.error("Failed to fetch content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/contents/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            learningOutcomes: learningOutcomes.filter((o) => o.trim() !== ""),
            prerequisites: prerequisites.filter((p) => p.trim() !== ""),
          }),
        }
      );

      if (res.ok) {
        console.log("Content saved successfully");
      } else {
        console.error("Failed to save content");
      }
    } catch (err) {
      console.error("Error saving content:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Render active section content
  const renderSection = () => {
    switch (activeSection) {
      case "target-learners":
        return (
          <TargetLearnersSection
            learningOutcomes={learningOutcomes}
            setLearningOutcomes={setLearningOutcomes}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        );
      case "intro-video":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">الفيديو التعريفي</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "curriculum":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">المقرر</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "captions":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">التعليقات التوضيحية</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "attachments":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">الملحقات</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "landing-page":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">صفحة هبوط الدورة التدريبية</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "pricing":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">السعر</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      case "messages":
        return (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">رسائل الدورة</p>
            <p className="text-sm mt-2">قريباً</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <ContentBuilderTopBar
        title={contentTitle}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Body */}
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
            {loading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mr-auto" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mr-auto" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-lg" />
                  ))}
                </div>
              </div>
            ) : (
              renderSection()
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <ContentBuilderSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
    </div>
  );
};

export default ContentBuilderPage;
