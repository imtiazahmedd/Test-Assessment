import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Row, Col, message, Space, Card, DatePicker, TimePicker } from 'antd';
import { firebase } from "../firebaseConfig";
import moment from 'moment';


const BookingSlot = (props) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [submitLoader, setSubmitLoader] = useState(false);

    const onDateChange = (date, dateString) => {
        setSelectedDate(dateString)
    }

    const onTimeChange = (date, dateString) => {
        setSelectedTime(dateString)
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }

    const bookingSlot = () => {
        return new Promise((resolve, reject)=>{
            const { userData } = props;
            const userEmail = firebase.auth().currentUser.email;
            let slotRef = firebase.database().ref('slots/' + userData.id);
            slotRef.set({slot_name: userData.slot_name, "email": userEmail, "is_booked": true, "date": selectedDate, "time_duration": selectedTime.toString() })
            .then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    const bookingSubmit = () => {
        setSubmitLoader(true)
        bookingSlot().then((success)=>{
            message.success('Your parking slot has been booked Successfully', 5, onclose).then(()=>{
                props.goBack()
            });
            setSubmitLoader(false)
        }).catch((err)=>{
            setSubmitLoader(false)
        })

    }
    return (
        <>
            <h1>Booking Slot</h1>
            <div>
                <DatePicker style={{ width: "500px", marginBottom: "40px", marginTop: "10px" }} disabledDate={disabledDate} onChange={onDateChange} />
            </div>
            <div>
                <TimePicker.RangePicker style={{ width: "500px", marginBottom: "20px" }} format="HH: mm" onChange={onTimeChange} />
            </div>
            <Button onClick={() => { props.goBack() }} type="primary" style={{ marginRight: "10px" }}>
                Back
            </Button>
            <Button loading={submitLoader} onClick={() => { bookingSubmit() }} type="primary">
                Submit
            </Button>
        </>
    );
};

export default BookingSlot