import React from "react";
import "./Hero.css";
import hero_image from "../Assets/hero_image.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;

// import React from "react";
// import { Carousel } from "@material-tailwind/react";
// import "./Hero.css";
// import hero_image from "../Assets/hero_image.png";
// import hand_icon from "../Assets/hand_icon.png";
// import arrow_icon from "../Assets/arrow.png";
// import f2.jpg from "../Assets/f2.jpg";

// const Hero = () => {
//   return (
//     <div className="hero">
//       <div className="hero-left">
//         <Carousel
//           className="rounded-xl"
//           navigation={({ setActiveIndex, activeIndex, length }) => (
//             <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
//               {new Array(length).fill("").map((_, i) => (
//                 <span
//                   key={i}
//                   className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
//                     activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
//                   }`}
//                   onClick={() => setActiveIndex(i)}
//                 />
//               ))}
//             </div>
//           )}
//         >
//           {/* First Carousel Slide with Text */}
//           <div className="relative">
//             {/* <img
//               src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//               alt="carousel image 1"
//               className="h-full w-full object-cover"
//             /> */}
//             <div className="absolute top-1/4 left-10 text-white">
//               <h2>NEW ARRIVALS ONLY</h2>
//               <div>
//                 <div className="hero-hand-icon flex items-center">
//                   <p>new</p>
//                   <img src={hand_icon} alt="" className="ml-2" />
//                 </div>
//                 <p>collections</p>
//                 <p>for everyone</p>
//               </div>
//               <div className="hero-latest-btn flex items-center mt-4">
//                 <div>Latest Collection</div>
//                 <img src={arrow_icon} alt="" className="ml-2" />
//               </div>
//             </div>
//           </div>

//           {/* Second Slide */}
//           <img src={f2.jpg} alt="" 
//           {/* <img
//             src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//             alt="carousel image 2"
//             className="h-full w-full object-cover"
//           /> */}

//           {/* Third Slide */}
//           {/* <img
//             src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//             alt="carousel image 3"
//             className="h-full w-full object-cover"
//           /> */}
//         </Carousel>
//       </div>
      
//       {/* Hero Right Image */}
//       <div className="hero-right">
//         <img src={hero_image} alt="hero" />
//       </div>
//     </div>
//   );
// };

// export default Hero;
