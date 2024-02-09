import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import Link from 'next/link';

const FeaturedProducts = ({show}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.API_URL}/products?feature=true&per_page=${parseInt(show)}`)
            .then(res => {
                setItems(res.data.data);
                setLoading(false);
            }).catch(err => {
                console.log('error');
                setLoading(false);
            });
    }, [])

    return (
        <div className='p-4 shadow-sm'>
            <div className="title py-2 border-b">
                <div className="flex justify-between items-center my-4">
                    <h3 className="font-semibold">Featured Products</h3>
                    <Link href={'#'} className='underline text-xs font-bold'>
                        View All
                    </Link>
                </div>
                {loading ?
                    'loading...'
                    :
                    items.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {items.map(item => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="min-h-32 flex items-center justify-center">
                            <span>No items found !</span>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default FeaturedProducts