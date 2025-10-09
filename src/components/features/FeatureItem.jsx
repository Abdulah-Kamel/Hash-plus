import React from 'react';

const FeatureItem = ({ feature }) => {
    const Icon = feature.icon;

    return (
        <div className="relative flex items-start gap-x-5">
            <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-gray-50 p-4 ring-1 ring-gray-200">
                <Icon className="h-8 w-8 text-gray-500" aria-hidden="true" />
            </div>
            <div className="flex-1">
                <dt className="text-xl leading-7 text-gray-900">
                    {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                </dd>
            </div>
        </div>
    );
};

export default FeatureItem;