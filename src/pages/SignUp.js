import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userSignUp } from "../redux/actions/authActions";
import Spinner from "../components/Spinner";

import AOS from "aos";
import "aos/dist/aos.css";

import car from "../assets/car.png";

AOS.init();

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    if (
      values.email === undefined ||
      "" ||
      values.password === undefined ||
      "" ||
      values.cpassword === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else if (values.password !== values.cpassword) {
      message.error("Passwords do not match");
    } else {
      dispatch(userSignUp(values));
    }
  };

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-left"
            data-aos-duration="1500"
            alt="logo"
            src={car}
            height={250}
          />
          <h1 className="login-logo">Enveco</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Sign Up</h1>
            <hr />
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>

            <Form.Item name="cpassword" label="Confirm Password">
              <Input.Password />
            </Form.Item>

            <button className="button2 mt-2">Sign Up</button>

            <hr />

            <Link to="/login">Already Signed up ? click here to login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;