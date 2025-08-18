import Image from "next/image";
import HorizontalCarousel from "./components/HorizontalCarousel";
import Test from "./components/test";
import MiddleCross from "./components/MiddleCross";
export default function Home() {
  return (
    <div className="relative font-inter">
      {/* <MiddleCross/> */}
      <HorizontalCarousel/>
      {/* <Test/> */}
    </div>
    
  );
}
