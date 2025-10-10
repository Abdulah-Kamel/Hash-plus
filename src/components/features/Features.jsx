import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuresData } from '../../data/featuresData';
import FeatureItem from './FeatureItem';
import chooseUs from "../../assets/chooseus.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
    return (
        <section className="bg-white py-24 sm:py-32 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
                    {/* Image Collage */}
                    <div className="rounded-3xl bg-gray-100 p-6 flex justify-center items-center">
                        <Image src={chooseUs} alt="لماذا تختار هاش" className="w-full h-auto" />
                    </div>

                    {/* Features List */}
                    <div className="text-right">
                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            لماذا تختار هاش؟
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            نحن نقدم لك أفضل تجربة تعليمية لتطوير مهاراتك في البرمجة.
                        </p>

                        <Card className="mt-2 border-none shadow-none">
                            <CardContent className="p-6 ">
                                <dl className="space-y-5">
                                    {featuresData.map((feature) => (
                                        <FeatureItem key={feature.id} feature={feature} />
                                    ))}
                                </dl>
                            </CardContent>
                        </Card>

                        <div className="mt-2">
                            <Button asChild size="lg" className="px-20 py-6 rounded-[100px]">
                                <Link href="/register">انضم إلينا</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;