import ProductCard from '@/components/products/ProductCard';
import { AuthLayout } from '@/layout/AuthLayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const singleCategory = () => {
	const router = useRouter()
	let cid = router.query.cid;
	const [category, setCategory] = useState(null);
	const [pageData, setPageData] = useState(null);
	const [items, setItems] = useState([]);


	useEffect(() => {
		if (cid) {
			axios.get(`${process.env.API_URL}/category/${cid}`)
				.then(res => {
					setCategory(res.data);
				})
				.catch(error => {
					console.log('no category');
				});
		}
	}, [cid]);

	useEffect(() => {
		if (category) {
			axios.get(`${process.env.API_URL}/products?category=${cid}`)
				.then(res => {
					setItems(res.data.data);
					setPageData(res.data);
				})
				.catch(error => {
					console.log('no item');
				});
		}
	}, [category])


	if (!category) {
		return '';
	}

	return (
		<AuthLayout page={{ title: category.name }}>
			<div className="p-4">
				{category.subcategories.length > 0 && (
					<div className="p-4 my-2 border border-gray-300 rounded-md">
						<h3 className="text-gray-400">Sub Categories</h3>
						<div className="grid grid-cols-3">
							{category.subcategories.map(sbc => (
								<div className="text-center" key={sbc.id}>
									<div className="px-4 rounded-full overflow-hidden">
										<img src="/core-images/product/noimage.png" alt="" className='w-full' />
									</div>
									<h3 className='text-[8px]'>{sbc.name}</h3>
								</div>
							))}
						</div>
					</div>
				)}
				{!pageData ? 'loading' : pageData.data.length > 0 ? (
					<div className="grid grid-cols-2 gap-2 my-2">
						{pageData.data.map(item => (
							<ProductCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<div className="min-h-32 flex items-center justify-center">
						<span>No items found !</span>
					</div>
				)}
			</div>
		</AuthLayout>
	)
}

export default singleCategory