import React from 'react';
import Image from 'next/image';

const FloatingIcon = ({ Icon, color, rotation, position, hasColor }) => {
    const positionClasses = {
        'top-left': 'absolute top-4 left-4 md:top-8 md:left-10',
        'top-right': 'absolute top-4 right-4 md:top-8 md:right-8',
        'bottom-left': 'absolute bottom-4 left-4 md:bottom-8 md:left-10',
        'bottom-right': 'absolute bottom-4 right-4 md:bottom-8 md:right-8',
    };

    return (
        <div className={`hidden lg:block ${positionClasses[position]} ${rotation} transform transition-transform hover:scale-110`}>
            <div className={`${hasColor ? color : ''} py-3 rounded-3xl ${hasColor ? 'shadow-xl' : ''}`}>
                <Image src={Icon} className="w-full h-full" alt="Growth icon" width={64} height={64} />
            </div>
        </div>
    );
};

export default FloatingIcon;
