import { getAuthHeaders } from '@/auth/auth';

export const fetchProfile = async (userId: string) => {
  const headers = getAuthHeaders();
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/profile`,
    { headers: headers }
  );

  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
