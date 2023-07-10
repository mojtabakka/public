import React, { useEffect, useState } from "react";
import { FilterTemplate } from "./filter.template";
import { getCat } from "api";
import "./index.module.scss";
import { isEmptyArray } from "../../utils/function.util";
import { useRouter } from "next/router";

const Filter = (props) => {
  const [menueItems, setMenueItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
    init();
    console.log(router.query.id);
  }, [router.query.id]);
  const init = async () => {
    const data = {
      id: router.query.id,
    };

    const result = await getCat(data);
    const propertyTitles = result.data?.propertyTitles;
    const menueItems =
      !isEmptyArray(propertyTitles) &&
      propertyTitles.map((item) => {
        const data = {
          id: item.id,
          name: item.title,
          label: item.title,
        };
        if (!isEmptyArray(item.properties)) {
          data.items = item.properties.map((el) => {
            return { name: el.property, label: el.property, id: el.id };
          });
        }
        return data;
      });
    setMenueItems(menueItems);
  };
  const [SidebarStatus, SetSidebarStatus] = useState(true);
  const [sidebarStatusToDown, SetSidebarStatusToDown] = useState(false);
  const handleOpneSidebar = () => {
    SetSidebarStatus(!SidebarStatus);
  };
  const handleOpneSidebarToDown = () =>
    SetSidebarStatusToDown(!sidebarStatusToDown);
  const handleOpneSidebarFromChild = () => {
    if (SidebarStatus === false) {
      SetSidebarStatus(true);
    }
  };
  return (
    <FilterTemplate
      {...props}
      SidebarStatus={SidebarStatus}
      sidebarStatusToDown={sidebarStatusToDown}
      menueItems={menueItems}
      OnOpneSidebar={handleOpneSidebar}
      onOpneSidebarToDown={handleOpneSidebarToDown}
      onOpneSidebarFromChild={handleOpneSidebarFromChild}
    />
  );
};
export { Filter };
