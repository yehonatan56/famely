export const getUserDataSelector = (state) => state.users.user;

export const isUserLoginSelector = (state) => !!state.users.user;

export const getUserImagesSelector = (state) => {
  return state.users.user?.famely?.images ?? [];
};
