export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IUserInfo {
  id: string;
  createdAt: string;
  isSuspended: boolean;
  name: string;
  uxHandle: null;
  level: string;
  levelShortHandle: string;
  isVerified: boolean;
  location: null;
  about: string;
  tagline: string;
  author: string;
  coverImage: null;
  coverImagePath: string;
  profileImage: null;
  profileImagePath: string;
  categories: string[];
  connectionCount: number;
  jobAvailability: boolean;
  role: string;
  isAllDataAvailable: boolean;
  speciality: string;
  introVideo: null;
  isFavourite: boolean;
  isConnected: boolean;
  locationId: null;
  phone?: string;
  email: string;
  IsEmailVerified: boolean;
  IsPhoneVerified: boolean;
  isTop100: boolean;
}
