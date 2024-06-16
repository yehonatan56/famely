import { setUserAction, removeUserAction } from "../store/slices/user.slice";
import { dispatch } from "../store/store";
import { loginUserRequest } from "../requests/auth.proxy";

export const loginUser = async ({ name, password }) => {
  const user = await loginUserRequest({ name, password });

  if (!user._id) {
    throw Error("Invalid username or password.");
  }

  dispatch(setUserAction(user));
};

// todo: create registerUser function

export const logoutUser = async () => {
  dispatch(removeUserAction());
};
