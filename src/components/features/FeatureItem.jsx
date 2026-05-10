import React from 'react';
import { Card } from "@/components/ui/card";

const FeatureItem = ({ feature }) => {
    const Icon = feature.icon;

    return (
        <div className="relative flex items-start gap-x-4">
            <Card className="flex-shrink-0 flex items-center justify-center p-4 rounded-full bg-muted/40">
                <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </Card>
            <div className="flex-1">
                <dt className="text-base sm:text-xl leading-7 text-gray-900">
                    {feature.name}
                </dt>
                <dd className="mt-1 text-sm sm:text-base leading-7 text-muted-foreground">
                    {feature.description}
                </dd>
            </div>
        </div>
    );
};

export default FeatureItem;
