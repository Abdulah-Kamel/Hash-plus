import React from 'react';
import Image from 'next/image';
import { partnersData } from '../../data/partnersData';

const LogoCarousel = () => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
                    {partnersData.map((logo) => (
                        <Image
                            key={logo.id}
                            className="w-48 h-20 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            src={logo.src}
                            alt={logo.alt}
                            width={192}
                            height={80}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;