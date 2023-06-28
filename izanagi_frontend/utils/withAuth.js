import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { useSession } from 'next-auth/client';
import { useAddress } from "@thirdweb-dev/react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const address = useAddress();
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