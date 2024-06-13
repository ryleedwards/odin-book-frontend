import { getAuthHeaders, authProvider } from '@/auth/auth';

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

export const fetchIsFollowed = async (
  userId: number,
  currentUserId: number
) => {
  const headers = getAuthHeaders();
  const request = new Request(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/users/${userId}/follow?currentUserId=${currentUserId}`,
    { headers: headers }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const createFollow = async (userId: number) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const currentUserId = authProvider.user?.id;
  console.log('creating follow');
  console.log(`currentUserId: ${currentUserId}`);
  console.log(`userId: ${userId}`);
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/follow`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ followerId: currentUserId }),
    }
  );
  const response = await fetch(request);
  console.log(response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const deleteFollow = async (userId: number) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const currentUserId = authProvider.user?.id;
  console.log('deleting follow');
  console.log(`currentUserId: ${currentUserId}`);
  console.log(`userId: ${userId}`);
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/follow`,
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ followerId: currentUserId }),
    }
  );

  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return true;
};
