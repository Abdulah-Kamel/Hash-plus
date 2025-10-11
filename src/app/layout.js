import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin", "arabic"],
});

export const metadata = {
  title: {
    default: "Hash Plus - منصة التعليم الرقمي الرائدة",
    template: "%s | Hash Plus"
  },
  description: "منصتنا توفر تجربة تعليمية شاملة مع أحدث التقنيات في مجال التعليم الرقمي لضمان تقديم أفضل تجربة تعليمية ممكنة وتحقيق أهدافك التعليمية",
  keywords: [
    "تعليم رقمي",
    "دورات أونلاين",
    "برمجة",
    "تطوير مواقع",
    "تصميم",
    "تعلم عن بعد",
    "Hash Plus",
    "منصة تعليمية",
    "كورسات",
    "تدريب"
  ],
  authors: [{ name: "Hash Plus Team" }],
  creator: "Hash Plus",
  publisher: "Hash Plus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hashplus.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://hashplus.com',
    title: 'Hash Plus - منصة التعليم الرقمي الرائدة',
    description: 'منصتنا توفر تجربة تعليمية شاملة مع أحدث التقنيات في مجال التعليم الرقمي',
    siteName: 'Hash Plus',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hash Plus - منصة التعليم الرقمي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Plus - منصة التعليم الرقمي الرائدة',
    description: 'منصتنا توفر تجربة تعليمية شاملة مع أحدث التقنيات في مجال التعليم الرقمي',
    images: ['/twitter-image.jpg'],
    creator: '@hashplus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={alexandria.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
