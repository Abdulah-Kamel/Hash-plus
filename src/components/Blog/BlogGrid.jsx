import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import {blogPosts} from "@/data/BlogPosts";

const BlogGrid = () => {


  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm rounded-2xl p-4 gap-4"
        >
          <div className="relative">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover rounded-2xl"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-secondary text-white px-3 py-1 rounded-full text-lg font-medium  h-10">
                {post.category}
              </Badge>
            </div>
          </div>

          <CardContent className="border-b-2 pb-3" dir="rtl">
            <div className="text-right space-y-3">
              <CardTitle className="text-xl font-bold text-gray-900 leading-tight hover:text-primary transition-colors">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </CardTitle>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>
          </CardContent>

          <CardFooter className="" dir="rtl">
            <div className="flex gap-2 items-center w-full text-sm text-muted-foreground">
              <span className="border-l-2 pl-2">{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default BlogGrid;
