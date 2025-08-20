import { Databases, ID, Storage } from "react-native-appwrite";
import { appwriteConfig, client } from "../appwrite";
import { PostInput } from "../models/PostModel";

const storage = new Storage(client);
const databases = new Databases(client);

export const uploadImage = async ({
  author_id,
  description,
  name,
  type,
  size,
  uri,
}: PostInput) => {
  let result;
  try {
    result = await storage.createFile(
      appwriteConfig.postBucketId,
      ID.unique(),
      {
        name,
        type,
        size,
        uri,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }
  const imageId = result.$id;

  const viewUrl = storage.getFileViewURL(appwriteConfig.postBucketId, imageId);

  inputPost(author_id, description, viewUrl, imageId);
};

const inputPost = async (
  author_id: string,
  description: string,
  image_url: URL,
  image_id: string
) => {
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        author_id,
        description,
        image_url,
        image_id,
      }
    );
  } catch (error) {
    console.error(error);
    return;
  }
};
