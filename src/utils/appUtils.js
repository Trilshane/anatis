import AsyncStorage from "@react-native-async-storage/async-storage";

export const logOut = async () => {
  try {
    const RCTNetworking =
      require("react-native/Libraries/Network/RCTNetworking").default;
    // noinspection JSUnresolvedFunction
    RCTNetworking.clearCookies(() => {});
  } catch (error) {
    console.error("Failed to clear cookies");
  }

  try {
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("phone");
  } catch (error) {
    console.error("Failed to remove storage data");
  }
};

export const getStorageKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {}
  console.log("AsyncStorage keys", keys);
};

export const getStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key, () => {});
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Failed to get storage data", error);
  }
};

export const setStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Failed to set storage data", error);
  }
};
