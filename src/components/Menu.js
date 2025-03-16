import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { showModalLogin } from "../redux/actions/appActions";
import { resetFilter } from "../redux/actions/catalogActions";

import menuStyles from "../styles/MenuStyles";
import { menuList } from "../params";

const Menu = ({ code }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.app.isAuth);

  const handleMenuClick = (currentCode) => {
    if (currentCode === route.params?.code) return false;

    dispatch(resetFilter());

    if (currentCode === "login" && !isAuth) {
      dispatch(showModalLogin());
      return false;
    }

    // У нас строго два уровня в стек навигаторе
    // В Options.js примерно то же самое
    if (route.name === "Index") {
      if (currentCode === "history") {
        // noinspection JSUnresolvedFunction
        navigation.push("History", { code: currentCode });
      } else {
        // noinspection JSUnresolvedFunction
        navigation.push("Catalog", { code: currentCode });
      }
    } else {
      if (currentCode === "history") {
        // noinspection JSUnresolvedFunction
        navigation.replace("History", { code: currentCode });
      } else {
        // noinspection JSUnresolvedFunction
        navigation.replace("Catalog", { code: currentCode });
      }
    }
  };

  const MenuIcon = ({ item }) => {
    let icon = item.icon;
    let style = [menuStyles.menu_icon];
    if (item.code === code) {
      icon = item.iconActive;
      style.push(menuStyles.menu_iconActive);
    }
    if (item.code === "login") {
      icon = item.iconActive;
      style.push(menuStyles.menu_iconLogin);
    }
    return <View style={style}>{icon}</View>;
  };

  return (
    <View style={menuStyles.menu_list}>
      {menuList.map((item, index) => {
        if (item.code === "history" && isAuth === false) return false;
        if (item.code === "login" && isAuth === true) return false;

        return (
          <TouchableOpacity
            activeOpacity={0.5}
            key={"menu_" + index}
            onPress={() => handleMenuClick(item.code)}
            style={menuStyles.menu_item}
          >
            <MenuIcon item={item} />
            <Text style={menuStyles.menu_name}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;
