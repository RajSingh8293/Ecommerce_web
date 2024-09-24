/* eslint-disable react/prop-types */
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from './ProductCard';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    768: { items: 3 },
    1024: { items: 5 },
};


const ProductCarousal = ({ products }) => {
    const items = products?.map((item) => <ProductCard item={item} key={item} />)

    return (
        <>
            <AliceCarousel
                mouseTracking
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
                infinite
                animationDuration="2000"
            />
        </>
    )
}


export default ProductCarousal 