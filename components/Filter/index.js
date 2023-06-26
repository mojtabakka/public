import React, { useEffect, useState } from "react";
import { SidebarTemplate } from "./Sidebar.template";
import { getCat } from "api";
import "./index.module.scss";
import { isEmptyArray } from "../../utils/function.util";

const Sidebar = (props) => {
  const [menueItems, setMenueItems] = useState([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await getCat();
    const propertyTitles = result.data.propertyTitles;
    const menueItems = propertyTitles.map((item) => { 
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
    <SidebarTemplate
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
export { Sidebar };
