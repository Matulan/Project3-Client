import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars, deleteCar } from "../redux/actions/carsActions";
import { Row, Col, Card } from "antd";
import Spinner from "../components/Spinner";
import { Link, Navigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import axios from "axios";

const AdminDashboard = ({ user }) => {
    
  const [totalCars, setTotalCars] = useState([]);
  const [userId, setUserId] = useState(null)
  
  const { cars } = useSelector((state) => state.carsReducer);

  const { loading } = useSelector((state) => state.alertsReducer);

  const userData = JSON.parse(user);
 
  const getUserInfo = async() => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        let response = await axios.get(`https://enveco.herokuapp.com/auth/verify`, {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          })
          
        setUserId(response.data._id)
    } catch (error) {
        console.log(error)
    }
  }

  const dispatch = useDispatch();

  useEffect(()=> {
    getUserInfo()
  }, [])

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
    console.log(cars, user);
  }, [cars]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
 

  return (
    <DefaultLayout>
      <div className="back-img background-repeat">
        <Row justify="center" gutter={16} className="mt-3">
          <Col lg={20} sm={24} xs={24}>
            <div className="text-right">
              <Link className="button1 box-shadow" to="/addcar">
                Add New Car
              </Link>
              <Link className="button1 box-shadow" to="/profile">
                Profile
              </Link>
            </div>
          </Col>
        </Row>
        {loading && <Spinner />}
        <Row justify="center" gutter={16}>
          {totalCars
          .filter((car) => car.owner === userId)
            .map((car) => {
              return (
                <Col lg={5} sm={24} xs={24} key={car._id}>
                  <Card
                    className="car"
                    hoverable
                    cover={<img src={car.image} alt={car.carModel} />}
                  >
                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div>
                        <p>{car.carModel}</p>
                        <p>{car.rentPerHour}$ Rent Per Hour</p>
                      </div>
                      <div>
                        <div className="mr-3">
                          <Link to={`/editcar/${car._id}`}>
                            <EditOutlined className="mr-3 anticon-edit" />
                          </Link>
                          <Popconfirm
                            title="Are you sure to delete this car ?"
                            onConfirm={() => {
                              dispatch(deleteCar({ carid: car._id }));
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined className="anticon-delete" />
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </DefaultLayout>
  );
};
export default AdminDashboard;