import HeroBanner from "@/components/Banner";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import Footer from "@/components/Footer";
import LegalCategories from "@/components/LegalCategories";
import TopExperts from "@/components/TopExperts";
// import Navbar from "@/components/Navber";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
     <div className="flex flex-col items-center ">
      <HeroBanner />

      <FeaturedLawyers />

      <TopExperts />

      <LegalCategories />


       {/* <Footer /> */}
     </div>
    </div>
  );
}
