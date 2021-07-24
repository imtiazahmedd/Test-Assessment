import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Row, Col, message, Space, Card } from 'antd';
import { firebase } from "../firebaseConfig";
import "./user.css"


const ParkingSlot = (props) => {

  const [slotList, setSlotList] = useState([]);

  // useEffect(()=>{
  //     const userRef = firebase.database().ref("slots");
  //     userRef.push({
  //           is_booked: false,
  //           first_name: "",
  //           last_name: "",
  //           email: "",
  //           date: "",
  //           time_duration: ""
  //     })
  // },[])

  const navigateToBooking = (el) => {
    if(!el.is_booked){
      props.goToBooking(el)
    }
  }


  useEffect(() => {
    const data = [];
    const dbRef = firebase.database().ref();
    dbRef.child("slots").get().then((snapshot) => {
      for (let key in snapshot.val()) {
        const obj = {...snapshot.val()[key], id: key}
        data.push(obj)
      }
      setSlotList(data)
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  const renderSlotList = () => {
    return slotList?.map((el) => {
      return (
        <Card onClick={() => {navigateToBooking(el)}} title={el.slot_name} className={el.is_booked ? "slot-booked" : "slot-empty"} >
          {
            el.is_booked ? <div><p>Booked</p>
              <p>{el.date} ({el.time_duration})</p>
            </div> :
              <div><p>Empty</p>
              </div>
          }
        </Card>
      )
    })
  }

  return (
    <>
      <h1>Parking Slots</h1>
      <Space direction="vertical">
        {renderSlotList()}
      </Space>
    </>
  );
};

export default ParkingSlot