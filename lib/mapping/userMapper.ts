import { FollowingList, User, UserSearch } from "../models/UserModel";

export const userMapper = (doc: any): User => ({
  user_id: doc.user_id,
  user_name: doc.user_name,
  email: doc.email,
  avatar_url: doc.avatar_url,
  total_post: doc.total_post,
  total_followers: doc.total_followers,
  total_following: doc.total_following,
  bio: doc.bio,
});

export const searchMapper = (doc: any): UserSearch => ({
  user_id: doc.user_id,
  user_name: doc.user_name,
  avatar_url: doc.avatar_url,
});

export const followingMapper = (doc: any): FollowingList => ({
  user_id: doc.user_id,
  user_name: doc.user_name,
  avatar_url: doc.avatar_url,
});
