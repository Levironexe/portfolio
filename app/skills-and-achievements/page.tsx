"use client";
import { useState } from "react";
import ChatBot from "../components/chatbot/ChatBot";
import { useEffect } from "react";
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
      className={`${
        bgTransitioned ? "bg-neutral-100" : "bg-neutral-200"
      } 
        transition-all duration-1000 ease-out
        w-full min-h-screen h-[calc(20vh+50vh+100vh+21.875px)] pt-[calc(20vh+21.875px)] text-[#0a0a0a] selection:bg-orange-600 selection:text-white px-6 md:px-8 lg:px-10 relative`}
    >
      <div className="max-w-5xl h-[calc(100vh-21.875px-20vh-5vh)] mx-auto flex flex-col justify-between">
        {/* Top Section */}
        <div className=" max-h-[50vh] h-[50vh] px-10 md:px-16  lg:px-20 leading-loose flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose">
                Ask about my
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose">
                Technical Skills
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose">
                Achievements
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose">
                Experience
              </div>
            </div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-loose flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="flex flex-col md:flex-row md:items-center">
              or{" "}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:ml-4 font-parisienne">
                Everything
              </span>
            </div>
            <div
              className="font-mono hover:underline cursor-pointer mt-4 md:mt-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl "
              onClick={() => {
                scrollToBottom();
                if (!isToggled) {
                  setIsToggled(!isToggled);
                }
              }}
            >
              via chat
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className={`py-[5vh] ${isToggled ? "" : ""}`}>
          <div className="">
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
