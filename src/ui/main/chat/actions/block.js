export const blockUser = async ({ uid, targetUid, API_BASE_URL }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/block_unblock_report/block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, targetUid }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: 'Sorry, some error has occurred' };
      }
    } catch (error) {
      return { success: false, message: 'Sorry, some error has occurred' };
    }
  };
