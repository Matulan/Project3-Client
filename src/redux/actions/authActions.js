import axios from "axios";
import { message } from "antd";

import { LOADING } from "../constants/alertsConstants";

export const userLogin = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.post(`http://localhost:5005/auth/login`, data);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successful");
    dispatch({ type: LOADING, payload: false });

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Login failed");
    dispatch({ type: LOADING, payload: false });
  }
};

export const userSignUp = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post(`http://localhost:5005/auth/signup`, data);
    message.success("Registration successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    message.error("Register failed");
    dispatch({ type: LOADING, payload: false });
  }
};
