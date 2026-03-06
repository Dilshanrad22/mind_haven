// API Base URL - pointing to separate backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
  DoctorProfile,
  DoctorsListResponse,
  ApiResponse,
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

  public static logout(): void {
    this.removeToken();
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default ApiService;
