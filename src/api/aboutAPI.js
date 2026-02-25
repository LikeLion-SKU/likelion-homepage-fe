import { APIService } from './axios';

export async function getAbout(semester, parts, role) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_ABOUT}/semester/${semester}/parts/${parts}/role/${role}`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
    location.href = '/error';
  }
}

export async function getChairman(semester, role) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_ABOUT}/semester/${semester}/role/${role}`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
    location.href = '/error';
  }
}
