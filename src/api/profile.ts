import { getAuthHeaders } from '@/auth/auth';

export const fetchProfile = async (userId: number) => {
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

export const fetchUserPosts = async (userId: number) => {
  const headers = getAuthHeaders();
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/posts`,
    { headers: headers }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
