import CartListItem from '@/components/CartListItem';
import { AuthLayout } from '@/layout/AuthLayout';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { AlertTriangleIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  
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
          setSearchResult(res.data.data);
          if (res.data.data.length > 0) {
            setInfo({
              ...info,
              type: 'success',
              message: `Showing results of term "${searchText}" !`,
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
        <div className="p-4">
          {info.type == 'success' &&
            <div className="text-xs">
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
