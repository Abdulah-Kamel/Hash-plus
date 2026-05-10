import React from "react";
import Container from "@/components/container";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import MyProfileHeader from "@/components/my-profile/MyProfileHeader";
import InfoCard from "@/components/my-profile/ProfileCards/InfoCard";
import ExpiritesCard from "@/components/my-profile/ProfileCards/ExpiritesCard";
import CiriftcatesCard from "@/components/my-profile/ProfileCards/CiriftcatesCard";
const MyProfile = () => {
  return (
    <>
      <Container>
        <section className="py-12 space-y-4">
          <MyProfileHeader />
          <InfoCard />
          <ExpiritesCard />
          <CiriftcatesCard />
        </section>
      </Container>
    </>
  );
};

export default MyProfile;
