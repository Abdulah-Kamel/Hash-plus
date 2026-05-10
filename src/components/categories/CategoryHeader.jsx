import React from 'react';

const CategoryHeader = () => {
  return (
    <div className="text-right text-white space-y-6 order-2 lg:order-1 lg:col-span-2">
      <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
        عن المنصة
      </div>

      <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
        فئات هاش بلس
        <br />
        <span className="text-green-300">التعليمية</span>
      </h2>

      <p className="text-lg text-white/90 leading-relaxed">
        معسكرات وبرامج تدريبية بالشراكة مع كبرى الجهات العالمية، لتطوير مهاراتك في مجالات التقنيات الحديثة.
      </p>
    </div>
  );
};

export default CategoryHeader;
