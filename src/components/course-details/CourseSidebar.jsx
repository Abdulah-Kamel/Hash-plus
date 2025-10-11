import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Award, Download, Smartphone, Tv, Infinity, SaudiRiyal, Heart } from 'lucide-react';
import Image from "next/image";
import courseImage from "@/assets/course1.png"
const CourseSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <Card className="border-2 border-gray-100 shadow-md">
          <CardHeader>
              <Image src={courseImage} alt="course image" className="w-full"/>
              <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-3xl flex items-center gap-1">
                      30
                      <SaudiRiyal width={36} height={36} />
                  </span>
                  <span className="text-2xl text-muted-foreground flex items-center gap-1">
                      30
                      <SaudiRiyal width={28} height={28} />
                  </span>
              </div>
          </CardHeader>
        <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3 items-center">
            {/* Add to Cart Button */}
            <Button className="col-span-3 w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium rounded-lg">
                أضف إلى السلة
            </Button>
            {/* Wishlist Button */}
            <div className="col-span-1 flex justify-center">
                <Button variant="outline" className="w-full border border-primary hover:bg-gray-50 rounded-lg">
                  <Heart className="text-primary w-6 h-6" />
                </Button>
            </div>
            </div>

            {/* Buy Now Button */}
            <Button variant="outline" className="w-full border border-primary text-primary  py-5 text-lg font-medium rounded-lg">
                اشتري الآن
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
