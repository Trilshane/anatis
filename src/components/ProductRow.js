import React, { useEffect } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

import ProductAmount from "./ProductAmount";
import productStyles from "../styles/ProductStyles";

export const ProductRow = ({ item, type }) => {
  return (
    <View style={productStyles.product_row}>
      <View style={productStyles.product_blockLeft}>
        <Image
          source={{ uri: "https://anatis.tj" + item.PREVIEW_PICTURE }}
          style={productStyles.product_image}
        />
      </View>

      <View style={productStyles.product_blockCenter}>
        <Text style={productStyles.product_name}>
          {item.NAME || item.PRODUCT_NAME}
        </Text>
        <View style={productStyles.product_data}>
          <Text style={productStyles.product_dataText}>{item.VOLUME}</Text>
          <View style={productStyles.product_dataSep} />
          <Text style={productStyles.product_dataText}>{item.TARA}</Text>
          {type == "history" && (
            <>
              <View style={productStyles.product_dataSep} />
              <Text style={productStyles.product_dataText}>
                {item.QUANTITY} шт
              </Text>
            </>
          )}
        </View>
      </View>

      {type == "catalog" && (
        <View>
          <TouchableWithoutFeedback>
            <View style={productStyles.product_blockRight}>
              {/*{item.amount > 0 ? (*/}
              {/*  <Text style={productStyles.product_number}>{item.amount} шт.</Text>*/}
              {/*) : (*/}
              {/*  <Text style={productStyles.product_number}>{item.PRICE} сом</Text>*/}
              {/*)}*/}
              <ProductAmount item={item} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      {type == "history" && (
        <View>
          <View style={productStyles.product_blockRight}>
            <Text style={productStyles.product_number}>{item.COST} сом</Text>
            {/*<Text style={productStyles.product_number}>{item.amount} шт.</Text>*/}
          </View>
        </View>
      )}
    </View>
  );
};
