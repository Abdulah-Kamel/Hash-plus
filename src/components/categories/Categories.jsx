import React from 'react';
import { categoriesData } from '../../data/categoriesData';
import CategoryCard from './CategoryCard';
import CategoryHeader from './CategoryHeader';
import { Card, CardContent } from "@/components/ui/card";

const Categories = () => {
    return (
        <section className="py-16 px-4 lg:px-12">
            <div className="mx-auto">
                <Card className="relative bg-primary rounded-3xl overflow-hidden border-0">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <CardContent className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-10 lg:p-14">
                        {/* Text Section */}
                        <div className="lg:col-span-5">
                            <CategoryHeader />
                        </div>

                        {/* Cards Section */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {categoriesData.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Categories;