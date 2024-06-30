import { setUserAction, removeUserAction } from "../store/slices/user.slice";
import { dispatch } from "../store/store";
import { loginUserRequest, registerUserRequest } from "../requests/auth.proxy";

export const loginUser = async ({ name, password }) => {
  const user = await loginUserRequest({ name, password });

  if (!user._id) {
    throw Error("Invalid username or password.");
  }

  dispatch(setUserAction(user));
}

export const registerUser = async ({ name, password }) => {
  const user = await registerUserRequest({ name, password });

  if (!user._id) {
    throw Error("Register failed");
  }

  dispatch(setUserAction(user));
};


export const logoutUser = async () => {
  dispatch(removeUserAction());
};