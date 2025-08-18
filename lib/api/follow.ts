import { Databases, Query } from "react-native-appwrite";
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
