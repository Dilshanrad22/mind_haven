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
  availableSlots: AvailableSlot[];
  rating: number;
  totalReviews: number;
  bio: string;
  services: string[];
  isVerified: boolean;
  consultationFee?: number;
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

export interface ApiResponse<T = unknown> {
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

// Appointment Types
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
export type SessionType = 'video' | 'chat' | 'in-person';

export interface Appointment {
  _id: string;
  userId: User | string;
  doctorId: DoctorProfile & { userId: User };
  date: string;
  startTime: string;
  endTime?: string;
  sessionType: SessionType;
  status: AppointmentStatus;
  issue?: string;
  message?: string;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Message Types
export interface Message {
  _id: string;
  senderId: { _id: string; name: string; profileImage?: string } | string;
  receiverId: { _id: string; name: string; profileImage?: string } | string;
  appointmentId?: string;
  content: string;
  messageType: 'text' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  userId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    userType: string;
  };
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
}

// Article Types
export type ArticleCategory = 'anxiety' | 'depression' | 'stress' | 'relationships' | 'self-care' | 'mindfulness' | 'general';

export interface Article {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  author: string;
  category: ArticleCategory;
  tags: string[];
  imageUrl?: string;
  isPublished: boolean;
  readTime: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export type NotificationType = 'appointment' | 'message' | 'review' | 'system';

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

// Review Types
export interface Review {
  _id: string;
  userId: { _id: string; name: string; profileImage?: string } | string;
  doctorId: string;
  appointmentId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
