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
  console.log(reqToBackend);
  try {
    const response = await fetch(reqToBackend);
    console.log('RESPONSE HERE');
    console.log(response);
    const result = await response.json();
    console.log('Success:', result);
    return true;
  } catch (error) {
    console.error('Error:', error);
  }
};
