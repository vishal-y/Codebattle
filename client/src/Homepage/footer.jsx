import { Heart } from '@phosphor-icons/react';
import { SocialMediaList } from './social-media';
import { useState } from 'react';

export function Footer() {
  const [color, setColor] = useState(false);

  return (
    <footer className="border-t border-white/20 bg-black py-5 text-white/60">
      <div className="container">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">
            <span className='flex justify-center items-center gap-1'>
              Made with
              <Heart 
                size={20} 
                onClick={() => setColor(!color)} 
                color={!color ? "red" : "#737373"} 
                weight='fill' 
              />
              by 
              <a href="https://vishalweb.vercel.app/" target='_blank' rel='noreferrer' className='text-violet-600 ml-1 underline font-bold'>Vishal Yadav</a>
              {/* <a href="https://vishalweb.vercel.app/" target='_blank' rel='noreferrer' className='text-white ml-1 underline border-violet-500 bg-violet-600 text-sm py-1 px-2 rounded-md'>Vishal Yadav</a> */}
            </span>
          </div>
          <SocialMediaList />
        </div>
      </div>
    </footer>
  );
}
