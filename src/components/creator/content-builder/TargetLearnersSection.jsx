"use client";
import React from "react";
import DynamicListInput from "./DynamicListInput";``

const TargetLearnersSection = ({
  learningOutcomes = [],
  setLearningOutcomes,
  prerequisites = [],
  setPrerequisites,
}) => {
  // Learning Outcomes handlers
  const addOutcome = () => {
    setLearningOutcomes([...learningOutcomes, ""]);
  };
  const removeOutcome = (index) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  };
  const changeOutcome = (index, value) => {
    const updated = [...learningOutcomes];
    updated[index] = value;
    setLearningOutcomes(updated);
  };

  // Prerequisites handlers
  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, ""]);
  };
  const removePrerequisite = (index) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };
  const changePrerequisite = (index, value) => {
    const updated = [...prerequisites];
    updated[index] = value;
    setPrerequisites(updated);
  };

  return (
    <div className="space-y-10">
      {/* Learning Outcomes */}
      <section className="space-y-4">
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900">
            ماذا سيتعلم الطلاب في معسكرك؟
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            يجب عليك إدخال ما لا يقل عن 4 أهداف تعليمية أو نتائج يمكن للمتعلمين
            أن يتوقعوا تحقيقها بعد إكمال المعسكر الخاص بك.
          </p>
        </div>

        <DynamicListInput
          items={learningOutcomes}
          onAdd={addOutcome}
          onRemove={removeOutcome}
          onChange={changeOutcome}
          addLabel="أضف آخر"
          minItems={1}
        />
      </section>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Prerequisites */}
      <section className="space-y-4">
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900">
            ما هي المتطلبات أو الشروط الأساسية لأخذ معسكرك؟
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            اذكر المهارات والخبرات والأدوات والمعدات المطلوبة للمتعلمين قبل
            الالتحاق بمعسكرك. إذا لم تكن هناك متطلبات، فاستغل هذه المساحة لتخفيف
            العوائق أمام المبتدئين.
          </p>
        </div>

        <DynamicListInput
          items={prerequisites}
          onAdd={addPrerequisite}
          onRemove={removePrerequisite}
          onChange={changePrerequisite}
          addLabel="أضف آخر"
          minItems={1}
        />
      </section>
    </div>
  );
};

export default TargetLearnersSection;
