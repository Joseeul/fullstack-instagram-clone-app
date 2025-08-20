import { Databases, ID, Query } from "react-native-appwrite";
import { appwriteConfig, client } from "../appwrite";
import { FollowUser } from "../models/UserModel";

const databases = new Databases(client);

/* 
NOTE:
Akun yang sedang login (atau yang lagi kita pakai) itu adalah User A.
Akun yang ingin difollow itu adalah User B.

NOTE UNTUK DI DB:
follower_id adalah User A
following_id adalah User B

MAKA:
Jika ingin terjadi sistem follow maka User A akan memfollow User B
*/

// function untuk cek apakah User A sudah memfollow User B
export const checkIsFollow = async ({ userA_id, userB_id }: FollowUser) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [
        Query.equal("follower_id", userA_id),
        Query.equal("following_id", userB_id),
      ]
    );

    if (result.total == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

// function untuk follow user (MASTER FUNCTION)
export const followUser = async ({ userA_id, userB_id }: FollowUser) => {
  const isFollow = await checkIsFollow({ userA_id, userB_id });

  if (!isFollow) {
    const inputCollection = await inputFollowCollection(userA_id, userB_id);
    if (!inputCollection) return false;

    const updateUserA = await updateFollowUserA(userA_id);
    if (!updateUserA) return false;

    const updateUserB = await updateFollowUserB(userB_id);
    if (!updateUserB) return false;
  } else {
    const deleteCollection = await deleteFollowCollection(userA_id, userB_id);
    if (!deleteCollection) return false;

    const updateUserA = await updateFollowUserA(userA_id);
    if (!updateUserA) return false;

    const updateUserB = await updateFollowUserB(userB_id);
    if (!updateUserB) return false;
  }
  return true;
};

const inputFollowCollection = async (userA_id: string, userB_id: string) => {
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      ID.unique(),
      {
        follower_id: userA_id,
        following_id: userB_id,
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

const deleteFollowCollection = async (userA_id: string, userB_id: string) => {
  let documentId;
  let result;
  try {
    result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [
        Query.equal("follower_id", userA_id),
        Query.equal("following_id", userB_id),
      ]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  documentId = result.documents[0].$id;

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      documentId
    );
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

const updateFollowUserA = async (userA_id: string) => {
  let totalFollowing;

  try {
    totalFollowing = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [Query.equal("follower_id", userA_id)]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_id", userA_id)]
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
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

const updateFollowUserB = async (userB_id: string) => {
  let totalFollower;

  try {
    totalFollower = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [Query.equal("following_id", userB_id)]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("user_id", userB_id)]
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
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

// function untuk menampilkan following list
export const showFollowingList = async (userA_id: string) => {
  const followingList = await getFollowingList(userA_id);
  if (!followingList) return false;

  const documentId = followingList.documents.map((doc) => doc.$id);

  const followingDocuments = await Promise.all(
    documentId.map(async (id) => {
      return await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.followCollectionId,
        id
      );
    })
  );

  const followingId = followingDocuments.map((doc) => doc.following_id);


  const userList = await Promise.all(
    followingId.map(async (id) => {
      return await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("user_id", id)]
      );
    })
  );

  const userDocumentId = userList.flatMap((result) =>
    result.documents.map((doc) => doc.$id)
  );

  const user = await Promise.all(
    userDocumentId.map(async (id) => {
      return await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        id
      );
    })
  );

  return user;
};

const getFollowingList = async (userA_id: string) => {
  try {
    const followingList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [Query.equal("follower_id", userA_id)]
    );
    return followingList;
  } catch (error) {
    console.error(error);
    return;
  }
};
