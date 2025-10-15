import React from 'react';
import badgecheck from "../../assets/badgecheck.svg";
import {CircleCheckBig} from "lucide-react";

const CourseOutcomes = ({ outcomes }) => {
    return (
        <div className="mt-6 text-right">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{outcomes.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-2 border-gray-100 rounded-lg p-3">
                {outcomes.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                        <CircleCheckBig className="w-5 h-5 text-secondary" />
                        <span className="text-sm sm:text-base text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseOutcomes;
