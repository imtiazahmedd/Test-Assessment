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
    console.log(selectedDate, "date")
    console.log(selectedTime, "time")

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }

    const bookingSubmit = () => {
        const { userData } = props;
        const currentUserId =  localStorage.getItem("userId")

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user, "iiiiuuu")
                firebase.database().ref('users/' + user.uid).once("value", snap => {
                    console.log(snap.val(), "uuu")
                })
            }
        })
       

    // return firebase.database().ref('/users/' + currentUserId).once('value').then((snapshot) => {
    //     console.log(snapshot.val(), "vvvvvv33")
    // });


        // let slotRef = firebase.database().ref('slots/' + userData.id);
        // slotRef.set({slot_name: userData.slot_name, 'first_name': userData.first_name, 'last_name': userData.last_name, "email": userData.email, "is_booked": true, "date": selectedDate, "time_duration": selectedTime.toString() })

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
            <Button onClick={() => { bookingSubmit() }} type="primary">
                Submit
            </Button>
        </>
    );
};

export default BookingSlot