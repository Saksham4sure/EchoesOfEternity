import temple1 from '../assets/images/temple1.jpeg';
import temple2 from '../assets/images/temple2.jpeg';
import temple3 from '../assets/images/temple3.jpeg';
import temple4 from '../assets/images/temple4.jpeg';

const ImageTwo = ({style}) => {
  return (
    <div className={style}>
        <div className='w-180 h-[80vh] md:h-[70vh] relative'>
            <img className='h-full w-full object-cover' src={temple1} alt="" />
            <img className='h-full w-full object-cover absolute top-0 left-0' src={temple2} alt="" />
        </div>
        <div className='w-80 h-[50vh] md:h-[60vh] absolute bottom-0 right-0'>
            {/* <img className='h-full w-full object-cover' src={temple3} alt="" /> */}
            <img className='h-full w-full object-cover absolute top-0 left-0' src={temple4} alt="" />
        </div>
    </div>
  )
}

export default ImageTwo