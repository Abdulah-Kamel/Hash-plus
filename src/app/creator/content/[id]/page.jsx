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

// ─── Per-section completion checks ───────────────────────────────────────────
const getSectionCompletion = (sectionKey, state, contentType) => {
  const {
    learningOutcomes, prerequisites,
    landingForm, pricingForm, messagesForm,
    finalProjectForm, modules,
  } = state;

  switch (sectionKey) {
    case "target-learners":
      return learningOutcomes.filter((o) => o?.trim()).length > 0;

    case "intro-video":
      return true; // optional

    case "curriculum":
      return contentType === "bootcamp"
        ? true // bootcamp sections managed separately, always allow
        : modules.length > 0;

    case "captions":
    case "attachments":
      return true; // optional

    case "final-project":
      if (contentType !== "bootcamp") return true; // only required for bootcamp
      return (
        finalProjectForm.description?.trim().length >= 10 &&
        finalProjectForm.tasks?.length >= 1 &&
        finalProjectForm.materials?.length >= 1
      );

    case "landing-page":
      return (
        !!landingForm.title?.trim() &&
        !!landingForm.description?.trim() &&
        !!landingForm.category &&
        (!!landingForm.welcomeMessage?.trim() || !!messagesForm.welcomeMessage?.trim())
      );

    case "pricing":
      return pricingForm.price !== "" && pricingForm.price !== undefined;

    case "messages":
      return (
        !!messagesForm.welcomeMessage?.trim() &&
        !!messagesForm.congratulationMessage?.trim()
      );

    default:
      return true;
  }
};

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
  const [modules, setModules] = useState([]);       // course flat modules
  const [bootcampSections, setBootcampSections] = useState([]); // bootcamp sections
  const [learningOutcomes, setLearningOutcomes] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
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

  // ── Compute completion state for all sections ─────────────────────────────
  const formState = {
    learningOutcomes, prerequisites, landingForm,
    pricingForm, messagesForm, finalProjectForm, modules,
  };

  const sectionCompletion = {
    "target-learners": getSectionCompletion("target-learners", formState, contentType),
    "intro-video": getSectionCompletion("intro-video", formState, contentType),
    "curriculum": getSectionCompletion("curriculum", formState, contentType),
    "captions": getSectionCompletion("captions", formState, contentType),
    "attachments": getSectionCompletion("attachments", formState, contentType),
    "final-project": getSectionCompletion("final-project", formState, contentType),
    "landing-page": getSectionCompletion("landing-page", formState, contentType),
    "pricing": getSectionCompletion("pricing", formState, contentType),
    "messages": getSectionCompletion("messages", formState, contentType),
  };

  // Required sections that must be complete before saving
  const requiredSections = contentType === "bootcamp"
    ? ["target-learners", "final-project", "landing-page", "pricing", "messages"]
    : ["target-learners", "landing-page", "pricing", "messages"];

  const allRequiredComplete = requiredSections.every((s) => sectionCompletion[s]);

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
        // courses use data.modules; bootcamps use data.sections
        setModules(data.modules || []);
        setBootcampSections(data.sections || []);
        if (data.learningOutcomes?.length > 0) setLearningOutcomes(data.learningOutcomes);
        if (data.prerequisites?.length > 0) setPrerequisites(data.prerequisites);

        setLandingForm((prev) => ({
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
          congratulationMessage: data.congratulationsMessage || "",
        });

        if (data.finalProject) {
          setFinalProjectForm({
            title: data.finalProject.title || "",
            description: data.finalProject.description || "",
            tasks: data.finalProject.tasks || [],
            materials: data.finalProject.materials || [],
          });
        }

        if (data.materials?.length > 0) setAttachments(data.materials);
        if (data.captions && typeof data.captions === "object") setCaptions(data.captions);
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

  // Generic update handler
  const handleUpdate = async (data) => {
    try {
      // Include contentType to satisfy backend validation for partial updates
      const payload = { ...data };
      if (originalData?.contentType) {
        payload.contentType = originalData.contentType;
      } else if (landingForm?.contentType) {
        payload.contentType = landingForm.contentType;
      }

      const res = await updateContent(id, payload);
      if (!res.success) console.error("Failed to update content:", res.error);
      return res;
    } catch (err) {
      console.error("Error updating content:", err);
      throw err;
    }
  };

  // Save handler — gated behind allRequiredComplete
  const handleSave = async () => {
    if (!allRequiredComplete) {
      // Find and navigate to first incomplete required section
      const firstIncomplete = requiredSections.find((s) => !sectionCompletion[s]);
      if (firstIncomplete) setActiveSection(firstIncomplete);
      toast.error("يرجى إكمال جميع الأقسام المطلوبة قبل الحفظ");
      return;
    }

    setIsSaving(true);
    try {
      const cleanOutcomes = learningOutcomes.filter((o) => o?.trim() !== "");

      const payload = {
        ...originalData,
        learningOutcomes: cleanOutcomes,
        prerequisites: prerequisites.filter((p) => p && p.trim() !== ""),
        materials: attachments.map((a) => ({ name: a.name, url: a.url })),
        finalProject: {
          title: finalProjectForm.title || "المشروع النهائي",
          description: finalProjectForm.description,
          tasks: finalProjectForm.tasks,
          materials: finalProjectForm.materials,
        },
        ...landingForm,
      };

      if (pricingForm.price !== undefined && pricingForm.price !== "") {
        payload.price = {
          amount: Number(pricingForm.price),
          currency: pricingForm.currency || "SAR",
        };
      }

      if (messagesForm.welcomeMessage) payload.welcomeMessage = messagesForm.welcomeMessage;
      if (messagesForm.congratulationMessage) payload.congratulationsMessage = messagesForm.congratulationMessage;

      // Remove keys the backend rejects
      const keysToDelete = [
        "attachments", "captions", "currency", "hasDiscount", "discount",
        "congratulationMessage", "_id", "slug", "instructor", "metadata",
        "modules", "sections", "createdAt", "updatedAt", "__v", "reviews", "id",
      ];
      keysToDelete.forEach((k) => delete payload[k]);

      // Normalize category to string id
      payload.category = typeof landingForm.category === "object"
        ? landingForm.category._id
        : landingForm.category;

      if (landingForm.welcomeMessage) payload.welcomeMessage = landingForm.welcomeMessage;

      if (!payload.thumbnail) delete payload.thumbnail;
      if (!payload.welcomeVideo) delete payload.welcomeVideo;

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

  // Render active section
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
            modules={contentType === "bootcamp" ? bootcampSections : modules}
            onModulesChange={fetchContent}
          />
        );
      case "captions":
        return <CaptionsSection modules={modules} captions={captions} setCaptions={setCaptions} />;
      case "attachments":
        return <AttachmentsSection attachments={attachments} setAttachments={setAttachments} />;
      case "landing-page":
        return <LandingPageSection form={landingForm} setForm={setLandingForm} contentId={id} onUpdate={handleUpdate} />;
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
      <ContentBuilderTopBar
        title={contentTitle}
        onSave={handleSave}
        isSaving={isSaving}
        canSave={allRequiredComplete}
      />
      <div className="flex flex-1">
        <ContentBuilderSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sectionCompletion={sectionCompletion}
          contentType={contentType}
        />
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
