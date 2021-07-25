import React, { useState } from 'react';
import { Button, message, DatePicker } from 'antd';
import { firebase } from "../firebaseConfig";
import RangePicker from "./rangePicker"
import "antd/dist/antd.css";
import moment from 'moment';


const BookingSlot = (props) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [submitLoader, setSubmitLoader] = useState(false);


    const onDateChange = (date, dateString) => {
        setSelectedDate(dateString)
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }

    const bookingSlot = () => {
        return new Promise((resolve, reject) => {
            const { userData } = props;
            const currentUser = firebase.auth().currentUser;
            const userEmail = currentUser.email;
            const userId = currentUser.uid;
            let slotRef = firebase.database().ref('slots/' + userData.id);
            slotRef.set({ slot_name: userData.slot_name, "email": userEmail, "is_booked": true, "date": selectedDate, "time_duration": startTime + "," + endTime, uid: userId })
                .then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
        })
    }

    const bookingSubmit = () => {
        setSubmitLoader(true)
        bookingSlot().then((success) => {
            message.success('Your parking slot has been booked Successfully', 5, onclose).then(() => {
                props.goBack()
            });
            setSubmitLoader(false)
        }).catch((err) => {
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
                <RangePicker startTime={(sTime) => { setStartTime(sTime) }} endTime={(eTime) => { setEndTime(eTime) }} />
            </div>
            <Button onClick={() => { props.goBack() }} type="primary" style={{ marginRight: "10px" }}>
                Back
            </Button>
            <Button disabled={selectedDate && startTime && endTime ? false : true} loading={submitLoader} onClick={() => { bookingSubmit() }} type="primary">
                Submit
            </Button>
        </>
    );
};

export default BookingSlot