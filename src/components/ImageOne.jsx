import { useRef } from 'react';
import dynasty from '../assets/images/lostdynasty.jpeg';
import small1 from '../assets/images/lostdynasty2.jpeg';
import small2 from '../assets/images/lostdynasty2.jpg';
import ImageReveal from './ImageReveal';

const ImageOne = ({style}) => {
  return (
    <div className={style}>
      <div className='h-screen w-250 relative'>
        <ImageReveal 
          src={dynasty} 
          direction="right" 
          className='w-full h-full' 
        />
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 w-110 h-70 right-0 overflow-hidden'>
        <ImageReveal 
          src={small2} 
          direction="left" 
          delay={0.4}
          className='w-full h-full' 
        />
      </div>
    </div>
  )
}

export default ImageOne