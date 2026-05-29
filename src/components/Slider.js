import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";

import {
  setModalSliderText,
  showModalSliderText,
} from "../redux/actions/appActions";
import {
  setModalProduct,
  showModalProduct,
} from "../redux/actions/catalogActions";

import indexStyles, { sliderInterval } from "../styles/IndexStyles";
import { indexSliderDelay } from "../params";

const Slider = ({
  sliderList,
  catalogState,
  setModalProduct,
  setModalSliderText,
  showModalProduct,
  showModalSliderText,
}) => {
  const [sliderDirection, setSliderDirection] = useState("right");
  const [sliderIndex, setSliderIndex] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      const sliderNextIndex = getSliderNextIndex();
      setSliderPosition(sliderNextIndex);
      setSliderIndex(sliderNextIndex);
    }, indexSliderDelay);
    return () => clearTimeout(timer);
  }, [sliderIndex, sliderDirection]);

  const getSliderNextIndex = () => {
    let sliderNextIndex;
    if (sliderIndex === 0) {
      setSliderDirection("right");
      sliderNextIndex = sliderIndex + 1;
    } else if (sliderIndex === sliderList.length - 1) {
      setSliderDirection("left");
      sliderNextIndex = sliderIndex - 1;
    } else {
      if (sliderDirection === "right") {
        sliderNextIndex = sliderIndex + 1;
      } else {
        sliderNextIndex = sliderIndex - 1;
      }
    }
    return sliderNextIndex;
  };

  const setSliderPosition = (nextIndex) => {
    scrollViewRef.current.scrollTo({
      x: sliderInterval * nextIndex,
      y: 0,
      animated: true,
    });
  };

  const handleSliderClick = (sliderItem) => {
    if (sliderItem["TYPE"] === "product") {
      const product = catalogState.list.filter(
        (productItem) => productItem.ID === parseInt(sliderItem.ID),
      )[0];
      setModalProduct(product);
      showModalProduct();
    } else if (sliderItem["TYPE"] === "stock") {
      setModalSliderText(sliderItem);
      showModalSliderText();
    }
  };

  const handleSliderScrollEnd = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.min(
      Math.max(Math.round(offset / sliderInterval), 0),
      sliderList.length - 1,
    );
    setSliderIndex(index);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={indexStyles.sliderImages}
        decelerationRate={"fast"}
        horizontal={true}
        onMomentumScrollEnd={handleSliderScrollEnd}
        pagingEnabled={true}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        snapToInterval={sliderInterval}
      >
        {sliderList.length > 0 ? (
          sliderList.map((item, index) => (
            <TouchableOpacity
              key={"sliderImage_" + index}
              onPress={() => handleSliderClick(item)}
            >
              <Image
                source={{ uri: "https://anatis.tj" + item["PICTURE"] }}
                style={indexStyles.sliderImages_item}
              />
            </TouchableOpacity>
          ))
        ) : (
          <>
            <View style={indexStyles.sliderImages_item} />
            <View style={indexStyles.sliderImages_item} />
          </>
        )}
      </ScrollView>

      <View style={indexStyles.sliderDot}>
        {sliderList.map((item, index) => {
          const isActive = index === sliderIndex;
          return (
            <View
              key={"sliderDot_" + index}
              style={[
                indexStyles.sliderDot_item,
                isActive && indexStyles.sliderDot_itemActive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  setModalProduct,
  setModalSliderText,
  showModalProduct,
  showModalSliderText,
};

const mapStateToProps = (state) => {
  return {
    catalogState: state.catalog,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
