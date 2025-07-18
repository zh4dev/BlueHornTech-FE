import api from "./api";

export const http = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const res = await api.get<T>(url, { params });
    return res.data;
  },

  post: async <T>(url: string, data: object): Promise<T> => {
    const res = await api.post<T>(url, data);
    return res.data;
  },

  put: async <T>(url: string, data: object): Promise<T> => {
    const res = await api.put<T>(url, data);
    return res.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await api.delete<T>(url);
    return res.data;
  },
};
