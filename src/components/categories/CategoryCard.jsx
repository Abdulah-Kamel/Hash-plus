import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CategoryCard = ({ category }) => {
  return (
    <Card className="flex-1 flex flex-col rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="flex-grow">
        <CardTitle className="text-3xl font-bold text-gray-900 mt-3">
          {category.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <Button asChild variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors">
          <Link href={`/courses?category=${category.title}`}>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className={`w-22 h-22 flex items-center justify-center ${category.bgColor} rounded-full p-2`}>
          <Image src={category.icon} alt={category.title} className="w-full h-full object-contain" width={80} height={80} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
