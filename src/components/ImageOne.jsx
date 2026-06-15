import { useRef } from 'react';
import dynasty from '../assets/images/lostdynasty.jpeg';
import small1 from '../assets/images/lostdynasty2.jpeg';
import small2 from '../assets/images/lostdynasty2.jpg';

const ImageOne = ({style}) => {
  const image1 = useRef(null);
  const image2 = useRef(null);

  return (
    <div className={style}>
      <div className='h-screen w-250'>
        <img className='h-full w-full object-cover' src={dynasty} />
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 w-110 h-70 right-0 overflow-hidden'>
        {/* <img ref={image1} className='w-full h-full object-cover absolute top-0 left-0 z-10' src={small1} /> */}
        <img ref={image2} className='w-full h-full object-cover absolute top-0 left-0 ' src={small2} />
      </div>
    </div>
  )
}

export default ImageOne