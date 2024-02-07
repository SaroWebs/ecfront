import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { HeartIcon, HomeIcon, PaperclipIcon, TruckIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function MobileNav() {
  const [value, setValue] = useState(100);
  const router = useRouter();
  

  const handleChangeNav=(event, newValue)=>{
    switch (newValue) {
      case 0:
        if (router.pathname !== '/') {
          router.push('/');
        }
        break;
      case 1:
        if (router.pathname !== '/user/orders') {
          router.push('/user/orders');
        }
        break;
      case 2:
        if (router.pathname !== '/user/prescriptions') {
          router.push('/user/prescriptions');
        }
        break;
      case 3:
        if (router.pathname !== '/user/profile') {
          router.push('/user/profile');
        }
        break;
      default:
        break;
    }
  }

  useEffect(()=>{
    if(router.pathname === '/') setValue(0);
    if(router.pathname === '/user/orders') setValue(1);
    if(router.pathname === '/user/prescriptions') setValue(2);
    if(router.pathname === '/user/profile') setValue(3);
  },[router])
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChangeNav}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Orders" icon={<TruckIcon />} />
        <BottomNavigationAction label="Prescriptions" icon={<PaperclipIcon />} />
        <BottomNavigationAction label="Account" icon={<UserIcon />} />
      </BottomNavigation>
    </Box>
  );
}
