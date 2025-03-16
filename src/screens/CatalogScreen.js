import React from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
// import { useFocusEffect } from '@react-navigation/native'
import { connect, useDispatch } from "react-redux";

import {
  setModalProduct,
  showModalProduct,
} from "../redux/actions/catalogActions";

import FooterFilter from "../components/FooterFilter";
import Menu from "../components/Menu";
import ModalFilter from "../components/ModalFilter";
import ModalProduct from "../components/ModalProduct";
import { ProductRow } from "../components/ProductRow";

import styles from "../styles/Styles";
import productStyles from "../styles/ProductStyles";

const CatalogScreen = ({
  route,
  productList,
  filterOrder,
  filterCategories,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  // }, [])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('useFocusEffect in', route.params.code)
  //     return () => {
  //       console.log('useFocusEffect out', route.params.code)
  //     }
  //   }, []),
  // )

  let catalogProductList = productList[route.params.code];

  if (filterCategories.length > 0) {
    catalogProductList = catalogProductList.filter((item) =>
      filterCategories.includes(item["FILTER"])
    );
  }

  if (filterOrder === "") {
    catalogProductList.sort((a, b) => a.ID - b.ID);
  } else if (filterOrder === "price_asc") {
    catalogProductList.sort((a, b) => a["PRICE"] - b["PRICE"]);
  } else if (filterOrder === "price_desc") {
    catalogProductList.sort((a, b) => b["PRICE"] - a["PRICE"]);
  } else if (filterOrder === "rating") {
    catalogProductList.sort((a, b) => b["RATING"] - a["RATING"]);
  }

  const handleProductClick = (product) => {
    dispatch(setModalProduct(product));
    dispatch(showModalProduct());
  };

  return (
    <View style={styles.containerFlex}>
      <FlatList
        data={catalogProductList}
        keyExtractor={(item, index) => `product_${index}`}
        ListHeaderComponent={() => <Menu code={route.params.code} />}
        ListHeaderComponentStyle={{ marginBottom: 32 }}
        contentContainerStyle={{ ...styles.container, paddingBottom: 90 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleProductClick(item)}
            style={productStyles.product_card}
          >
            <ProductRow item={item} type={"catalog"} />
          </TouchableOpacity>
        )}
      />
      <FooterFilter />
      <ModalFilter />
      {Platform.OS === "ios" && <ModalProduct />}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    productList: state.catalog.filteredList,
    filterOrder: state.catalog.filterOrder,
    filterCategories: state.catalog.filterCategories,
  };
};

export default connect(mapStateToProps, null)(CatalogScreen);
