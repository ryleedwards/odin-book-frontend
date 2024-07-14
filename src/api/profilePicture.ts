import { getAuthHeaders, authProvider } from '@/auth/auth';

export const updateProfilePicture = async (formData: FormData) => {
  const headers = getAuthHeaders();
  const currentUserId = authProvider.user?.id;

  const reqToBackend = new Request(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/users/${currentUserId}/profile/upload-profile-picture`,
    {
      method: 'POST',
      headers: headers,
      body: formData,
    }
  );
  try {
    const response = await fetch(reqToBackend);
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    console.error('Error:', error);
  }
};
