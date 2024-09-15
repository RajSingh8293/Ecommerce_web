/* eslint-disable react/prop-types */
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const HeroImages = ({ heroImgages }) => {


    const items = heroImgages?.map((item) => <img key={item} className='w-[500px] bg-fixed' src={item?.url} alt='' />)
    return (
        <>
            <AliceCarousel
                mouseTracking
                disableButtonsControls
                items={items}
                autoPlayInterval="2000"
                infinite
                animationDuration="3000"
                autoPlay={true}
            />
        </>

    )
}

export default HeroImages