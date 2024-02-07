import { AuthLayout } from '@/layout/AuthLayout';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { AlertTriangleIcon, PlusCircleIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([
    {
      id: 1000,
      code: 'xy123',
      name: 'Test Product',
      details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque ut expedita nisi, praesentium temporibus recusandae voluptate sapiente, dicta, eveniet nulla officia in voluptas illum perferendis? Dicta officia dolores ratione nesciunt?',
      retail_price: 104.50,
      offer_price: 96.25,
      discount: 7.00,
      mfg_name: 'TestCompany',
      category_id: '',
      subcategory_id: '',
      prescription: 1
    }
  ]);
  const [info, setInfo] = useState({
    type: '',
    message: '',
    loading: false
  });


  useEffect(() => {
    let timeoutId;
    if (searchText) setInfo({ ...info, loading: true });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (!searchText || searchText === '') {
        setInfo({
          ...info,
          type: '',
          message: '',
          loading: false
        });
      } else {
        axios.post(`${process.env.API_URL}/search`, { search: searchText }).then(res => {
          setSearchResult(res.data);
          if (res.data.length > 0) {
            setInfo({
              ...info,
              type: 'success',
              message: `${res.data.length} items found !`,
              loading: false
            });
          } else {
            setInfo({
              ...info,
              type: 'error',
              message: `No item found`,
              loading: false
            });
          }
        }).catch(err => {
          setInfo({
            ...info,
            type: 'error',
            message: err.message,
            loading: false
          });
          setSearchResult([]);
        });
      };
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchText]);


  return (
    <AuthLayout page={{ title: 'Search' }}>
      {/* input block */}
      <div className="p-4 pb-0 flex w-full">
        <input
          type="text"
          className="flex-1 py-2 px-4 border-b outline-none focus-visible:outline-none"
          placeholder='Search items here..'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoFocus
        />
        {searchText.length > 0 &&
          <IconButton onClick={() => setSearchText('')}>
            <XIcon className='w-6' />
          </IconButton>
        }
      </div>

      {(info.loading && searchResult.length < 1) ? 'Loading' : (
        <div className="">
          {info.type == 'success' &&
            <div className="text-xs font-bold">
              <span>{info.message}</span>

            </div>
          }
          {info.type == 'error' &&
            <div className="w-full flex flex-col justify-center items-center min-h-[200px] text-xs font-bold">
              <AlertTriangleIcon className='w-6' />
              <span>{info.message}</span>
            </div>
          }

          {searchResult.length > 0 && (
            <div className="flex flex-col gap-2">
              {searchResult.map(item => (
                <div className="item" key={item.id}>
                  <CartListItem item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </AuthLayout >
  )
}

export default Search


const CartListItem = ({item}) => {
  // console.log(item);
  return (
    <div className="p-4 my-2 border border-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <image src="#" alt="" className='w-8 h-8 border rounded-sm'/>
          <div className="">
          <h3 className='text-xs font-bold'>{item.name}</h3>
          <h4 className="text-xs">
            <span className="mr-2 line-through">₹ {item.retail_price}</span> ₹ {item.offer_price}
          </h4>
          </div>
        </div>
        <div className="flex gap-1">
          <IconButton>
            <PlusCircleIcon />
          </IconButton>
        </div>
      </div>
      {item.prescription && (
        <div className="py-1 text-xs text-center bg-red-200 text-red-700">
          <span>Prescription required</span>
        </div>
      )}
    </div>
  );

}