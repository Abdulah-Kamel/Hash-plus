import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Radio, Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseVideo from '../CourseVideo';

const LiveSessionViewer = ({ module }) => {
  const session = module?.liveSession;
  const videoUrl = module?.video?.url || module?.videoData?.url;
  
  return (
    <div className="w-full">
      {/* If there is a recorded video for the session, show it */}
      {videoUrl ? (
        <CourseVideo video={videoUrl} />
      ) : (
        <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-red-900/20"></div>
          <div className="relative z-10 flex flex-col items-center">
             <Radio className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
             <h3 className="text-2xl font-bold">بث مباشر</h3>
             <p className="text-gray-300 mt-2">لم يتم توفير تسجيل الجلسة بعد</p>
          </div>
        </div>
      )}

      <div className="mt-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900">{module.title}</h2>
        {module.description && (
          <p className="text-gray-600 mt-2">{module.description}</p>
        )}
      </div>

      {session && (
        <Card className="border border-gray-200 shadow-sm rounded-xl bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 text-right">تفاصيل الجلسة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                {session.date && (
                  <div className="flex items-center gap-3 justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">التاريخ</p>
                      <p className="font-medium">
                        {new Date(session.date).toLocaleDateString('ar-EG', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                )}
                
                {(session.startTime || session.endTime) && (
                  <div className="flex items-center gap-3 justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">الوقت</p>
                      <p className="font-medium text-right" dir="ltr">
                        {session.timezone && <span className="text-xs text-gray-400 me-2">{session.timezone}</span>}
                        {session.startTime} {session.endTime ? `- ${session.endTime}` : ''}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-3 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 pr-0 md:pr-6">
                {session.meetLink && (
                  <Button 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center gap-2"
                    onClick={() => window.open(session.meetLink, '_blank')}
                  >
                    انضمام للاجتماع
                    <Video className="w-4 h-4 mr-2" />
                  </Button>
                )}
                {session.liveStreamUrl && (
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto rounded-full flex items-center justify-center gap-2"
                    onClick={() => window.open(session.liveStreamUrl, '_blank')}
                  >
                    مشاهدة البث المباشر
                    <Radio className="w-4 h-4 mr-2 text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveSessionViewer;
