import React from 'react';
import { categoriesData } from '../../data/categoriesData';
import CategoryCard from './CategoryCard';
import CategoryHeader from './CategoryHeader';

const Categories = () => {
    return (
        <section className="py-16 px-4 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="relative bg-primary rounded-3xl px-10 py-14 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                        {/* Text Section */}
                        <CategoryHeader />

                        {/* Cards Section */}
                        <div className="flex flex-col sm:flex-row gap-6 order-2 lg:order-2 lg:col-span-3">
                            {categoriesData.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;