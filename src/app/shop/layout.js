export const metadata = {
  title: "التعليم - تصفح الدورات",
  description: "استكشف مجموعة واسعة من الدورات التدريبية في البرمجة، التصميم، وتطوير المواقع. فلتر الدورات حسب الفئة، المستوى، والتقييم للعثور على الدورة المناسبة لك.",
  keywords: [
    "دورات تدريبية",
    "تعلم البرمجة",
    "دورات التصميم",
    "تطوير المواقع",
    "دورات أونلاين",
    "تعليم رقمي",
    "كورسات متخصصة",
    "تدريب عملي"
  ],
  openGraph: {
    title: "Hash Plus - التعليم",
    description: "استكشف مجموعة واسعة من الدورات التدريبية المتخصصة",
    url: "https://hashplus.com/shop",
    images: [
      {
        url: "/og-shop.jpg",
        width: 1200,
        height: 630,
        alt: "Hash Plus - دورات تدريبية",
      },
    ],
  },
};

export default function ShopLayout({ children }) {
  return children;
}
