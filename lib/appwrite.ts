import { Client } from "react-native-appwrite";

interface AppwriteConfig {
  projectId: string;
  endpoint: string;
  databaseId: string;
  userCollectionId: string;
  followCollectionId: string
}

export const appwriteConfig: AppwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  followCollectionId: process.env.EXPO_PUBLIC_APPWRITE_FOLLOW_COLLECTION_ID!,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
