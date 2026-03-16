// API Base URL - pointing to separate backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
  DoctorProfile,
  DoctorsListResponse,
  ApiResponse,
  Appointment,
  Message,
  Conversation,
  Article,
  Notification,
  Review,
} from '@/types';

class ApiService {
  private static getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  public static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  public static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // ==================== AUTH ====================

  public static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });

    const data = (await response.json()) as AuthResponse;

    if (data.success && data.data?.token) {
      this.setToken(data.data.token);
    }

    return data;
  }

  public static async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    const data = (await response.json()) as AuthResponse;

    if (data.success && data.data?.token) {
      this.setToken(data.data.token);
    }

    return data;
  }

  public static async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<User>;
  }

  public static async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/update-profile`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(profileData),
    });

    return (await response.json()) as ApiResponse<User>;
  }

  public static async forgotPassword(email: string): Promise<ApiResponse<{ resetToken: string }>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });

    return (await response.json()) as ApiResponse<{ resetToken: string }>;
  }

  public static async resetPassword(token: string, password: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ password }),
    });

    return (await response.json()) as ApiResponse;
  }

  public static logout(): void {
    this.removeToken();
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ==================== DOCTORS ====================

  public static async updateDoctorProfile(
    profileData: Partial<DoctorProfile>,
  ): Promise<ApiResponse<DoctorProfile>> {
    const response = await fetch(`${API_BASE_URL}/api/doctors/profile`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(profileData),
    });

    return (await response.json()) as ApiResponse<DoctorProfile>;
  }

  public static async getDoctorProfile(): Promise<ApiResponse<DoctorProfile>> {
    const response = await fetch(`${API_BASE_URL}/api/doctors/profile`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<DoctorProfile>;
  }

  public static async getDoctors(params?: {
    specialization?: string;
    minRating?: number;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<DoctorsListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.isVerified !== undefined) queryParams.append('isVerified', params.isVerified.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/api/doctors?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return (await response.json()) as DoctorsListResponse;
  }

  // ==================== APPOINTMENTS ====================

  public static async createAppointment(data: {
    doctorId: string;
    date: string;
    startTime: string;
    endTime?: string;
    sessionType?: string;
    issue?: string;
    message?: string;
  }): Promise<ApiResponse<Appointment>> {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    return (await response.json()) as ApiResponse<Appointment>;
  }

  public static async getAppointments(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Appointment[]> & { pagination?: { total: number; page: number; pages: number } }> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/api/appointments?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<Appointment[]> & { pagination?: { total: number; page: number; pages: number } };
  }

  public static async updateAppointmentStatus(id: string, status: string, data?: { cancelReason?: string; notes?: string }): Promise<ApiResponse<Appointment>> {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify({ status, ...data }),
    });

    return (await response.json()) as ApiResponse<Appointment>;
  }

  public static async cancelAppointment(id: string, cancelReason?: string): Promise<ApiResponse<Appointment>> {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
      body: JSON.stringify({ cancelReason }),
    });

    return (await response.json()) as ApiResponse<Appointment>;
  }

  // ==================== MESSAGES ====================

  public static async getConversations(): Promise<ApiResponse<Conversation[]>> {
    const response = await fetch(`${API_BASE_URL}/api/messages/conversations`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<Conversation[]>;
  }

  public static async getMessages(userId: string): Promise<ApiResponse<Message[]>> {
    const response = await fetch(`${API_BASE_URL}/api/messages/conversation/${userId}`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<Message[]>;
  }

  public static async sendMessage(data: { receiverId: string; content: string; appointmentId?: string }): Promise<ApiResponse<Message>> {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    return (await response.json()) as ApiResponse<Message>;
  }

  public static async markMessagesRead(userId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/messages/read/${userId}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse;
  }

  // ==================== ARTICLES ====================

  public static async getArticles(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Article[]> & { pagination?: { total: number; page: number; pages: number } }> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/api/articles?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return (await response.json()) as ApiResponse<Article[]> & { pagination?: { total: number; page: number; pages: number } };
  }

  public static async getArticle(id: string): Promise<ApiResponse<Article>> {
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return (await response.json()) as ApiResponse<Article>;
  }

  // ==================== NOTIFICATIONS ====================

  public static async getNotifications(params?: { page?: number; limit?: number }): Promise<ApiResponse<Notification[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/api/notifications?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<Notification[]>;
  }

  public static async getUnreadNotificationCount(): Promise<ApiResponse<{ count: number }>> {
    const response = await fetch(`${API_BASE_URL}/api/notifications/unread-count`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<{ count: number }>;
  }

  public static async markNotificationRead(id: string): Promise<ApiResponse<Notification>> {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
      method: 'PUT',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<Notification>;
  }

  public static async markAllNotificationsRead(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/notifications/read-all`, {
      method: 'PUT',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse;
  }

  // ==================== REVIEWS ====================

  public static async createReview(data: {
    doctorId: string;
    appointmentId?: string;
    rating: number;
    comment?: string;
  }): Promise<ApiResponse<Review>> {
    const response = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    return (await response.json()) as ApiResponse<Review>;
  }

  public static async getDoctorReviews(doctorId: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<Review[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/api/reviews/doctor/${doctorId}?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return (await response.json()) as ApiResponse<Review[]>;
  }

  // ==================== ADMIN ====================

  public static async getAdminStats(): Promise<ApiResponse<any>> {
    console.log('API: Calling GET /api/admin/stats');
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    const data = (await response.json()) as ApiResponse<any>;
    console.log('API: Stats response status:', response.status, 'data:', data);
    return data;
  }

  public static async getAdminUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    userType?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<{ users: User[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.userType) queryParams.append('userType', params.userType);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

    const url = `${API_BASE_URL}/api/admin/users?${queryParams.toString()}`;
    console.log('API: Calling GET', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    const data = (await response.json()) as ApiResponse<{ users: User[]; pagination: any }>;
    console.log('API: Users response status:', response.status, 'data:', data);
    return data;
  }

  public static async getAdminDoctors(params?: {
    page?: number;
    limit?: number;
    search?: string;
    isVerified?: boolean;
  }): Promise<ApiResponse<{ doctors: any[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isVerified !== undefined) queryParams.append('isVerified', params.isVerified.toString());

    const url = `${API_BASE_URL}/api/admin/doctors?${queryParams.toString()}`;
    console.log('API: Calling GET', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    const data = (await response.json()) as ApiResponse<{ doctors: any[]; pagination: any }>;
    console.log('API: Doctors response status:', response.status, 'data:', data);
    return data;
  }

  public static async toggleUserStatus(userId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}/toggle-status`, {
      method: 'PUT',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse;
  }

  public static async toggleDoctorVerification(doctorId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/admin/doctor/${doctorId}/verify`, {
      method: 'PUT',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse;
  }

  public static async getAdminUserDetails(userId: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<any>;
  }

  public static async deleteUser(userId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse;
  }

  public static async getAdminAppointments(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<{ appointments: Appointment[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/api/admin/appointments?${queryParams.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    return (await response.json()) as ApiResponse<{ appointments: Appointment[]; pagination: any }>;
  }
}

export default ApiService;
