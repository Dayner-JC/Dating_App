export const fetch2FASetup = async (userId) => {
  console.log('userId: ', userId);
  const response = await fetch(
    'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/2fa/app-generate',
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
    'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/2fa/app-verify',
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
