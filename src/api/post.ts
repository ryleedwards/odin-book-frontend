import { getAuthHeaders, authProvider } from '@/auth/auth';

export const getPosts = async (view?: string | null) => {
  const headers = getAuthHeaders();
  const getPostsRequest = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts?view=${view}`,
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

export const createLike = async (postId: number) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/likes`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ userId: authProvider.user?.id }),
    }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const deleteLike = async (postId: number) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/likes`,
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ userId: authProvider.user?.id }),
    }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status === 204) {
    return true;
  }
};

export const getPost = async (postId: number) => {
  const headers = getAuthHeaders();

  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`,
    { headers: headers }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const createComment = async (postId: number, content: string) => {
  const headers = getAuthHeaders();
  headers.append('Content-Type', 'application/json');
  const request = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/comments`,
    {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ content, authorId: authProvider.user?.id }),
    }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
