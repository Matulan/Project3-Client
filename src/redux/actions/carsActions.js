import axios from "axios";
import { message } from "antd";

import { LOADING } from "../constants/alertsConstants";
import { GET_ALL_CARS } from "../constants/carConstants";



export const getAllCars = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = await axios.get(`https://enveco.netlify.app/api/getallcars`, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    }	);
    dispatch({ type: GET_ALL_CARS, payload: response.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const addCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    await axios.post(`https://enveco.netlify.app/api/addcar`, data, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    }	);
    
    
    dispatch({ type: LOADING, payload: false });

    message.success("Car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const editCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    await axios.put(`https://enveco.netlify.app/api/cars/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    }	 );
    dispatch({ type: LOADING, payload: false });

    message.success("Car edited successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const deleteCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    await axios.delete(`https://enveco.netlify.app/api/cars/${data.carid}`, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    }	);
    dispatch({ type: LOADING, payload: false });

    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};