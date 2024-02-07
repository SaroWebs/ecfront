import VerifyPhone from '@/components/VerifyPhone';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react'

const signin = () => {
    const { ctxLoad, user } = useAuth();
    const router = useRouter();
    if (ctxLoad) {
        return 'Loading...';
    } else if (!user) {
        return <VerifyPhone />;
    } else {
        router.push('/');
    }
}

export default signin