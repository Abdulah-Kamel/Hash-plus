import MultiStepForm from "@/components/creator/forms/MultiStepForm";
import AudienceInfoStep from "@/components/creator/steps/AudienceInfoStep";
import ContentCreationStep from "@/components/creator/steps/ContentCreationStep";
import ExperienceStep from "@/components/creator/steps/ExperienceStep";
import KnowledgeStep from "@/components/creator/steps/KnowledgeStep";
import LearningStep from "@/components/creator/steps/LearningStep";
import PersonalInfoSteps from "@/components/creator/steps/PersonalInfoSteps";

export default function Landing() {
  const steps = [
    <AudienceInfoStep key={1} />,
    <ContentCreationStep key={2} />,
    <ExperienceStep key={3} />,
    <KnowledgeStep key={4} />,
    <LearningStep key={5} />,
    <PersonalInfoSteps key={6} />,
  ];

  return (
    <div className="">
      <MultiStepForm steps={steps} />
    </div>
  );
}
