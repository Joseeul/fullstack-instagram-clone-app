import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import { UserInputLogin, UserInputRegister } from "./models/UserModel";
import { deleteUserStore, saveUserStore } from "./store/userStore";

interface AppwriteConfig {
  projectId: string;
  endpoint: string;
  databaseId: string;
  userCollectionId: string;
}

const appwriteConfig: AppwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
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
    const accountResponse = await account.create(
      ID.unique(),
      email,
      password,
      user_name
    );
  } catch (error) {
    console.error(error);
    return;
  }

  // panggil function login
  const loggedUser = await loginUser({ email, password });

  if (!loggedUser) {
    try {
      const user = await account.get();
      await account.deleteIdentity(user.$id);
    } catch (error) {
      console.error("error when deleting account at login ", error);
    }
    console.error("Error when login");
    return;
  }

  // input data ke document user
  try {
    const databaseResponse = await databases.createDocument(
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
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// function untuk login user
export const loginUser = async ({ email, password }: UserInputLogin) => {
  try {
    const loggedUser = await account.createEmailPasswordSession(
      email,
      password
    );

    // masukkan value user_id kedalam function saveUserStore
    await saveUserStore("user_id", loggedUser.userId);

    // massukan value expire session kedalam function saveUserStore
    await saveUserStore("session_expire_date", loggedUser.expire);

    return loggedUser;
  } catch (error) {
    console.error(error);
    return;
  }
};

// function untuk logout
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    await deleteUserStore("user_id");
    await deleteUserStore("session_expire_date");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
