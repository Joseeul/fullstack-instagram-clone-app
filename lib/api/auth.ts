import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite";
import { appwriteConfig, client } from "../appwrite";
import { UserInputLogin, UserInputRegister } from "../models/UserModel";
import { deleteUserStore, saveUserStore } from "../store/userStore";

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// function untuk register user + masukin ke collections
export const registerUser = async ({
  user_name,
  email,
  password,
}: UserInputRegister) => {
  // buat avatar bedasarkan inisial username
  const avatar_url = avatars.getInitialsURL(user_name);

  // bikin account untuk auth
  try {
    await account.create(ID.unique(), email, password, user_name);
  } catch (error) {
    console.error(error);
    return;
  }

  // panggil function login
  const loggedUser = await loginUser({ email, password });

  // kalau login gagal, hapus akun usernya supaya email bisa dipake lagi
  if (!loggedUser) {
    try {
      const user = await account.get();
      await account.deleteIdentity(user.$id);
    } catch (error) {
      console.error(error);
      return;
    }
    return;
  }

  // input data ke document user
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        user_id: loggedUser.userId,
        user_name,
        email,
        avatar_url,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }

  return true;
};

// function untuk login user
export const loginUser = async ({ email, password }: UserInputLogin) => {
  let loggedUser;

  try {
    loggedUser = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error(error);
    return;
  }

  // masukkan value user_id kedalam function saveUserStore
  await saveUserStore("user_id", loggedUser.userId);

  // massukan value expire session kedalam function saveUserStore
  await saveUserStore("session_expire_date", loggedUser.expire);

  return loggedUser;
};

// function untuk logout
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
    return;
  }

  // delete semua data dari SecureStore
  await deleteUserStore("user_id");
  await deleteUserStore("session_expire_date");

  return true;
};

// function untuk cek avavility username
export const checkUsername = async (user_name: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_name", user_name)]
    );

    if (result.total != 0) {
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }

  return true;
};
