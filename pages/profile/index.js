import React, { useEffect } from "react";
import Layout from "components/layout";
import { getUser } from "api";

const Profile = () => {
  useEffect(() => {
    getProfileUser();
  });
  const getProfileUser = async () => {
    await getUser();
  };
  return <div>index</div>;
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
