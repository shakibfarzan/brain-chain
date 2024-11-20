import React from "react";

import { auth, signIn, signOut } from "@/auth";

const LoginPage = async () => {
  const session = await auth();

  return (
    <form
      action={async () => {
        "use server";
        if (!session?.user) await signIn("github");
        else await signOut();
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
};

export default LoginPage;
