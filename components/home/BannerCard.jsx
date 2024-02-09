import Link from 'next/link';
import React from 'react'

const BannerCard = (props) => {
    const { item } = props;

    return (
        <div className='p-4'>
            <div className="rounded-md overflow-hidden relative">
                {item.image ?
                    <img src={item.image} alt="" className="w-full" />
                    : (
                        <div className="w-full h-[120px]"></div>
                    )}
                <div className="absolute top-0 left-0 right-0 bottom-0">
                    <div className={`h-full text-white w-full px-4 flex flex-col justify-center ${item.className}`}>
                        <h3 className="text-2xl font-bold">{item.header}</h3>
                        <p className="text-xs">{item.description}</p>
                        {item.link.active ? (
                            <div className="text-xs my-4">

                                <Link
                                    href={item.link.url}
                                    className='rounded-md bg-yellow-800 py-1 px-2'
                                >
                                    {item.link.buttonText}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerCard