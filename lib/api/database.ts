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

// untuk follow user
export const followUser = async (follower_id: string, following_id: string) => {
  // masukan data ke follow collection
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      ID.unique(),
      {
        follower_id,
        following_id,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }

  // ambil length dari yang follow
  let totalFollowing;
  try {
    totalFollowing = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [Query.equal("follower_id", follower_id)]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  // update following user A (yang follow)
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_id", follower_id)]
    );

    const documentId = result.documents[0].$id;

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId,
      {
        total_following: totalFollowing.total,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }

  // ambil length dari yang difollow
  let totalFollower;
  try {
    totalFollower = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [Query.equal("following_id", following_id)]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  // update follower user B (yang difollow)
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_id", following_id)]
    );

    const documentId = result.documents[0].$id;

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId,
      {
        total_followers: totalFollower.total,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }

  return true;
};
