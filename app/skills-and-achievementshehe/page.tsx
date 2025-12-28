"use client";
import { useState } from "react";
import ChatBot from "../../components/chatbot/ChatBot";
import { useEffect } from "react";
import { TextLoop } from "@/components/motion-primitives/text-loop";

const Page = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [bgTransitioned, setBgTransitioned] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setBgTransitioned(true);
    }, 100); // Start transition after 100ms

    return () => clearTimeout(timer);
  }, []);
  console.log("is toggled", isToggled);
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Make it sticky when user reaches bottom (within 100px)
      if (scrollTop + clientHeight >= scrollHeight && !isToggled) {
        setIsToggled(true);
      }
      // Disable when user scrolls back to top (within 100px of top)
      if (scrollTop <= 100 && isToggled) {
        setIsToggled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isToggled]);

  return (
    <div
      className={`${bgTransitioned ? "bg-neutral-100" : "bg-neutral-200"} 
        transition-all duration-1000 ease-out
        w-full min-h-screen h-[calc(20vh+50vh+100vh+21.875px)] pt-[calc(20vh+21.875px)] text-[#0a0a0a] selection:bg-orange-600 selection:text-white px-6 md:px-8 lg:px-10 relative`}
    >
      <div className="max-w-5xl h-[calc(100vh-21.875px-20vh-5vh)] mx-auto flex flex-col justify-between">
        {/* Top Section */}
        <div className="max-h-[50vh] h-[50vh] px-6 md:px-8 lg:px-10 leading-loose flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <div className="relative overflow-hidden">
                <span
                  className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose transition-transform duration-650 ease-out ${
                    bgTransitioned ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "0ms" }}
                >
                  Ask about
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="relative overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-out ${
                    bgTransitioned ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "130ms" }}
                >
                  <TextLoop
                  interval={3}
                    className="overflow-y-clip text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose"
                    transition={{
                      type: "spring",
                      stiffness: 900,
                      damping: 80,
                      mass: 10,
                    }}
                    variants={{
                      initial: {
                        y: 20,
                        rotateX: 90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        y: -20,
                        rotateX: -90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                    }}
                  >
                    <span>What I have built</span>
                    <span>What I can build</span>
                    <span>My technical work</span>
                  </TextLoop>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-out ${
                    bgTransitioned ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "260ms" }}
                >
                  <TextLoop
                  interval={4}
                    className="overflow-y-clip text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose"
                    transition={{
                      type: "spring",
                      stiffness: 900,
                      damping: 80,
                      mass: 10,
                    }}
                    variants={{
                      initial: {
                        y: 20,
                        rotateX: 90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        y: -20,
                        rotateX: -90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                    }}
                  >
                    <span>My experiences</span>
                    <span>My background</span>
                    <span>My capabilities</span>
                  </TextLoop>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-out ${
                    bgTransitioned ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "390ms" }}
                >
                  <TextLoop
                  interval={3.5}
                    className="overflow-y-clip text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose"
                    transition={{
                      type: "spring",
                      stiffness: 900,
                      damping: 80,
                      mass: 10,
                    }}
                    variants={{
                      initial: {
                        y: 20,
                        rotateX: 90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        y: -20,
                        rotateX: -90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                    }}
                  >
                    <span>My projects</span>
                    <span>My creations</span>
                    <span>My expertise</span>
                  </TextLoop>
                </div>
              </div>
            </div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="relative overflow-hidden">
                <span
                  className={`block transition-transform duration-700 ease-out ${
                    bgTransitioned ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "650ms" }}
                >
                  or{" "}
                </span>
              </div>
              <div className="md:ml-4">
                <span
                  className={`block text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-parisienne transition-all duration-500 ease-out ${
                    bgTransitioned ? "opacity-100 blur-none" : "opacity-0 blur-2xl"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  Everything
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden mt-4 md:mt-0">
              <span
                className={`block font-mono hover:underline cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-700 ease-out ${
                  bgTransitioned ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: "1650ms" }}
                onClick={() => {
                  scrollToBottom();
                  if (!isToggled) {
                    setIsToggled(!isToggled);
                  }
                }}
              >
                via chat
              </span>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className={`py-[5vh] mx-auto w-full transition-all duration-1000 ease-in-out ${
          bgTransitioned ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
        style={{ transitionDelay: "2350ms" }}>
          <div className="px-6 md:px-8 lg:px-10">
            <ChatBot
            toggle={isToggled}
            onToggleDisable={() => setIsToggled(false)}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
