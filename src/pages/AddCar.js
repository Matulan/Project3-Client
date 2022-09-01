import { Col, Row, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { addCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { CountryRegionData } from "react-country-region-selector";
import service from "../api/service";

const { Option } = Select;

function AddCar({ user }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [states, setStates] = useState([]);

  const { loading } = useSelector((state) => state.alertsReducer);

  const [image, setImage] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getCountries = () => CountryRegionData;

  const countries = getCountries();

  const getStates = (index) =>
    CountryRegionData[index][2].split("|").map((state) => {
      state = state.split("~");
      return {
        label: state[0],
        value: state[1],
      };
    });

  const onFinish = (values) => {
    values = { ...values, user: JSON.parse(user)._id };
    if (
        values.carModel === undefined ||
        "" ||
        values.carType === undefined ||
        "" ||
      values.capacity === undefined ||
      "" ||
      values.fuelType === undefined ||
      "" ||
      values.image === undefined ||
      "" ||
      values.rentPerHour === undefined ||
      "" ||
      values.gear === undefined ||
      "" ||
      values.accountDetails === undefined ||
      "" ||
      values.country === undefined ||
      "" ||
      values.state === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else {
      values.bookedTimeSlots = [];
      dispatch(addCar({...values, image: image}));
    }
  };


  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("image", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.fileUrl);

      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="back-img background-repeat">
        <Row justify="center" className="mt-5">
          <Col lg={12} sm={24} xs={22}>
            <Form
              className="box-shadow-1 p-2 login-form"
              layout="vertical"
              onFinish={onFinish}
            >
              <h1 className="main-title-text">Add New Car</h1>
              <hr />
              <Form.Item name="carModel" label="Car model">
                <Input placeholder="Car model" />
              </Form.Item>

              <Form.Item name="carType" label="Car Type">
                <Input placeholder="Car type" />
              </Form.Item>

              <Form.Item name="image" label="Image url">
                <Input type="file" placeholder="Image URL" onChange={handleFileUpload}/>
              </Form.Item>

              <Form.Item name="rentPerHour" label="Rent per hour">
                <Input type="number" placeholder="Rent Per Hour" />
              </Form.Item>

              <Form.Item name="capacity" label="Capacity">
                <Input type="number" placeholder="Capacity" />
              </Form.Item>

              <Form.Item name="gear" label="Gear-type">
                <Input placeholder="Automatic or Manual" />
              </Form.Item>


              <Form.Item name="fuelType" label="Fuel Type">
                <Input placeholder="Gasoline, Diesel or Electric" />
              </Form.Item>

              <Form.Item name="accountDetails" label="Account Details">
                <Input placeholder="Account Details" />
              </Form.Item>

              <Form.Item name="country" label="Country">
                <Select
                  allowClear
                  onChange={(value, option) => {
                    if (value) setStates(getStates(option.key));
                    form.setFieldsValue({
                      state: undefined,
                    });
                  }}
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
                  size="small"
                >
                  {countries.map((c, i) => (
                    <Option key={i} value={c[1]}>
                      {c[0]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="state" label="State">
                <Select
                  size="small"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {states.map((s, i) => (
                    <Option key={i} value={s.value}>
                      {s.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="text-right">
                <button className="button1 mr-1">Add Car</button>
                <button className="button1">
                  <Link to="/admin">Cancel</Link>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AddCar;