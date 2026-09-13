import temple1 from '../assets/images/temple1.jpeg';
import temple2 from '../assets/images/temple2.jpeg';
import temple3 from '../assets/images/temple3.jpeg';
import temple4 from '../assets/images/temple4.jpeg';
import ImageReveal from './ImageReveal';

const ImageTwo = ({style}) => {
  return (
    <div className={style}>
        <div className='w-180 h-[80vh] md:h-[70vh] relative'>
            <ImageReveal src={temple2} direction="bottom" delay={0.2} className="w-full h-full absolute top-0 left-0 z-10" />
            <img className='h-full w-full object-cover' src={temple1} alt="" />
        </div>
        <div className='w-80 h-[50vh] md:h-[60vh] absolute bottom-0 right-0 z-20'>
            <ImageReveal src={temple4} direction="left" delay={0.6} className="w-full h-full absolute top-0 left-0" />
        </div>
    </div>
  )
}

export default ImageTwo