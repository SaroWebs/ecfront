import { AlertTriangleIcon, ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import React from 'react'
import { useCart } from 'react-use-cart';

export const CartComponent = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();
    if (isEmpty) {
        return (
            <div className="w-full flex-col min-h-[80vh] flex justify-center items-center">
                <AlertTriangleIcon className='min-w-16'/>
                <span className="text-xs">Your cart is empty !</span>
            </div>
        )
    } else {
        return (
            <>
                <h1>Cart ({totalUniqueItems})</h1>

                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.quantity} x {item.name} &mdash;
                            <button
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                                -
                            </button>
                            <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button onClick={() => removeItem(item.id)}>&times;</button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}
