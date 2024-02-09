import { AlertTriangleIcon } from 'lucide-react';
import React from 'react'
import { useCart } from 'react-use-cart';
import CartListItem from './CartListItem';

export const CartComponent = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal
    } = useCart();

    if (isEmpty) {
        return (
            <div className="w-full flex-col min-h-[80vh] flex justify-center items-center">
                <AlertTriangleIcon className='min-w-16' />
                <span className="text-xs">Your cart is empty !</span>
            </div>
        )
    } else {
        return (
            <div className='pb-[200px]'>
                <div className="p-4 text-xs text-slate-400">
                    <h1>You have <span className='font-bold text-orange-600'>{totalUniqueItems}</span> item{totalUniqueItems > 1 && 's'} in your cart.</h1>
                </div>

                <ul className='text-slate-600'>
                    {items.map((item) => (
                        <div className="item" key={item.id}>
                            <CartListItem item={item} />
                        </div>
                    ))}
                </ul>

                <div className="fixed bottom-[50px] left-0 right-0 border-t p-4 bg-white">
                    <div className="w-full flex justify-between items-end">
                        <div className="text-xs">
                            <h4>Cart amount: ₹ {Math.floor(cartTotal)}</h4>
                            <h4>Total tax (18 %): ₹ {Math.floor(cartTotal * 0.18)}</h4>
                            <hr />
                            <h4 className='font-bold'>Grand total: ₹ {Math.floor(cartTotal) + Math.floor(cartTotal * 0.18)}</h4>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-3 py-1 text-sm bg-yellow-300 text-yellow-800">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
