import { getAuthHeaders, authProvider } from '@/auth/auth';

export const getPosts = async () => {
  const headers = getAuthHeaders();
  const getPostsRequest = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
    { headers: headers }
  );

  const response = await fetch(getPostsRequest);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const posts = await response.json();
  return posts;
};

export const createPost = async (content: string) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const request = new Request(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ content: content, authorId: authProvider.user?.id }),
  });
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
