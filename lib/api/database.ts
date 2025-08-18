import { Databases, ID, Query } from "react-native-appwrite";
import { appwriteConfig, client } from "../appwrite";

const databases = new Databases(client);

// untuk fetch data ke profile
export const fetchUserData = async (user_id: string) => {
  // mengambil list documents
  try {
    const getListDocument = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_id", user_id)]
    );

    const listDocument = getListDocument.documents;

    // ambil data dari document nya
    if (listDocument.length > 0) {
      const documentId = listDocument[0].$id;

      try {
        const getDocument = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          documentId
        );

        return getDocument;
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

// untuk search user
export const searchUser = async (user_name: string) => {
  // ambil list document
  try {
    const getListDocument = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.contains("user_name", user_name)]
    );

    return getListDocument.documents;
  } catch (error) {
    console.error(error);
    return;
  }
};


