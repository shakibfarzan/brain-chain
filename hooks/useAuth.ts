import { getSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

import { safePromise } from "@/utils";

type UseAuth = {
  signIn: typeof signIn;
  signOut: typeof signOut;
  session: Session | null;
};

const useAuth = (): UseAuth => {
  const [session, setSession] = useState<Session | null>(null);

  const singInFunc: typeof signIn = async (
    provider,
    options,
    authorizationParams,
  ) => {
    const [res] = await safePromise(
      signIn(provider, options, authorizationParams),
    );

    return res;
  };

  const signOutFunc: typeof signOut = async (options) => {
    const [res] = await safePromise(signOut(options));

    return res!;
  };

  useEffect(() => {
    (async () => {
      const res = await getSession();

      setSession(res);
    })();
  }, []);

  return { signIn: singInFunc, signOut: signOutFunc, session };
};

export default useAuth;
