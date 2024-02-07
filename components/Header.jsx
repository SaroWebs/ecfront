import { Badge, IconButton } from '@mui/material';
import { HeartIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

const Header = (props) => {
    const { isEmpty, totalUniqueItems } = useCart();
    return (
        <div className='flex justify-between items-center p-4 py-2 shadow-md'>
            <img className='h-12' src="/core-images/logo.png" alt="Logo" />
            <div className="flex gap-2">
                <Link href="/search">
                    <IconButton>
                        <SearchIcon className='h-6' />
                    </IconButton>
                </Link>
                <Link href="/user/wishlist">
                    <IconButton>
                        <HeartIcon className='h-6' />
                    </IconButton>
                </Link>
                <Link href="/user/cart">
                    <IconButton>
                        {isEmpty ? (
                        <Badge badgeContent={0} showZero color="secondary">
                            <ShoppingCartIcon className='h-6' />
                        </Badge>
                        ) :(
                        <Badge badgeContent={totalUniqueItems} color="primary">
                            <ShoppingCartIcon className='h-6' />
                        </Badge>
                        )}
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}

export default Header