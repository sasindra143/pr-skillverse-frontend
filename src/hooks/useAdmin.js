import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    user.getIdTokenResult().then(token => {
      setIsAdmin(!!token.claims.admin);
      setLoading(false);
    });
  }, []);

  return { isAdmin, loading };
}
