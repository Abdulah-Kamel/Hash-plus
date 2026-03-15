import BlogGrid from "@/components/Blog/BlogGrid";
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogHero from "@/components/Blog/BlogHero";
import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import CustomPagination from "@/components/shared/CustomPagination";
import React from "react";

const BlogPage = () => {
  return (
    <>
      <BlogHero />
      <Container className="py-12">
        <BlogHeader />
        <BlogGrid/>
        <CustomPagination/>
      </Container>
    </>
  );
};

export default BlogPage;
