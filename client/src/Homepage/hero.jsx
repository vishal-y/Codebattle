/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import cursoImage from './../assets/images/cursor.svg'
import messageImage from './../assets/images/message.svg'
import { ArrowRight as IconArroRight } from './icons'
import { Link } from 'react-router-dom';

export function Hero({setRoomForm}) {

  const cursoImageAnimateControls = useAnimation()
  const messageImageAnimateControls = useAnimation()

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const recruter = queryParams.get('recruter') === 'true';
    recruter ? sessionStorage.setItem("Recruter" , true) : null
  },[])


  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }

  const startFloating = (controls) => {
    controls.start(floatAnimation)
  }

  useEffect(() => {
    startFloating(cursoImageAnimateControls)
    startFloating(messageImageAnimateControls)
  }, [cursoImageAnimateControls, messageImageAnimateControls])

  async function handleDragEnd(controls) {
    await controls.start({
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    })
    startFloating(controls)
  }

  return (
    <div className="md:h-screen md:min-h-[40rem] gradient-secondary relative overflow-clip bg-gradient-to-b py-[72px] text-white sm:py-24">
      

      <div className="absolute left-1/2 top-[calc(100%-96px)] h-[375px] w-[750px] -translate-x-1/2 rounded-[100%] border border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)] sm:top-[calc(100%-120px)] sm:h-[728px] sm:w-[1536px] lg:h-[700px] lg:w-[2380px]" />
      <div className="container mt-[15vh] md:mt-0 relative">
        <div className="flex mt-20 md:mt-0 items-center justify-center">
          <Link
            to={"/about"}
            className="inline-flex gap-3 rounded-3xl justify-center items-center border border-violet-500 px-5 py-2"
          >
            <span className="text-white/60">codebattle tutorial</span>
            <span className="flex text-sm p-1 pr-2 rounded-lg justify-center text-gray-300 bg-violet-600  items-center gap-1">
              <span className='ml-2'>learn more</span>
              <IconArroRight />
            </span>
          </Link>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex">
            <h1 className="inline-flex text-center text-7xl lg:text-[8rem] font-bold tracking-tighter sm:text-[150px]">
            CodeBattle <br /> Platform
            </h1>
            <motion.div
              className="absolute right-[598px] top-[70px] hidden sm:inline"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={cursoImageAnimateControls}
              onDragStart={() => cursoImageAnimateControls.stop()}
              onDragEnd={() => handleDragEnd(cursoImageAnimateControls)}
            >
              <img
                src={cursoImage}
                alt=""
                height={150}
                width={150}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
            <motion.div
              className="absolute left-[575px] top-[150px] hidden sm:inline"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={messageImageAnimateControls}
              onDragStart={() => messageImageAnimateControls.stop()}
              onDragEnd={() => handleDragEnd(messageImageAnimateControls)}
            >
              <img
                src={messageImage}
                alt=""
                height={150}
                width={150}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 opacity-75 max-w-md text-center text-xl">
          Codebattle is a free site where developers can work on coding and algorithms problems together with others.          </p>
        </div>

        <div className="flex justify-center  items-center gap-3 mt-12 sm:flex-row">
            <Link to={"/problems"} className="hover:bg-[#b5a3fc] border-2 border-[#b5a3fc] bg-[#682ac5] text-gray-200 px-3 py-2 md:hidden rounded-md hover:text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-150 hover:scale-[1.05]">All Problems</Link>
            <Link to={"/problems"} className="hover:bg-[#b5a3fc] border-2 border-[#b5a3fc] bg-[#682ac5] text-gray-200 px-3 py-2 hidden md:block rounded-md hover:text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-150 hover:scale-[1.05]">Practice problems</Link>
            <button onClick={()=>{setRoomForm(true)}} className="hover:bg-[#b5a3fc] border-2 border-[#b5a3fc] bg-[#682ac5] text-gray-200 px-3 py-2 md:hidden rounded-md hover:text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-150 hover:scale-[1.05]">Create Room</button>
            <button onClick={()=>{setRoomForm(true)}} className="hover:bg-[#b5a3fc] border-2 border-[#b5a3fc] bg-[#682ac5] text-gray-200 px-3 py-2 hidden md:block rounded-md hover:text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-150 hover:scale-[1.05]">Create or join room</button>
          </div>

      </div>
    </div>
  )
}
Hero.propTypes = {
  setRoomForm: PropTypes.func,
};