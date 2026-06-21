import HeroBanner from "@/components/Banner";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navber";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
     <div className="flex flex-col items-center justify-center h-screen">
      <HeroBanner />


       {/* <Footer /> */}
     </div>
    </div>
  );
}
