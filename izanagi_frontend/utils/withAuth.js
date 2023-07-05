import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
// import { useSession } from 'next-auth/client';
// import { useAddress } from "@thirdweb-dev/react";
import { AddressContext } from '../context/AddressContext';

const withAuth = (WrappedComponent) => {
  return (props) => {

    // const address = useAddress();
    const address = useContext(AddressContext);
    const router = useRouter();

    useEffect(() => {
      if (!address) {
        router.push('/unauthenticated'); // Redirect to home page if not authenticated
      }
    }, [address, router]);

    if (address) {
      // Render the protected page if authenticated
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;