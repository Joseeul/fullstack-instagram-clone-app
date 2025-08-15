import * as SecureStore from "expo-secure-store";

// save key dan valuenya
export const saveUserStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error input data fun saveUserStore " + error);
    return null;
  }
};

// delete key dan valuenya
export const deleteUserStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error delete data fun deleteUserStore " + error);
    return null;
  }
};
