let currentUserUID = null;

export const setCurrentUserUID = (uid) => {
  currentUserUID = uid;
};

export const getCurrentUserUID = () => {
  return currentUserUID;
};
