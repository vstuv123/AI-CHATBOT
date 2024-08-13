import axios from "axios";

export const loginUserAPI = async (email: string, password: string) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/login",
    { email, password },
    config
  );
  if (!data.success) {
    throw new Error("Unable to login");
  }
  return data;
};

export const SignUpUserAPI = async (
  name: string,
  email: string,
  password: string
) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/register",
    { name, email, password },
    config
  );
  if (!data.success) {
    throw new Error("Unable to Sign Up");
  }
  return data;
};

export const LogoutUserAPI = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/logout");
  if (!data.success) {
    throw new Error("Unable to Logout");
  }
  return data;
};

export const LoadUserAPI = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/user");
  if (!data.success) {
    throw new Error("Unable to Load User");
  }
  return data;
};

export const sendChatRequest = async (message: string) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post("http://localhost:5000/api/v1/chat/new", { message }, config);
  if (!data.success) {
    throw new Error("Unable to create Chat");
  }
  return data;
}
