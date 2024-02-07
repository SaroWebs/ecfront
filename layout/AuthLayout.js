import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import VerifyPhone from '@/components/VerifyPhone';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress, CssBaseline, IconButton } from '@mui/material';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'

export const AuthLayout = (props) => {
    const { children, page = null } = props;
    const { ctxLoad, user } = useAuth();
    const router = useRouter();

    if (!user && !ctxLoad) {
        return <VerifyPhone />;
    }

    if (ctxLoad) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center'>
                <CircularProgress color="inherit" size={32} />
            </div>
        );
    }


    return (
        <div className='min-h-screen pb-12'>
            <CssBaseline />
            {router.pathname == '/' ? <Header /> : <BackBar page={page} />}
            {children}
            <MobileNav />
        </div>
    )
}

const BackBar = ({ page }) => {
    const router = useRouter();
    const handleBack = () => {
        
        if (router.pathname !== '/') {
            router.back();
        } else {
            router.push('/');
        }
    }
    return (
        <div className='h-12 px-4 flex gap-6 items-center shadow-md'>
            <IconButton onClick={handleBack}>
                <ArrowLeftCircleIcon className='w-6' />
            </IconButton>
            {page &&
                <h4 className='text-xl'>
                    {page.title}
                </h4>
            }
        </div>
    );
}