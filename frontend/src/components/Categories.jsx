import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import CategoryCard from './CategoryCard';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
};


const categoryData = [
    {
        name: "Men",
        icon: '/src/assets/Category_PNG/man_png.png'
    },
    {
        name: "Women",
        icon: '/src/assets/Category_PNG/woman_png.png'
    },
    {
        name: "Kids",
        icon: '/src/assets/Category_PNG/children_png.png'
    }
]



const Categories = () => {

    const items = categoryData?.map((item, index) =>
        <CategoryCard item={item} key={index} />
    )

    return (
        <AliceCarousel
            mouseTracking
            disableButtonsControls
            responsive={responsive}
            items={items}

        />
    )
}

export default Categories