const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

const BACKEND_URL = 'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/create-profile';

/**
 * Validates user account data.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export const validateAndSendAccount = async (data) => {
  const { name, email, password, confirmPassword, photo } = data;
  const errors = {};

  if (!name || name.length < 2) {
    errors.name = 'The name must be at least 2 characters long.';
  }

  if (!email || !emailRegex.test(email)) {
    errors.email = 'The email format is invalid.';
  }

  if (!password || !passwordRegex.test(password)) {
    errors.password =
      'The password must be at least 8 characters long, include a number, and a special character.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password , photo}),
    });

    if (!response.ok) {
      throw new Error('Error sending data to the backend');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, errors: { backend: error.message } };
  }
};
