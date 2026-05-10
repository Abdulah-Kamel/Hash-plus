import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkViewer = ({ module }) => {
  const linkUrl = module?.link?.url || module?.linkData?.url || module?.linkUrl || module?.url;
  
  return (
    <div className="w-full">
      <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <Link2 className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{module.title}</h2>
          {module.description && (
            <p className="text-gray-600 max-w-lg mb-8">{module.description}</p>
          )}
          {linkUrl ? (
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2"
              onClick={() => window.open(linkUrl, '_blank')}
            >
              فتح الرابط
              <ExternalLink className="w-5 h-5 mr-2" />
            </Button>
          ) : (
            <p className="text-red-500">الرابط غير متوفر</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkViewer;
