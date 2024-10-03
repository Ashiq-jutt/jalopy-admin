import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import flag from "../../assets/flag.svg";
import search from "../../assets/search.svg";
import { motion, useAnimation } from "framer-motion";
import { ArrowDownward, KeyboardArrowDown } from "@mui/icons-material";
const Nav = () => {
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isVisible, setIsVisible] = useState(true);
  const partnerDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const controls = useAnimation();
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos < prevScrollPos || currentScrollPos < 300);
    setPrevScrollPos(currentScrollPos);
  };

  const togglePartnerDropdown = () => {
    setIsPartnerDropdownOpen(!isPartnerDropdownOpen);
  };

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  useEffect(() => {
    const closeDropdowns = (event) => {
      if (
        partnerDropdownRef.current &&
        !partnerDropdownRef.current.contains(event.target)
      ) {
        setIsPartnerDropdownOpen(false);
      }

      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdowns);

    return () => {
      document.removeEventListener("click", closeDropdowns);
    };
  }, []);
  useEffect(() => {
    controls.start(isVisible ? { y: 0 } : { y: -100 });
  }, [isVisible, controls]);
  return (
    <motion.div
      className={`bg-[#022859] max-sm:p-3 fixed w-full ${
        isVisible ? "block" : "hidden"
      }`}
      initial={{ y: -100 }} // Initial position (hidden)
      animate={controls} // Animation controlled by 'controls'
    >
      <div className=" flex items-center justify-between  text-[#A0E3F2] pl-10 pr-10 p-3">
        <div className="flex items-center gap-10">
          <svg
            width="28"
            height="38"
            viewBox="0 0 43 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.28906 13.3944C1.28906 12.7113 1.56044 12.0561 2.04348 11.5731C2.52653 11.09 3.18169 10.8187 3.86482 10.8187H30.4157C31.0989 10.8187 31.754 11.09 32.2371 11.5731C32.7201 12.0561 32.9915 12.7113 32.9915 13.3944C32.9915 14.0775 32.7201 14.7327 32.2371 15.2157C31.754 15.6988 31.0989 15.9702 30.4157 15.9702H3.86482C3.18169 15.9702 2.52653 15.6988 2.04348 15.2157C1.56044 14.7327 1.28906 14.0775 1.28906 13.3944ZM1.28906 3.09138C1.28906 2.40825 1.56044 1.7531 2.04348 1.27005C2.52653 0.786999 3.18169 0.515625 3.86482 0.515625H39.9254C40.6086 0.515625 41.2637 0.786999 41.7468 1.27005C42.2298 1.7531 42.5012 2.40825 42.5012 3.09138C42.5012 3.77452 42.2298 4.42967 41.7468 4.91272C41.2637 5.39577 40.6086 5.66714 39.9254 5.66714H3.86482C3.18169 5.66714 2.52653 5.39577 2.04348 4.91272C1.56044 4.42967 1.28906 3.77452 1.28906 3.09138ZM1.28906 23.6974C1.28906 23.0143 1.56044 22.3592 2.04348 21.8761C2.52653 21.3931 3.18169 21.1217 3.86482 21.1217H39.9254C40.6086 21.1217 41.2637 21.3931 41.7468 21.8761C42.2298 22.3592 42.5012 23.0143 42.5012 23.6974C42.5012 24.3806 42.2298 25.0357 41.7468 25.5188C41.2637 26.0018 40.6086 26.2732 39.9254 26.2732H3.86482C3.18169 26.2732 2.52653 26.0018 2.04348 25.5188C1.56044 25.0357 1.28906 24.3806 1.28906 23.6974ZM1.28906 34.0005C1.28906 33.3173 1.56044 32.6622 2.04348 32.1791C2.52653 31.6961 3.18169 31.4247 3.86482 31.4247H30.4157C31.0989 31.4247 31.754 31.6961 32.2371 32.1791C32.7201 32.6622 32.9915 33.3173 32.9915 34.0005C32.9915 34.6836 32.7201 35.3388 32.2371 35.8218C31.754 36.3049 31.0989 36.5762 30.4157 36.5762H3.86482C3.18169 36.5762 2.52653 36.3049 2.04348 35.8218C1.56044 35.3388 1.28906 34.6836 1.28906 34.0005Z"
              fill="#A0E3F2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 11.5909C0 11.2493 0.135687 10.9218 0.377211 10.6802C0.618735 10.4387 0.946312 10.303 1.28788 10.303H30.4145C30.7561 10.303 31.0837 10.4387 31.3252 10.6802C31.5667 10.9218 31.7024 11.2493 31.7024 11.5909C31.7024 11.9325 31.5667 12.2601 31.3252 12.5016C31.0837 12.7431 30.7561 12.8788 30.4145 12.8788H1.28788C0.946312 12.8788 0.618735 12.7431 0.377211 12.5016C0.135687 12.2601 0 11.9325 0 11.5909ZM0 1.28788C0 0.946312 0.135687 0.618735 0.377211 0.377211C0.618735 0.135687 0.946312 0 1.28788 0H39.9242C40.2658 0 40.5934 0.135687 40.8349 0.377211C41.0764 0.618735 41.2121 0.946312 41.2121 1.28788C41.2121 1.62945 41.0764 1.95702 40.8349 2.19855C40.5934 2.44007 40.2658 2.57576 39.9242 2.57576H1.28788C0.946312 2.57576 0.618735 2.44007 0.377211 2.19855C0.135687 1.95702 0 1.62945 0 1.28788ZM0 21.8939C0 21.5524 0.135687 21.2248 0.377211 20.9833C0.618735 20.7417 0.946312 20.6061 1.28788 20.6061H39.9242C40.2658 20.6061 40.5934 20.7417 40.8349 20.9833C41.0764 21.2248 41.2121 21.5524 41.2121 21.8939C41.2121 22.2355 41.0764 22.5631 40.8349 22.8046C40.5934 23.0461 40.2658 23.1818 39.9242 23.1818H1.28788C0.946312 23.1818 0.618735 23.0461 0.377211 22.8046C0.135687 22.5631 0 22.2355 0 21.8939ZM0 32.197C0 31.8554 0.135687 31.5278 0.377211 31.2863C0.618735 31.0448 0.946312 30.9091 1.28788 30.9091H30.4145C30.7561 30.9091 31.0837 31.0448 31.3252 31.2863C31.5667 31.5278 31.7024 31.8554 31.7024 32.197C31.7024 32.5385 31.5667 32.8661 31.3252 33.1076C31.0837 33.3492 30.7561 33.4848 30.4145 33.4848H1.28788C0.946312 33.4848 0.618735 33.3492 0.377211 33.1076C0.135687 32.8661 0 32.5385 0 32.197Z"
              fill="#A0E3F2"
            />
          </svg>
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={logo} className="w-12 max-md:hidden" />
        </div>
        <div className="flex items-center gap-14 sm:gap-5  max-sm:hidden">
          <div className="relative inline-block " ref={partnerDropdownRef}>
            <p
              onClick={togglePartnerDropdown}
              className={`cursor-pointer text-[1.5rem] flex`}
            >
              Become Partner
              <div>
                <KeyboardArrowDown fontSize="large" className={``} />
              </div>
            </p>
            {isPartnerDropdownOpen && (
              <div className="absolute mt-2 bg-[#F2F2F2] text-[#024873] font-inter font-normal text-[1rem] w-[14rem] p-2 rounded-xl shadow">
                {/* Dropdown menu content */}
                <p className="border-b border-[#024873] cursor-pointer p-3 flex justify-center items-center">
                  Become A Seller
                </p>
                <p className="border-b border-[#024873] cursor-pointer p-3 flex justify-center items-center">
                  Become A Raider
                </p>
                <p className="border-b border-[#024873] cursor-pointer p-3 flex justify-center items-center">
                  Become A Courier
                </p>
                {/* Add more menu items as needed */}
              </div>
            )}
          </div>
          <p className="text-[1.5rem]">Help</p>
          <div className="relative inline-block" ref={countryDropdownRef}>
            <div
              onClick={toggleCountryDropdown}
              className="flex items-center gap-3 border p-1 border-[#A0E3F2] cursor-pointer"
            >
              <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={flag} className="w-9" />
              <p>Germany</p>
              <KeyboardArrowDown fontSize="large" />
            </div>
            {isCountryDropdownOpen && (
              <div className="absolute mt-2 bg-[#F2F2F2] text-[#024873] font-inter font-normal text-[1rem] w-[14rem] p-2 rounded-xl shadow">
                {/* Dropdown menu content */}
                <p className="border-b border-[#024873] cursor-pointer p-3 flex justify-center items-center">
                  Pakistan
                </p>
                <p className="border-b border-[#024873] cursor-pointer p-3 flex justify-center items-center">
                  Germany
                </p>

                {/* Add more menu items as needed */}
              </div>
            )}
          </div>
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={search} className="w-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
