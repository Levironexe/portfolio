"use client";
import { useState, useEffect } from "react";
import ChatBot from "../../components/chatbot/ChatBot";
import { TextLoop } from "@/components/motion-primitives/text-loop";

const Page = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToChat = () => {
    document
      .getElementById("chat-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const [bgTransitioned, setBgTransitioned] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setBgTransitioned(true);
    }, 100); // Start transition after 100ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight && !isToggled) {
        setIsToggled(true);
      }
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
        w-full min-h-screen text-[#0a0a0a] selection:bg-orange-600 selection:text-white relative`}
    >
      {" "}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="min-h-screen flex flex-col justify-center py-20">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl  leading-[1.35] mb-8">
              Ask about
              <div

                style={{ transitionDelay: "260ms" }}
              >
                <TextLoop
                  interval={4}
                  className="overflow-y-clip"
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
                  <span>my experiences</span>
                  <span>my background</span>
                  <span>my capabilities</span>
                </TextLoop>
                                <br />

                <TextLoop
                  interval={4}
                  className="overflow-y-clip"
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
                  <span>my competencies</span>
                  <span>my qualifications</span>
                  <span>my proficiencies</span>
                </TextLoop>
                                <br />

                <TextLoop
                  interval={4}
                  className="overflow-y-clip"
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
                  <span>my expertise</span>
                  <span>my skills</span>
                  <span>my knowledge</span>
                  
                </TextLoop>
                <br />
              </div>
            </h1>

            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => {
                  setIsToggled(true);
                  scrollToChat();
                }}
                className="text-lg font-mono hover:underline underline-offset-4 transition-all cursor-pointer"
              >
                via chat
              </button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div
          id="chat-section"
          className={`pt-20 pb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "2350ms" }}
        >
          <ChatBot
            toggle={isToggled}
            onToggleDisable={() => setIsToggled(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
