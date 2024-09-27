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
        icon: 'https://images.meesho.com/images/products/204307799/pd2lf_400.webp'

    },
    {
        name: "Women",
        icon: 'https://images.meesho.com/images/products/288007593/kk21w_400.webp'
    },
    {
        name: "Kids",
        icon: 'https://images.meesho.com/images/products/431104480/expm3_400.webp'
    }
]



const Categories = () => {

    const items = categoryData?.map((item, index) =>
        <div key={index} className='flex gap-3 justify-center'>
            <CategoryCard item={item} />
        </div>
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