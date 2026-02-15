// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  userType: 'user' | 'doctor';
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt?: Date;
  doctorProfile?: DoctorProfile;
}

// Doctor Profile Types
export interface DoctorProfile {
  _id: string;
  userId?: string | User;
  specialization: string;
  licenseNumber: string;
  qualification: string[];
  experience: number;
  consultationFee: number;
  availableSlots: AvailableSlot[];
  rating: number;
  totalReviews: number;
  bio: string;
  services: string[];
  isVerified: boolean;
  verificationDocuments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AvailableSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  userType: 'user' | 'doctor';
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface DoctorsListResponse {
  success: boolean;
  data: {
    doctors: DoctorProfile[];
    pagination: PaginationInfo;
  };
}
