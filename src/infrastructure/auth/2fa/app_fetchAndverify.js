import API_BASE_URL from '../../../config/config';

export const fetch2FASetup = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/2fa/app-generate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to generate 2FA setup.');
  }
  return result;
};

export const verify2FAToken = async (userId, token, firstTime) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/2fa/app-verify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, token , firstTime}),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to verify 2FA token.');
  }
  return response;
};
