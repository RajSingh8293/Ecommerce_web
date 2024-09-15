import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import CategoryCard from './CategoryCard';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
};


const categoryData = ["Men", "Women", "Kids"]



const Categories = () => {

    const items = categoryData?.map((item) => <CategoryCard item={item} key={item._id} />)

    return (
        <AliceCarousel
            mouseTracking
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
        />
    )
}

export default Categories