import React from 'react';

const Container = ({ children, className = '' }) => {
    return (
        <div className={`w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};

export default Container;