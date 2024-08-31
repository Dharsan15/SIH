import React from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-[#101212] to-[#08201D] relative">
      <header className="absolute inset-x-0 top-0 z-10 w-full">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title="AuraUI" className="flex">
                <h1 className="text-white mr-10" >Our Product Name</h1>
              </a>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a
                href="#"
                title="Features"
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                Features
              </a>
              <a
                href="#"
                title="Solutions"
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                Solutions
              </a>
              <a
                href="#"
                title="Resources"
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                Resources
              </a>
              <a
                href="#"
                title="Pricing"
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                Pricing
              </a>
            </div>
            <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
              <a
                href="#"
                title="Log in"
                className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80"
              >
                Log in
              </a>
              <a
                href="#"
                title="Apply for free"
                className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg"
                role="button"
              >
                Try Now
              </a>
            </div>
            <button
              type="button"
              className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800"
            >
              <HiOutlineMenuAlt3 className="block w-6 h-6" />
              <HiOutlineX className="hidden w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
                 Helping People To Communicate without any barriers
              </span>
            </h1>
            <p className="mt-5 text-base text-white sm:text-xl">
               A realtime Communication Platform Which Bridges the Gap Between Differently Abled People and Normal People 
            </p>
            <a
              href="#"
              title="Get Started"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700"
              role="button"
            >
              Get Started
              <FaArrowRight className="w-6 h-6 ml-8 -mr-2" />
            </a>

            {/* <div className="grid grid-cols-1 px-20 mt-40 text-left gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0">
              <div className="flex items-center">
                <HiOutlineCreditCard className="w-8 h-8 text-[#28CC9D]" />
                <p className="ml-3 text-sm text-white">Trusted by developers worldwide</p>
              </div>
              <div className="flex items-center">
                <HiOutlineCheckCircle className="w-8 h-8 text-[#28CC9D]" />
                <p className="ml-3 text-sm text-white">Seamless integration with Next.js</p>
              </div>
              <div className="flex items-center">
                <HiOutlineLockClosed className="w-8 h-8 text-[#28CC9D]" />
                <p className="ml-3 text-sm text-white">Secure and optimized codebase</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
