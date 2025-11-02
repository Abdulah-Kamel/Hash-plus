import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Facebook,
  Instagram,
  LucideLinkedin,
  Youtube,
  Dribbble,
  Share,
} from "lucide-react";
import Link from "next/link";

const MyProfileHeader = () => {
  return (
    <Card className="p-6">
      <CardContent className="flex max-lg:flex-col gap-4 justify-between">
        <div className="flex max-lg:flex-col max-lg:justify-center items-center gap-4">
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="space-y-2 max-lg:text-center">
            <h2 className="font-normal text-2xl">محمد علي</h2>
            <span className="text-muted-foreground">مصمم جرافيك</span>
            <ul className="flex flex-row-reverse gap-1 mt-4">
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <Facebook className="size-5" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <Instagram className="size-5" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3908 3.18341V5.44946C10.9948 5.41078 10.4802 5.32082 9.91094 5.11229C9.16764 4.83986 8.61437 4.46737 8.25197 4.17896V8.759L8.24272 8.7447C8.24861 8.83551 8.25197 8.92801 8.25197 9.02134C8.25197 11.2958 6.40129 13.1473 4.12599 13.1473C1.85068 13.1473 0 11.2958 0 9.02134C0 6.74688 1.85068 4.89451 4.12599 4.89451C4.34881 4.89451 4.56743 4.91217 4.781 4.94664V7.1799C4.57584 7.10675 4.35553 7.06724 4.12599 7.06724C3.04887 7.06724 2.17188 7.94339 2.17188 9.02134C2.17188 10.0993 3.04887 10.9754 4.12599 10.9754C5.2031 10.9754 6.08009 10.0985 6.08009 9.02134C6.08009 8.98098 6.07925 8.94062 6.07673 8.90026V0H8.3411C8.34951 0.191711 8.35708 0.385107 8.36549 0.576818C8.38062 0.954353 8.51515 1.31675 8.74974 1.61357C9.0247 1.96251 9.43082 2.3678 10.0009 2.69152C10.5348 2.99338 11.036 3.12371 11.3908 3.18509V3.18341Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.034476 0L5.56867 7.39936L0 13.4155H1.25365L6.12949 8.14854L10.0687 13.4155H14.3341L8.48879 5.59997L13.6724 0H12.4187L7.92881 4.85079L4.30073 0H0.0353073H0.034476ZM1.87752 0.923237H3.8366L12.4894 12.4923H10.5303L1.87752 0.923237Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <LucideLinkedin className="size-5" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <Youtube className="size-5" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.384774 5.52492C0.418408 5.5081 0.452057 5.49213 0.484849 5.47699C1.05494 5.21297 1.63259 4.96577 2.20941 4.71856C2.24052 4.71856 2.29264 4.6824 2.32207 4.67063C2.36663 4.65129 2.4112 4.6328 2.45577 4.61346C2.54153 4.57646 2.6273 4.5403 2.71223 4.50331C2.88376 4.43015 3.05443 4.357 3.22597 4.28384L4.25262 3.84409C4.93707 3.55148 5.62236 3.25802 6.3068 2.96541C6.99125 2.6728 7.67652 2.37935 8.36096 2.08674C9.0454 1.79413 9.73068 1.50068 10.4151 1.20807C11.0996 0.915457 11.7849 0.622004 12.4693 0.329392C12.6215 0.263807 12.7863 0.166268 12.9494 0.137679C13.0865 0.113295 13.2202 0.0662103 13.3581 0.0401444C13.6196 -0.00946497 13.908 -0.0296432 14.1585 0.0788247C14.2451 0.116662 14.325 0.169635 14.3914 0.236061C14.7093 0.550534 14.6647 1.0668 14.5974 1.50908C14.1291 4.59159 13.6608 7.67494 13.1916 10.7575C13.1277 11.1804 13.0402 11.6445 12.7064 11.9119C12.4239 12.1381 12.022 12.1633 11.673 12.0675C11.3241 11.9708 11.0163 11.7681 10.7145 11.5689C9.46246 10.7398 8.20962 9.91072 6.95761 9.08166C6.65996 8.8849 6.32867 8.62761 6.33203 8.27025C6.33371 8.055 6.46235 7.86329 6.59352 7.6926C7.68157 6.27327 9.25141 5.2979 10.4193 3.94415C10.5841 3.75328 10.7136 3.40854 10.4874 3.29839C10.3529 3.2328 10.1982 3.32193 10.0754 3.40685C8.53164 4.47892 6.98872 5.55183 5.44495 6.62389C4.94128 6.97368 4.41324 7.33356 3.80616 7.41933C3.26297 7.49669 2.71643 7.34533 2.19091 7.19062C1.75031 7.06113 1.31054 6.92828 0.872464 6.79122C0.639552 6.71891 0.399071 6.64071 0.219132 6.47675C0.0391926 6.31279 -0.0642164 6.03699 0.0442516 5.81837C0.112359 5.68131 0.244373 5.59471 0.383111 5.52408L0.384774 5.52492Z"
                      fill="#FEFFFC"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.93042 4.79193C5.72189 4.53043 5.4831 4.33031 5.21571 4.19493C5.45198 4.05115 5.65547 3.87458 5.82363 3.66437C6.107 3.30954 6.25078 2.86473 6.25078 2.34173C6.25078 1.90533 6.13558 1.50426 5.90772 1.15027C5.68069 0.796277 5.34268 0.51207 4.90292 0.305224C4.47241 0.102582 3.95361 0 3.36251 0H0V8.68332H3.51722C4.09319 8.68332 4.60778 8.57822 5.04586 8.37137C5.49234 8.16116 5.84045 7.86687 6.07925 7.49774C6.31889 7.12693 6.44081 6.70567 6.44081 6.24574C6.44081 5.70676 6.26928 5.21823 5.93042 4.79277V4.79193ZM4.14448 3.20948C3.9368 3.37764 3.63326 3.46341 3.24395 3.46341H1.7893V1.53958H3.24395C3.63157 1.53958 3.93343 1.62786 4.14112 1.80276C4.3404 1.97009 4.4371 2.20132 4.4371 2.50738C4.4371 2.81344 4.34124 3.05056 4.14448 3.20948ZM1.7893 5.00382H3.35073C3.75938 5.00382 4.07385 5.10304 4.31181 5.30736C4.53968 5.50327 4.65067 5.7631 4.65067 6.1028C4.65067 6.4425 4.54809 6.68213 4.33619 6.86122C4.11674 7.04705 3.80142 7.14123 3.39782 7.14123H1.7893V5.00382Z"
                      fill="white"
                    />
                    <path
                      d="M13.3112 3.3398C13.0405 2.85043 12.657 2.4645 12.171 2.19375C11.6859 1.923 11.125 1.78593 10.5062 1.78593C9.88732 1.78593 9.28444 1.92719 8.78751 2.20551C8.28973 2.48467 7.8979 2.88575 7.62379 3.39951C7.34968 3.91242 7.21094 4.51446 7.21094 5.18881C7.21094 5.86316 7.35388 6.46603 7.6364 6.9781C7.91892 7.49101 8.31411 7.89461 8.81189 8.17713C9.30882 8.45965 9.87891 8.6026 10.507 8.6026C11.2781 8.6026 11.9331 8.40668 12.4544 8.02074C12.9757 7.63479 13.3406 7.13197 13.5399 6.52741L13.5542 6.48453H12.0289L12.0197 6.50304C11.7262 7.09751 11.2175 7.39852 10.5062 7.39852C10.0109 7.39852 9.58714 7.24129 9.2466 6.9327C8.91447 6.63084 8.7236 6.22724 8.67904 5.73198H13.6669L13.6711 5.70424C13.703 5.50496 13.719 5.27961 13.719 5.03493C13.719 4.39926 13.582 3.82917 13.3112 3.3398ZM9.27015 3.42725C9.59471 3.13716 9.99074 2.99086 10.4465 2.99086C10.9501 2.99086 11.3781 3.13969 11.7187 3.43398C12.05 3.71987 12.2257 4.10412 12.2408 4.57499H8.69333C8.7606 4.09656 8.95483 3.71061 9.27099 3.42809L9.27015 3.42725Z"
                      fill="white"
                    />
                    <path
                      d="M12.1268 0.200119H8.80469V0.987141H12.1268V0.200119Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-gray-500 block p-[4px] rounded-full text-white"
                >
                  <Dribbble className="size-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4 flex-col justify-between max-lg:items-center items-end">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="p-5 border border-primary text-primary hover:text-primary cursor-pointer hover:bg-gray-100 rounded-full"
            >
              شكل الملف العام
            </Button>
            <Button
              variant="outline"
              className="p-5 bg-primary border border-primary text-white hover:text-white cursor-pointer hover:bg-primary/90 rounded-full"
            >
              اعدادات الحساب
            </Button>
          </div>
          <div className="">
            <Link href="#" className="flex gap-1 text-primary">
              مشاركة الحساب
              <Share className="size-5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProfileHeader;
