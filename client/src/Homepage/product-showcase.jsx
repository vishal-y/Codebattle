import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/use-media-query'

export function ProductShowcase() {
  const appImageRef = useRef(null)
  const { isMobile } = useMediaQuery()

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const { scrollYProgress } = useScroll({
    target: appImageRef,
    offset: ['start end', 'end end'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])

  return (
    <div className="bg-black relative bg-gradient-to-b from-black to-[#5D2CA8] py-[72px] text-white sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          Intuitive and Interactive UI
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-base md:text-xl text-white/70">
          Clean, responsive UI designed for seamless coding battles. With real-time chat, live code sharing, and a built-in editor, users can battle effortlessly aging across all devices.
          </p>
        </div>

{/* <div className='absolute left-6'>
<p className='testhai text-[15vw] relative '>CODEBATTLE</p>
</div> */}

        <motion.div
          style={{
            scale,
            opacity,
            rotateX,
            transformPerspective: '800px',
          }}
          className="mx-auto w-full max-w-5xl"
        >
         <div className='lg:hidden flex justify-center gap-2'>
         <img
            src={"/pre1.png"}
            alt="The product screenshot"
            className="md:hidden mt-10 h-[60%] w-[60%] rotate-6"
            ref={appImageRef}
          />
          <img
            src={"/pre2.png"}
            alt="The product screenshot"
            className="md:hidden mt-10 h-[60%] w-[60%] rotate-6"
            ref={appImageRef}
          />
         </div>
          <img
            src={"/editorPage.png"}
            alt="The product screenshot"
            className="hidden md:block mt-14 border-4 border-purple-400 rounded-2xl shadow-2xl hover:scale-[1.01] ease-in-out transition-all duration-150"
            ref={appImageRef}
          />
        </motion.div>
      </div>
    </div>
  )
}
