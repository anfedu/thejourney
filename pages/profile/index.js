import React from "react";
import Profile from "../../components/profile";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { AuthContext } from "../../src/Provider";

export default function index() {
  const context = React.useContext(AuthContext);
  const { user } = context;
  const router = useRouter();
  React.useEffect(() => {
    if (user.role !== "User") {
      router.push("/");
    }
  }, [user]);
  return (
    <Layout>
      <Profile />
    </Layout>
  );
}
