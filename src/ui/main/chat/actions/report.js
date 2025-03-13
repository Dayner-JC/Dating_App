export const reportUser = async ({
    reporterUid,
    reportedUid,
    reason,
    otherText,
    API_BASE_URL,
  }) => {
    const reportData = {
      reporterUid,
      reportedUid,
      reason,
      otherText: reason === 'Other' ? otherText : null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/block_unblock_report/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        const { message } = await response.json();
        return { success: false, message: message || 'Error sending the report.' };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: 'An error occurred while submitting the report.' };
    }
  };
