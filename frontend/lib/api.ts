import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from './store';

interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export const getImageUrl = (path?: string) => {
  if (!path) return null;

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL?.split('/api/v1')[0] || 'http://localhost:3050').replace(/\/$/, '');

  
  if (path.startsWith('http')) {
    
    if (path.includes('/uploads/')) {
      const uploadsPath = path.substring(path.indexOf('/uploads/'));
      return `${baseUrl}${uploadsPath}`;
    }
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};

export const getVideoStreamUrl = (videoId?: string, sig?: string, expires?: number) => {
  if (!videoId) return null;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1').replace(/\/$/, '');
  let url = `${baseUrl}/streaming/video/${videoId}`;
  if (sig && expires) {
    url += `?sig=${sig}&expires=${expires}`;
  }
  return url;
};

export const getHlsPlaylistUrl = (videoId?: string, sig?: string, expires?: number) => {
  if (!videoId) return null;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1').replace(/\/$/, '');
  let url = `${baseUrl}/streaming/hls/${videoId}/index.m3u8`;
  if (sig && expires) {
    url += `?sig=${sig}&expires=${expires}`;
  }
  return url;
};

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          
          const isRefreshRoute = originalRequest.url?.includes('/auth/refresh') ||
            originalRequest.url?.includes('/auth/login') ||
            originalRequest.url?.includes('/auth/register');

          if (isRefreshRoute) {
            this.handleLogout();
            return Promise.reject(error);
          }

          try {
            
            await this.post('/auth/refresh');
            
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.handleLogout();
            return Promise.reject(error);
          }
        }

        
        if (error.response?.status === 401) {
          this.handleLogout();
        }

        throw error;
      },
    );
  }

  private handleLogout() {
    if (typeof window !== 'undefined') {
      const authStore = useAuthStore.getState();
      if (authStore.user) {
        authStore.logout();
      }

      const isAdminPath = window.location.pathname.startsWith('/lehrer-portal');
      const targetPath = isAdminPath ? '/lehrer-portal/login' : '/';

      if (window.location.pathname !== targetPath && !['/', '/login', '/register', '/teachers', '/courses', '/flashcards', '/community'].includes(window.location.pathname)) {
        window.location.href = targetPath;
      }
    }
  }

  get<T = any>(url: string, config?: any) {
    return this.axiosInstance.get<T, T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: any) {
    return this.axiosInstance.post<T, T>(url, data, config);
  }

  patch<T = any>(url: string, data?: any, config?: any) {
    return this.axiosInstance.patch<T, T>(url, data, config);
  }

  delete<T = any>(url: string, config?: any) {
    return this.axiosInstance.delete<T, T>(url, config);
  }
}

export const apiClient = new ApiClient();


export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  refresh: () => apiClient.post('/auth/refresh'),
  getProfile: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};


export const coursesAPI = {
  list: (skip?: number, take?: number) =>
    apiClient.get('/courses', { params: { skip, take } }),
  manage: (skip?: number, take?: number) =>
    apiClient.get('/courses/manage', { params: { skip, take } }),
  get: (id: string) => apiClient.get(`/courses/${id}`),
  create: (data: any) => apiClient.post('/courses', data),
  update: (id: string, data: any) => apiClient.patch(`/courses/${id}`, data),
  delete: (id: string) => apiClient.delete(`/courses/${id}`),
};


export const usersAPI = {
  list: (skip?: number, take?: number) =>
    apiClient.get('/users', { params: { skip, take } }),
  get: (id: string) => apiClient.get(`/users/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};


export const teachersAPI = {
  list: () => apiClient.get('/teachers'),
  getBySlug: (slug: string) => apiClient.get(`/teachers/${slug}`),
};


export const examsAPI = {
  list: (skip?: number, take?: number) => apiClient.get('/exams', { params: { skip, take } }),
  getOne: (id: string) => apiClient.get(`/exams/${id}`),
  create: (data: any) => apiClient.post('/exams', data),
  update: (id: string, data: any) => apiClient.patch(`/exams/${id}`, data),
  delete: (id: string) => apiClient.delete(`/exams/${id}`),
  getMyResults: () => apiClient.get('/exams/my-results'),
  submit: (id: string, answers: any) => apiClient.post(`/exams/${id}/submit`, { answers }),
};


export const flashcardsAPI = {
  list: (skip?: number, take?: number) =>
    apiClient.get('/flashcards', { params: { skip, take } }),
  get: (id: string) => apiClient.get(`/flashcards/${id}`),
  getMyProgress: () => apiClient.get('/flashcards/my-progress'),
  updateProgress: (flashcardId: string, known: boolean) =>
    apiClient.post('/flashcards/progress', { flashcardId, known }),
  create: (data: any) => apiClient.post('/flashcards', data),
  update: (id: string, data: any) => apiClient.patch(`/flashcards/${id}`, data),
  delete: (id: string) => apiClient.delete(`/flashcards/${id}`),
};


export const ordersAPI = {
  getMyOrders: () => apiClient.get('/orders/my-orders'),
  create: (courseIds: string[]) => apiClient.post('/orders', { courseIds }),
  complete: (id: string) => apiClient.post(`/orders/${id}/complete`),
  delete: (id: string) => apiClient.delete(`/orders/${id}`),
};


export const lessonsAPI = {
  getByCourse: (courseId: string) => apiClient.get(`/lessons/course/${courseId}`),
  get: (id: string) => apiClient.get(`/lessons/${id}`),
  create: (data: any) => apiClient.post('/lessons', data),
  update: (id: string, data: any) => apiClient.patch(`/lessons/${id}`, data),
  delete: (id: string) => apiClient.delete(`/lessons/${id}`),
};


export const progressAPI = {
  get: () => apiClient.get('/progress'),
  getMyCourses: () => apiClient.get('/progress/my-courses'),
  markComplete: (lessonId: string) => apiClient.post('/progress/lesson-complete', { lessonId }),
};


export const adminAPI = {
  getStats: () => apiClient.get('/Lehrer-secret/stats'),
  getUsers: () => apiClient.get('/Lehrer-secret/users'),
  getTeachers: () => apiClient.get('/Lehrer-secret/teachers'),
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadVideo: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadAudio: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getOrders: () => apiClient.get('/orders/admin/all'),
  updateOrderStatus: (id: string, status: string) => apiClient.patch(`/orders/${id}/status`, { status }),
};
