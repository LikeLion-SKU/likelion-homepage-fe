import { APIService } from './axios';

export async function getScedules() {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_SCHEDULE}`;
    const res = await APIService.private.get(baseUrl, {
      params: { isActive: true },
    });
    return res;
  } catch {
    location.href = '/error';
  }
}
