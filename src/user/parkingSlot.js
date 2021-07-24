import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Row, Col, message, Space, Card } from 'antd';
import { firebase } from "../firebaseConfig";
import "./user.css"


const ParkingSlot = (props) => {

  const [slotList, setSlotList] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false)

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
  const cancelSlot = (params) => {
    return new Promise((resolve, reject)=>{
        let slotRef = firebase.database().ref('slots/' + params.id);
        slotRef.set({slot_name: params.slot_name, email: "", is_booked: false, date: "", time_duration: "" })
        .then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}


  const getSlotListing = () => {
    const data = [];
    const dbRef = firebase.database().ref();
    dbRef.child("slots").get().then((snapshot) => {
      for (let key in snapshot.val()) {
        const obj = {...snapshot.val()[key], id: key, cancelLoading: false}
        data.push(obj)
      }
      setSlotList(data)
    }).catch((error) => {
      console.error(error);
    });
  }


  useEffect(() => {
    getSlotListing()
  }, []);


  const cancelBooking = (params) => {
    setCancelLoading(true)
    cancelSlot(params).then((success)=>{
        message.success('Your parking slot has been canceled Successfully', 5)
        setCancelLoading(false)
        getSlotListing()
    }).catch((err)=>{
        setCancelLoading(false)
    })
  }

  const renderSlotList = () => {
    return slotList?.map((el) => {
      return (
        <div style={{display: 'flex'}}>
        <Card onClick={() => {navigateToBooking(el)}} title={el.slot_name} className={el.is_booked ? "slot-booked" : "slot-empty"} >
          {
            el.is_booked ? <div><p>Booked</p>
              <p>{el.date} ({el.time_duration})</p>
            </div> :
              <div><p>Empty</p>
              </div>
          }
        </Card>
        <Button loading={cancelLoading} onClick={()=>{cancelBooking(el)}} type="primary" disabled={el.is_booked ? false : true} style={{height: "40px", marginLeft: "20px"}}>Cancellation</Button>
        </div>
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