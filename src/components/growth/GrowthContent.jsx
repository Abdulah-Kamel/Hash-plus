import React from 'react';
import { Badge } from "@/components/ui/badge";

const GrowthContent = ({ content }) => {
    return (
        <div className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <Badge variant="secondary" className="text-xs md:text-sm">
                {content.badge}
            </Badge>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                {content.title}{' '}
                <span className="text-purple-500">{content.titleHighlight}</span>
                <br />
                {content.subtitle}
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed px-4 md:px-0">
                {content.description}
            </p>
        </div>
    );
};

export default GrowthContent;
