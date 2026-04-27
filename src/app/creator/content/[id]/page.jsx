"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getContentById, updateContent } from "@/actions/contentActions";
import ContentBuilderTopBar from "@/components/creator/content-builder/ContentBuilderTopBar";
import ContentBuilderSidebar from "@/components/creator/content-builder/ContentBuilderSidebar";
import TargetLearnersSection from "@/components/creator/content-builder/TargetLearnersSection";
import IntroVideoSection from "@/components/creator/content-builder/IntroVideoSection";
import CurriculumSection from "@/components/creator/content-builder/CurriculumSection";
import CaptionsSection from "@/components/creator/content-builder/CaptionsSection";
import AttachmentsSection from "@/components/creator/content-builder/AttachmentsSection";
import LandingPageSection from "@/components/creator/content-builder/LandingPageSection";
import PricingSection from "@/components/creator/content-builder/PricingSection";
import MessagesSection from "@/components/creator/content-builder/MessagesSection";
import FinalProjectSection from "@/components/creator/content-builder/FinalProjectSection";
import { toast } from "sonner";

const ContentBuilderPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("target-learners");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [originalData, setOriginalData] = useState({});

  // Content data
  const [contentTitle, setContentTitle] = useState("");
  const [contentType, setContentType] = useState("course");
  const [welcomeVideo, setWelcomeVideo] = useState(null);
  const [modules, setModules] = useState([]);
  const [learningOutcomes, setLearningOutcomes] = useState([
  ]);
  const [prerequisites, setPrerequisites] = useState([
    "احتراف التصميم",
    "معرفة قواعد تجربة المستخدم",
  ]);
  const [landingForm, setLandingForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "المبتدئ",
    language: "العربية",
    thumbnail: null,
    welcomeMessage: "",
  });
  const [pricingForm, setPricingForm] = useState({
    price: "",
    currency: "SAR",
  });
  const [messagesForm, setMessagesForm] = useState({
    welcomeMessage: "",
    congratulationMessage: "",
  });
  const [finalProjectForm, setFinalProjectForm] = useState({
    title: "",
    description: "",
    tasks: [],
    materials: [],
  });
  const [attachments, setAttachments] = useState([]);
  const [captions, setCaptions] = useState({});

  // Fetch content data
  const fetchContent = async () => {
    if (!id) return;
    try {
      const res = await getContentById(id);
      if (res.success) {
        const data = res.data.data;
        setOriginalData(data);
        setContentTitle(data.title || "");
        setContentType(data.contentType || "course");
        setWelcomeVideo(data.welcomeVideo || null);
        setModules(data.modules || []);
        if (data.learningOutcomes?.length > 0) {
          setLearningOutcomes(data.learningOutcomes);
        }
        if (data.prerequisites?.length > 0) {
          setPrerequisites(data.prerequisites);
        }

        setLandingForm(prev => ({
          ...prev,
          title: data.title || "",
          description: data.description || "",
          category: data.category?._id || data.category || "",
          level: data.level || "المبتدئ",
          language: data.language || "العربية",
          thumbnail: data.thumbnail || null,
          welcomeMessage: data.welcomeMessage || "",
        }));

        setPricingForm({
          price: data.price?.amount !== undefined ? data.price.amount : (data.price || ""),
          currency: data.price?.currency || "SAR",
        });

        setMessagesForm({
          welcomeMessage: data.welcomeMessage || "",
          congratulationMessage: data.congratulationMessage || "",
        });

        if (data.finalProject) {
          setFinalProjectForm({
            title: data.finalProject.title || "",
            description: data.finalProject.description || "",
            tasks: data.finalProject.tasks || [],
            materials: data.finalProject.materials || [],
          });
        }

        if (data.attachments?.length > 0) {
          setAttachments(data.attachments);
        }

        if (data.captions && typeof data.captions === 'object') {
          setCaptions(data.captions);
        }
      }
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [id]);

  // Generic update handler that PATCHes the content
  const handleUpdate = async (data) => {
    try {
      const res = await updateContent(id, data);
      if (!res.success) {
        console.error("Failed to update content:", res.error);
      }
      return res;
    } catch (err) {
      console.error("Error updating content:", err);
      throw err;
    }
  };

  // Save button handler — saves all current section data
  const handleSave = async () => {
    // Pre-save validation based on backend rules
    const cleanOutcomes = learningOutcomes.filter((o) => o?.trim() !== "");
    if (cleanOutcomes.length === 0) {
      toast.error("يرجى إضافة ما سيتعلمه الطلاب (مخرج تعليمي واحد على الأقل)");
      setActiveSection("target-learners");
      return;
    }

    if (!landingForm.welcomeMessage?.trim() && !messagesForm.welcomeMessage?.trim()) {
      toast.error("يرجى كتابة رسالة الترحيب في قسم صفحة الهبوط");
      setActiveSection("landing-page");
      return;
    }

    if (!landingForm.category) {
      toast.error("يرجى اختيار تصنيف المحتوى");
      setActiveSection("landing-page");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...originalData,
        learningOutcomes: cleanOutcomes,
        prerequisites: prerequisites.filter((p) => p && p.trim() !== ""),
        materials: attachments.map(a => ({ name: a.name, id: a.id })),
        finalProject: finalProjectForm,
        ...landingForm,
      };

      if (pricingForm.price !== undefined && pricingForm.price !== "") {
        payload.price = {
          amount: Number(pricingForm.price),
          currency: pricingForm.currency || "SAR"
        };
      }

      if (messagesForm.welcomeMessage) {
        payload.welcomeMessage = messagesForm.welcomeMessage;
      }
      
      if (messagesForm.congratulationMessage) {
        payload.congratulationsMessage = messagesForm.congratulationMessage;
      }

      // Cleanup legacy keys to satisfy backend validation
      delete payload.attachments;
      delete payload.captions;
      delete payload.currency;
      delete payload.hasDiscount;
      delete payload.discount;
      delete payload.congratulationMessage;
      delete payload._id;
      delete payload.slug;
      delete payload.instructor;
      delete payload.metadata;
      delete payload.modules;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;
      delete payload.reviews;
      delete payload.id;

      // Form overrides to prevent invalid API types
      payload.category = typeof landingForm.category === 'object' ? landingForm.category._id : landingForm.category;
      
      // Override welcomeMessage in case it was in landingForm
      if (landingForm.welcomeMessage) {
        payload.welcomeMessage = landingForm.welcomeMessage;
      }
      
      // Omit objects if null to avoid 'expected object, received null'
      if (!payload.thumbnail) {
        delete payload.thumbnail;
      }
      if (!payload.welcomeVideo) {
        delete payload.welcomeVideo;
      }

      const res = await updateContent(id, payload);

      if (res.success) {
        toast.success("تم الحفظ بنجاح");
      } else {
        toast.error(res.error || "فشل الحفظ");
      }
    } catch (err) {
      console.error("Error saving content:", err);
      toast.error("حدث خطأ أثناء الحفظ");
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
          <IntroVideoSection
            contentId={id}
            welcomeVideo={welcomeVideo}
            onUpdate={handleUpdate}
          />
        );
      case "curriculum":
        return (
          <CurriculumSection
            contentId={id}
            contentType={contentType}
            modules={modules}
            onModulesChange={fetchContent}
          />
        );
      case "captions":
        return <CaptionsSection modules={modules} captions={captions} setCaptions={setCaptions} />;
      case "attachments":
        return <AttachmentsSection attachments={attachments} setAttachments={setAttachments} />;
      case "landing-page":
        return <LandingPageSection form={landingForm} setForm={setLandingForm} />;
      case "pricing":
        return <PricingSection form={pricingForm} setForm={setPricingForm} />;
      case "messages":
        return <MessagesSection form={messagesForm} setForm={setMessagesForm} />;
      case "final-project":
        return <FinalProjectSection form={finalProjectForm} setForm={setFinalProjectForm} />;
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
        {/* Right Sidebar */}
        <ContentBuilderSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

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
      </div>
    </div>
  );
};

export default ContentBuilderPage;
