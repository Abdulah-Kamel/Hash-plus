import Image from "next/image";
import React from "react";
import chessboard_secondry from "@/assets/chessboard_secondry.svg";
import course_icon3 from "@/assets/course_icon3.svg";
import geometricpattern from "@/assets/geometricpattern.svg";
import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";

const AboutUsPage = () => {
    return (
        <>
            <NavBar />
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/5 via-white to-white">
                <div className="relative bg-primary overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0">
                        <div className="w-32 sm:w-40 h-32 sm:h-40">
                            <Image
                                src={chessboard_secondry}
                                alt={"chessboard_secondry"}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-1/4 left-12 transform -translate-x-1/2">
                            <Image
                                src={course_icon3}
                                alt={"course_icon3"}
                                className="w-32 sm:w-40 h-32 sm:h-40"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-4 lg:px-8 py-24 text-center">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                            عن المنصة
                        </h1>
                    </div>
                </div>

                <Container className="relative py-20 lg:py-28">
                    <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
                        <div className="rounded-xl px-4 py-20 bg-gradient-to-t from-primary/70  to-primary flex items-center justify-center h-full gap-4">
                            <Image
                                src={geometricpattern}
                                alt="Geometric Pattern"
                                className="h-25 w-25 object-contain"
                            />
                            <h1 className="text-2xl sm:text-5xl font-bold text-white">
                                هاش بلس
                            </h1>
                        </div>
                        <div
                            dir="rtl"
                            className="flex flex-col justify-center gap-6 text-right py-20"
                        >
              <span className="inline-flex w-fit items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                عن منصتنا
              </span>
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                                عن منصة هاش بلس
                            </h2>
                            <p className="text-lg leading-8 text-gray-600">
                                معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية لتطوير
                                مواهبك في مجالات التقنيات الحديثة، بمنهجية تفاعلية قائمة على
                                التطبيقات العملية ضمن بيئة تعليمية محفزة وتنافسية.
                            </p>
                            <p className="text-lg leading-8 text-gray-600">
                                نرافقك في رحلة متكاملة تبدأ من بناء أساسياتك التقنية وحتى احتراف
                                مجالك عبر محتوى عربي متجدد، أنشطة مجتمعية وإرشاد متخصص يضمن
                                تحقيق طموحاتك المهنية.
                            </p>
                        </div>
                    </div>
                </Container>
                <Container className="py-16 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                        <div dir="rtl" className="space-y-10 text-right">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">رؤيتنا</h3>
                                <p className="text-lg leading-8 text-gray-600">
                                    لقد تعلمت كثيرًا من خلال رحلتي في هذا المجتمع، لكي أتيح رحلتك
                                    تصبح رحلة مليئة بالتعلم الممتع والمختلف و الشغف الذي يجعلك
                                    تستفيد حول كل المحاور الأخرى. فقد كان لحاضنين لي في كل مرحلة
                                    رحلة أديت هذا الموقف لجميع مستقبلي. لقد تعلمت كثيرًا من خلال
                                    داخلي في هذا المجتمع لكي أصبح مميزًا كانت رحلة مليئة بالتعلم
                                    الممتع والمختلف والتفاعل الذي استفدت منه أفضلية الأنشطة التي
                                    استفدت جدا، وكان العاملون رائعين. فقد كانوا ساندين لي في كل
                                    بيئة أنحتها رحلة لأرشد هذا الموقف للجميع احتمالي.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">مهمتنا</h3>
                                <ul className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                    <li className="flex items-center justify-between gap-4 px-5 py-4 text-base font-medium text-gray-700">
                                        <span>إنشاء جيل متعلم</span>
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    </li>
                                    <li className="flex items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 text-base font-medium text-gray-700">
                                        <span>تعليم جميع الأعمار</span>
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    </li>
                                    <li className="flex items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 text-base font-medium text-gray-700">
                                        <span>الارتقاء بمستوى التعليم</span>
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    </li>
                                    <li className="flex items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 text-base font-medium text-gray-700">
                                        <span>إنشاء مجتمع صحي ومتعلم</span>
                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <div
                                dir="rtl"
                                className="relative flex w-full max-w-md flex-col gap-5 rounded-3xl bg-gradient-to-br from-white via-[#F6F1FF] to-[#EDE8FF] p-10 text-right shadow-lg shadow-primary/10 ring-1 ring-primary/10"
                            >
                <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                  رؤيتنا ومهمتنا
                </span>
                                <h2 className="text-3xl font-bold leading-snug text-gray-900 sm:text-4xl">
                                    تعرف على هدفنا ومهمتنا تجاه المجتمع
                                </h2>
                                <p className="text-base leading-7 text-gray-600">
                                    نعمل على تمكين كل متعلم من اكتشاف مساره المهني عبر محتوى حديث،
                                    وشركاء موثوقين، وتجربة تعلم تركز على التطبيق العملي والتواصل
                                    الإنساني.
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm font-medium text-primary">
                  <span className="rounded-full bg-white px-4 py-1 shadow-sm shadow-primary/10">
                    رحلات تعلم مرنة
                  </span>
                                    <span className="rounded-full bg-white px-4 py-1 shadow-sm shadow-primary/10">
                    مجتمع داعم
                  </span>
                                </div>
                                <svg
                                    viewBox="0 0 64 64"
                                    className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 text-[#B65CFF]"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M32 6c0 10-8 18-18 18H6C6 14 14 6 32 6Z"
                                        fill="currentColor"
                                        opacity="0.65"
                                    />
                                    <path
                                        d="M58 32c-10 0-18-8-18-18V6c12 0 20 8 18 26Z"
                                        fill="currentColor"
                                        opacity="0.75"
                                    />
                                    <path
                                        d="M32 58c0-10 8-18 18-18h8c0 12-8 20-26 18Z"
                                        fill="currentColor"
                                        opacity="0.85"
                                    />
                                    <path
                                        d="M6 32c10 0 18 8 18 18v8C12 58 4 50 6 32Z"
                                        fill="currentColor"
                                        opacity="0.55"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default AboutUsPage;