import API_BASE_URL from '../../../config/config';
import { getCurrentUserUID } from '../../uid/uid';

const BACKEND_URL = `${API_BASE_URL}/profile/create`;

/**
 * Validates user account data.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export const validateAndSendAccount = async (data) => {
  const {name,
        birthday,
        gender,
        preference,
        height,
        intentions,
        location,
        about,
        interests,
      } = data;
  const errors = {};

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const uid = getCurrentUserUID();
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        name,
        birthday,
        gender,
        preference,
        height,
        intentions,
        location,
        about,
        interests,
      }),
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
