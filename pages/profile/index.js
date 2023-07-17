import React, { useEffect, useState } from "react";
import { getUser } from "api";
import { ProfileLayout } from "components/Layout/profileLayout";
import { mainLayout } from "components/Layout/mainLayout";
import { editUser } from "api";
// import { DatePicker } from "react-persian-datepicker

import { Input, Button } from "components";

const INPUT_NAMES = {
  name: "name",
  lastName: "lastname",
  nationalCode: "nationalCode",
  email: "nationalCode",
  phoneNumber: "phoneNumber",
  password: "password",
};

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getProfileUser();
  }, []);
  const getProfileUser = async () => {
    const user = await getUser();
    setUser(user.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const user = await editUser(data);
  };
  return (
    <form
      className="  bg-white rounded w-full h-full p-5 mt-5"
      onSubmit={onSubmit}
    >
      <div className=" lg:flex  lg:justify-center md:flex  md:justify-center w-full">
        <div className="w-full px-3 ">
          <div className="py-1">
            <Input label="نام" value={user.name} name={INPUT_NAMES.name} />
          </div>
          <div className="py-1">
            <Input
              label="شماره تلفن همراه"
              value={user?.phoneNumber}
              name={INPUT_NAMES.phoneNumber}
            />
          </div>
          <div className="p-1">
            <Input label="ایمیل" value={user.email} name={INPUT_NAMES.email} />
          </div>
        </div>
        <div className="w-full px-3">
          <div className="p-1">
            <Input
              label="نام خانوادکی"
              value={user.lastname}
              name={INPUT_NAMES.lastName}
            />
          </div>
          <div className="p-1">
            <Input label="تاریخ تولد" />
          </div>
          <div className="p-1">
            <Input
              label="رمز عبور"
              value="3345513"
              type="password"
              name={INPUT_NAMES.password}
            />
          </div>
        </div>
      </div>
      <div className=" text-left p-4">
        <Button type="submit">تایید</Button>
      </div>
    </form>
  );
};

Profile.getLayout = function getLayout(page) {
  return (
    <div className="h-screen">
      <MainLayout>
        <ProfileLayout>{page}</ProfileLayout>
      </MainLayout>
    </div>
  );
};

export default Profile;
