import React from 'react';
import CourseHeader from "@/components/course-page/CourseHeader";
import {NavBar} from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Assignment from "@/components/course-page/assignment/Assignment";
import FinalAssignment from "@/components/course-page/assignment/FinalAssignment";

const AssignmentPage = () => {
    const isFinal = false;
    return (
        <>
            <NavBar />
            <CourseHeader/>
            <Container className="max-w-5xl">
                {
                    isFinal ?
                        <FinalAssignment/>
                        :
                        <Assignment/>
                }
            </Container>
            <Footer/>
        </>
    );
};

export default AssignmentPage;