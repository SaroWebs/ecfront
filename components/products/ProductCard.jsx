import { Button, IconButton } from '@mui/material';
import React from 'react'
import { useCart } from 'react-use-cart';
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';

const ProductCard = ({item}) => {
    const { inCart, addItem, updateItemQuantity, getItem } = useCart();
    return (
        <div className="border border-slate-200 shadow-sm rounded-md p-1 flex flex-col justify-between gap-2 overflow-hidden relative group">
            <div className="w-full h-28 relative overflow-hidden">
                {item.images.length > 0 ?
                    <img src={process.env.RES_URL + '/images/' + item.images[0]} alt="" className='absolute top-0 left-0 w-full h-full object-cover rounded-sm' />
                    :
                    <img src="/core-images/product/noimage.png" alt="" className='absolute top-0 left-0 w-full h-full object-cover rounded-sm' />
                }
            </div>
            <div className="">
                <h3 className='text-xs font-bold'>{item.name}</h3>
                <h4 className="flex items-center">
                    <span className='font-bold text-red-500'>₹{Math.floor(item.offer_price)}</span>
                    <span className="ml-1 text-xs line-through">₹{Math.floor(item.price)}</span>
                </h4>
                <div className="text-xs my-2 text-slate-500">
                    {item.mfg_name}
                </div>
                {item.prescription ? (
                    <div className="text-xs text-red-700">
                        <span>* Prescription</span>
                    </div>
                ) : null}

                <div className="w-full flex justify-between items-center">
                    {inCart(item.id) ? (
                        <>
                            <IconButton onClick={() => updateItemQuantity(item.id, getItem(item.id).quantity - 1)}>
                                <MinusCircleIcon />
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
                        <Button
                            variant="outlined"
                            color="error"
                            disableElevation
                            size="small"
                            onClick={() => addItem(item, 1)}
                            sx={{
                                width: '100%'
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>

            {item.discount ?
                <div className="absolute text-xs top-6 px-8 -right-8 bg-teal-500/75 text-white  transform -translate-y-1/2 rotate-45">
                    {Math.floor(item.discount)}% OFF
                </div>
                : null
            }
        </div>
    );
}

export default ProductCard