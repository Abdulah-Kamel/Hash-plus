"use client";
import React, { useState } from "react";
import Container from "@/components/container";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import course_icon3 from "@/assets/course_icon3.svg";
import Image from "next/image";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-white py-16 lg:py-20 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <div
          dir="rtl"
          className="text-center mb-12 lg:mb-14 flex flex-col items-center gap-8"
        >
          <Badge className="bg-gray-100 text-primary h-11 w-39 rounded-full font-semibold text-base">
            انضم الينا
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-secondary">بوابتك للنمو</span> الشخصي والمهني
            معاً
          </h2>
          <p className="text-base md:text-xl font-light text-muted-foreground max-w-5xl mx-auto">
            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير
            مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على
            التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 bg-[#F1F3FE] px-6 lg:px-10 py-6 lg:py-14 rounded-3xl">
          {/* Support Info */}
          <div
            dir="rtl"
            className="order-2 lg:order-1 col-span-1 rounded-2xl p-8 text-right space-y-7"
          >
            <div className="space-y-3">
              <Badge
                variant={"secondary"}
                className="bg-primary text-white h-10 w-27 rounded-full font-semibold text-base"
              >
                التواصل
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                هل لديك أسئلة؟ نحن هنا لمساعدتك
              </h3>
              <p className="text-base text-muted-foreground leading-[1.7]">
                املأ الاستمارة و أرسل لنا و سنقوم بالتواصل معك من خلال أحد
                مسؤولين خدمة العملاء
              </p>
            </div>

            <div>
              <p className="text-base leading-[1.7]">
                تواصل معنا عبر البريد الألكتروني
              </p>
              <p className="text-base text-muted-foreground leading-[1.7] mt-1">
                ihashplusc@gmail.com
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3.5 text-base">
                منصات التواصل الأجتماعي
              </h4>
              <div className="flex justify-end gap-3" dir="ltr">
                <Link
                  href="#"
                  className="text-base text-muted-foreground leading-[1.7] border-2 border-gray-400 rounded-full p-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.19C22 19.83 19.83 22 16.19 22H15C14.45 22 14 21.55 14 21V15.23C14 14.96 14.22 14.73 14.49 14.73L16.25 14.7C16.39 14.69 16.51 14.59 16.54 14.45L16.89 12.54C16.92 12.36 16.78 12.19 16.59 12.19L14.46 12.22C14.18 12.22 13.96 12 13.95 11.73L13.91 9.28C13.91 9.12 14.04 8.98001 14.21 8.98001L16.61 8.94C16.78 8.94 16.91 8.81001 16.91 8.64001L16.87 6.23999C16.87 6.06999 16.74 5.94 16.57 5.94L13.87 5.98001C12.21 6.01001 10.89 7.37 10.92 9.03L10.97 11.78C10.98 12.06 10.76 12.28 10.48 12.29L9.28 12.31C9.11 12.31 8.98001 12.44 8.98001 12.61L9.01001 14.51C9.01001 14.68 9.14 14.81 9.31 14.81L10.51 14.79C10.79 14.79 11.01 15.01 11.02 15.28L11.11 20.98C11.12 21.54 10.67 22 10.11 22H7.81C4.17 22 2 19.83 2 16.18V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81V16.19Z"
                      fill="#343A46"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-base text-muted-foreground leading-[1.7] border-2 border-gray-400 rounded-full p-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.9783 11.41C21.6383 5.60995 16.3683 1.13996 10.2983 2.13996C6.11833 2.82996 2.76834 6.21994 2.11834 10.3999C1.73834 12.8199 2.23836 15.1099 3.32836 16.9999L2.43835 20.3099C2.23835 21.0599 2.92833 21.7399 3.66833 21.5299L6.92834 20.63C8.40834 21.5 10.1383 21.9999 11.9883 21.9999C17.6283 21.9999 22.3083 17.03 21.9783 11.41ZM16.8783 15.7199C16.7883 15.8999 16.6783 16.07 16.5383 16.23C16.2883 16.5 16.0183 16.7 15.7183 16.82C15.4183 16.95 15.0883 17.01 14.7383 17.01C14.2283 17.01 13.6783 16.89 13.1083 16.64C12.5283 16.39 11.9584 16.0599 11.3884 15.6499C10.8084 15.2299 10.2683 14.7599 9.74834 14.2499C9.22834 13.7299 8.76832 13.1799 8.34832 12.6099C7.93832 12.0399 7.60834 11.4699 7.36834 10.8999C7.12834 10.3299 7.00835 9.77996 7.00835 9.25996C7.00835 8.91996 7.06835 8.58996 7.18835 8.28996C7.30835 7.97996 7.49836 7.69996 7.76836 7.44996C8.08836 7.12996 8.43834 6.97996 8.80834 6.97996C8.94834 6.97996 9.08832 7.00995 9.21832 7.06995C9.34832 7.12995 9.46834 7.21995 9.55834 7.34995L10.7183 8.98994C10.8083 9.11994 10.8783 9.22994 10.9183 9.33994C10.9683 9.44994 10.9883 9.54994 10.9883 9.64994C10.9883 9.76994 10.9483 9.88996 10.8783 10.01C10.8083 10.13 10.7183 10.2499 10.5983 10.3699L10.2183 10.7699C10.1583 10.8299 10.1384 10.8899 10.1384 10.9699C10.1384 11.0099 10.1483 11.0499 10.1583 11.0899C10.1783 11.1299 10.1884 11.16 10.1984 11.1899C10.2884 11.36 10.4483 11.5699 10.6683 11.8299C10.8983 12.0899 11.1384 12.3599 11.3984 12.6199C11.6684 12.8899 11.9284 13.1299 12.1984 13.3599C12.4584 13.5799 12.6783 13.73 12.8483 13.82C12.8783 13.83 12.9083 13.8499 12.9383 13.8599C12.9783 13.8799 13.0184 13.88 13.0684 13.88C13.1584 13.88 13.2184 13.85 13.2784 13.79L13.6583 13.41C13.7883 13.28 13.9084 13.19 14.0184 13.13C14.1384 13.06 14.2483 13.0199 14.3783 13.0199C14.4783 13.0199 14.5783 13.0399 14.6883 13.0899C14.7983 13.1399 14.9183 13.2 15.0383 13.29L16.6984 14.4699C16.8284 14.5599 16.9183 14.67 16.9783 14.79C17.0283 14.92 17.0583 15.0399 17.0583 15.1799C16.9983 15.3499 16.9583 15.5399 16.8783 15.7199Z"
                      fill="#343A46"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-base text-muted-foreground leading-[1.7] border-2 border-gray-400 rounded-full p-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 4H7C4 4 2 6 2 9V15C2 18 4 20 7 20H17C20 20 22 18 22 15V9C22 6 20 4 17 4ZM13.89 13.03L11.42 14.51C10.42 15.11 9.59998 14.65 9.59998 13.48V10.51C9.59998 9.34001 10.42 8.88001 11.42 9.48001L13.89 10.96C14.84 11.54 14.84 12.46 13.89 13.03Z"
                      fill="#343A46"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div dir="rtl" className="order-1 lg:order-2 col-span-2">
            <h3 className="text-2xl md:text-3xl font-normal text-gray-900">
              املأ الأستمارة
            </h3>
            <Card className="mt-4 border-0 shadow-sm rounded-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-right text-sm font-medium text-gray-700"
                      >
                        الاسم
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="الاسم بالكامل"
                        className="text-right border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-right text-sm font-medium text-gray-700"
                      >
                        البريد الإلكتروني
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="البريد الألكتروني"
                        className="text-right border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-right text-sm font-medium text-gray-700"
                    >
                      الموضوع
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="الموضوع"
                      className="text-right border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-right text-sm font-medium text-gray-700"
                    >
                      الرسالة
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب هنا رسالتك"
                      className="text-right border-gray-300 rounded-lg resize-none min-h-38"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 transition-all duration-300 rounded-full cursor-pointer"
                  >
                    أرسل لنا
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
