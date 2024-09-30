import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import emojiStarImage from '../assets/images/emojistar.svg';
import helixImage from '../assets/images/helix2.svg';

export function CallToAction() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const [pos,setPos] = useState({
    x : 180,
    y : -80,
    from : 0.7,
    to : 1.1
  })

  useEffect(()=>{
    if(window.innerWidth<600){
      setPos({
        x : 180,
        y : -30,
        from : 0.5,
        to : 0.6
      })
      console.log("this is phone")
    }
  },[])

  const translateY = useTransform(scrollYProgress, [0, 1], [pos.x,pos.y]);
  const scale = useTransform(scrollYProgress, [0, 1], [pos.from,pos.to]); // Scale from 1 to 1.2
  

  return (
    <div
      className="bg-black md:h-screen flex justify-center items-center py-[72px] text-center text-white sm:py-24"
      ref={containerRef}
    >
      <div className="container relative max-w-lg">
        <motion.div style={{ translateY, scale }}>
          <img
            height={150}
            width={150}
            src={helixImage}
            alt=""
            className="absolute left-72 lg:left-[calc(100%+36px)] top-[14rem] lg:top-24"
          />
        </motion.div>
        <motion.div style={{ translateY, scale }}>
          <img
            height={150}
            width={150}
            src={emojiStarImage}
            alt=""
            className="absolute -top-[100px] lg:-top-[70px] right-72 lg:right-[calc(100%+24px)]"
          />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter sm:text-6xl">
          Get connect we me
        </h2>
        <p className="mt-5 text-base px-5 md:px-0 md:text-xl text-white/70">
        Let’s collaborate and grow together! Whether you want to brainstorm ideas, share insights, or explore new projects, I’d love to hear from you.
        </p>
        <div className="md:mx-auto mt-10 flex max-w-sm gap-2.5 sm:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="h-12 rounded-lg bg-white/20 w-[80%] md:w-full px-5 placeholder:text-white/30 sm:flex-1"
          />
          <button className="hover:bg-[#b5a3fc] border border-[#b5a3fc] bg-[#a28fed] text-gray-200 px-3 py-1 rounded-md hover:text-black w-fit cursor-pointer transition-all ease-linear duration-150 hover:scale-[1.05] text-sm md:text-base">connect</button>
        </div>
      </div>
    </div>
  );
}
