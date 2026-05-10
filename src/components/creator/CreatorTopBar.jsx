import { Bell, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const CreatorTopBar = ({ title = "الرئيسية" }) => {
  return (
    <section className="bg-white">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-bold">{title}</h4>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="search"
              className={`p-3 pe-10 text-sm rounded-full border border-gray-300 focus:ring-0 w-56`}
              placeholder="ابحث هنا"
              required
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <Search className={`text-gray-500 w-6 h-6`} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full border border-gray-300">
              <Bell className={`text-gray-500 w-6 h-6`} />
            </button>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                width={40}
                height={40}
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorTopBar;
