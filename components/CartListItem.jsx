import { IconButton } from '@mui/material';
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useCart } from 'react-use-cart';

const CartListItem = ({ item }) => {
    const { inCart, addItem, updateItemQuantity, getItem } = useCart();
    useEffect(() => {
        if (!item.price) {
            item.price = item.offer_price;
        }
    }, [item])

    return (
        <div className="p-4 my-1 border border-slate-100">
            <div className="flex justify-between items-center">
                <Link href={`/products/${item.id}`} className="flex gap-1">
                    {item.images.length > 0 ?
                        <img src={process.env.RES_URL+'/images/'+item.images[0]} alt="" className='w-8 h-8 border rounded-sm' />
                        :
                        <img src="/core-images/product/noimage.png" alt="" className='w-8 h-8 border rounded-sm' />
                    }
                    <div className="">
                        <h3 className='text-xs font-bold'>{item.name}</h3>
                        <h4 className="text-xs flex items-center">
                            <span className="mr-2 line-through">₹ {item.price}</span>
                            ₹ {item.offer_price} {item.quantity && (
                                <>
                                    <XIcon className='w-3' /> {item.quantity} = {Math.floor(item.offer_price * item.quantity)}
                                </>)}
                        </h4>
                        {item.prescription ? (
                            <div className="text-xs text-red-700">
                                <span>* Prescription required</span>
                            </div>
                        ) : null}
                    </div>
                </Link>
                <div className="flex gap-1 items-center">
                    {inCart(item.id) ? (
                        <>
                            <IconButton onClick={() => updateItemQuantity(item.id, getItem(item.id).quantity - 1)}>
                                {getItem(item.id).quantity < 2 ?
                                    <XCircleIcon />
                                    :
                                    <MinusCircleIcon />
                                }
                            </IconButton>
                            {getItem(item.id).quantity}
                            {getItem(item.id).quantity < item.total_qty ?
                                <IconButton onClick={() => updateItemQuantity(item.id, getItem(item.id).quantity + 1)}>
                                    <PlusCircleIcon />
                                </IconButton>
                                :
                                <IconButton disabled>
                                    <PlusCircleIcon />
                                </IconButton>
                            }
                        </>
                    ) : (
                        <IconButton onClick={() => addItem(item, 1)}>
                            <PlusCircleIcon />
                        </IconButton>
                    )}
                </div>
            </div>

        </div>
    );

}

export default CartListItem