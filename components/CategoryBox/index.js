import React, { useEffect, useState } from "react";
import { CategoryBoxTemplate } from "./CategoryBox.template";
import { isEmptyArray } from "../../utils/function.util";
import { useRouter } from "next/router";

const CategoryBox = ({ categories, ...props }) => {
  const [menueItems, setMenueItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [properties, setProperties] = useState([]);
  const [catId, setCatId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    setBrands(categories[0].brands);
    setTypes(categories[0].productTypes);
    setProperties(categories[0].propertyTitles.properties);
    createProperties(categories[1].propertyTitles);
    setCats(categories);
    const propertyTitles = categories.propertyTitles;
    const menueItems = !isEmptyArray(propertyTitles)
      ? propertyTitles.map((item) => {
          const data = {
            id: item.id,
            name: item.title,
            label: item.title,
            path: {},
          };
          if (!isEmptyArray(item.properties)) {
            data.items = item.properties.map((el) => {
              return { name: el.property, label: el.property, id: el.id };
            });
          }
          return data;
        })
      : [];
    setMenueItems(menueItems);
  };

  const createProperties = (propertyTitle) => {
    const properties = [];
    !isEmptyArray(propertyTitle) &&
      propertyTitle.map((item) => {
        !isEmptyArray(item.properties) &&
          item.properties.map((data) => {
            properties.push(data);
          });
      });

    setProperties(properties);
  };

  const handleMouseOverCat = (id) => {
    setCatId(id);
    const filterCat = cats.filter((item) => {
      return item.id == id;
    });

    setBrands(filterCat[0].brands);
    setTypes(filterCat[0].productTypes);
    createProperties(filterCat[0].propertyTitles);
  };
  return (
    <CategoryBoxTemplate
      {...props}
      brands={brands}
      catId={catId}
      cats={cats}
      menueItems={menueItems}
      properties={properties}
      types={types}
      onMouseOverCat={handleMouseOverCat}
    />
  );
};
export { CategoryBox };
