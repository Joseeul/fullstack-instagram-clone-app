// interface untuk input register user
export interface UserInputRegister {
  user_name: string;
  email: string;
  password: string;
}

// interface untuk input login user
export interface UserInputLogin {
  email: string;
  password: string;
}

// interface untuk fetch user data
export interface User {
  user_id: string;
  user_name: string;
  email: string;
  avatar_url: string;
  total_post: number;
  total_followers: number;
  total_following: number;
  bio: string;
}

// interface untuk hasil search user
export interface UserSearch {
  user_id: string;
  user_name: string;
  avatar_url: string;
}

// interface untuk system follow
export interface FollowUser {
  userA_id: string;
  userB_id: string;
}

// interface untuk following list
export interface UserFollowingList {
  user_id: string;
  user_name: string;
  avatar_url: string;
}

// interface untuk follower list
export interface UserFollowerList {
  user_id: string;
  user_name: string;
  avatar_url: string;
}