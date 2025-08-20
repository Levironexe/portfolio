import Image from "next/image";
import HorizontalCarousel from "./components/HorizontalCarousel";
import HorizontalScrollCarouselMobile from "./components/HorizontalCarouselMobile";
export default function Home() {
  return (
    <div className="relative">
      <div className="hidden md:block">
        <HorizontalCarousel/>
      </div>
      <div className="block md:hidden">
        <HorizontalScrollCarouselMobile/>
      </div>
      {/* <MiddleCross/> */}
      {/* <Test/> */}
    </div>
    
  );
}
