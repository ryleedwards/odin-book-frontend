import { getAuthHeaders } from '@/auth/auth';

export const fetchUser = async (userId: number) => {
  const headers = getAuthHeaders();
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
    {
      method: 'GET',
      headers: headers,
    }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const updateUser = async (userId: number, formData: FormData) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const parsedFormData = Object.fromEntries(formData);
  const profileData = {
    profile: parsedFormData,
  };
  const reqToBackend = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
    {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(profileData),
    }
  );

  const response = await fetch(reqToBackend);
  if (response.status !== 204) {
    throw new Error(response.statusText);
  }
  return true;
};
