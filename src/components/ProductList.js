import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import {
  setModalProduct,
  showModalProduct,
} from "../redux/actions/catalogActions";

import { ProductRow } from "./ProductRow";
import productStyles from "../styles/ProductStyles";

export default ProductList = ({ list }) => {
  const dispatch = useDispatch();

  const handleProductClick = (product) => {
    dispatch(setModalProduct(product));
    dispatch(showModalProduct());
  };

  return (
    <>
      {list.map((item, index) => (
        <TouchableOpacity
          key={`product_${index}`}
          onPress={() => handleProductClick(item)}
          style={productStyles.product_card}
        >
          <ProductRow item={item} type={"catalog"} />
        </TouchableOpacity>
      ))}
    </>
  );
};
