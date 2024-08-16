export const loginUserRequest = async ({ name, password: pass }) => {
  const user = await fetch("http://localhost:3009/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, pass }),
  })
    .then((response) => response.status)
    .
    catch((error) => {
      console.error("failed to login user with error", error);
      return null;
    });
    return user !== 400;
};

export const registerUserRequest = async ({ name, password: pass }) => {
  const response = await fetch("http://localhost:3009/famelys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, pass: pass, famely: { images: [] } }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("failed to login user with error", error);
      return null;
    });

  return response;
};
