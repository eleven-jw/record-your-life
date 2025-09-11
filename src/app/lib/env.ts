export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';
export const isTest = process.env.NEXT_PUBLIC_ENV === 'test';
export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

export const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_API_BASE_URL 未配置');
  return baseUrl;
};
export const API_BASE_URL = getApiBaseUrl();