export const addMembersFiled = (user) => {
  const { _id, name, pass, famely } = user;
  return { _id, name, pass, famely: { ...famely, members: [] } };
};
