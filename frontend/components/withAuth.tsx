import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader } from './ui/Loader';
import HomeLayout from '@/app/home';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      if (!token || !id) {
        router.push('/auth/signin');
      } else {
        setIsLoading(false);
      }
    }, [router]);


    if (isLoading) {
      return  <div className='h-screen'><HomeLayout><Loader /></HomeLayout></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
