import React, { useState } from 'react';
import { Button, TimePicker } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import "./user.css"


const RangePicker = (props) => {

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();



  const changeStartTime = (e) => {
    setStartValue(e);
    props.startTime(moment(e).format("hh:mm"))
  }

  const changeEndTime = (e) => {
    setEndValue(e);
    props.endTime(moment(e).format("hh:mm"))
  }

  return (
    <>
      <TimePicker
        style={{ width: "240px", marginBottom: "40px", marginTop: "10px" }}
        format="hh:mm"
        placeholder="Select Start Time"
        hideDisabledOptions
        open={startOpen}
        onOpenChange={setStartOpen}
        value={startValue}
        onChange={changeStartTime}
        disabledHours={() => {
          // const minHour = min ? min.hours() : -1;
          const minHour = -1;
          const maxHour = endValue ? endValue.hours() : 24;
          return Array.from({ length: 24 }, (v, k) => k).filter(
            hour => hour < minHour || hour > maxHour
          );
        }}
        disabledMinutes={startSelectedHour => {
          // const minMinutes = min && startSelectedHour <= min.hours() ? min.minutes() : -1;
          const minMinutes = -1;
          const maxMinutes =
            endValue && startSelectedHour >= endValue.hours()
              ? endValue.minutes()
              : 60;

          return Array.from({ length: 60 }, (v, k) => k).filter(
            minutes => minutes < minMinutes || minutes > maxMinutes
          );
        }}
        disabledSeconds={(startSelectedHour, startSelectedMinutes) => {
          // TODO
          return [];
        }}
        addon={() => (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setStartOpen(false);
              setEndOpen(true);
            }}
          >
            Ok
          </Button>
        )}
      />
      &nbsp; - &nbsp;
      <TimePicker
        format="hh:mm"
        style={{ width: "240px", marginBottom: "40px", marginTop: "10px" }}
        placeholder="Select End Time"
        hideDisabledOptions
        open={endOpen}
        onOpenChange={setEndOpen}
        value={endValue}
        onChange={changeEndTime}
        disabledHours={() => {
          const minHour = startValue ? startValue.hours() : -1;
          // const maxHour = max ? max.hours() : 24; 
          const maxHour = 24;
          return Array.from({ length: 24 }, (v, k) => k).filter(
            hour => hour < minHour || hour > maxHour
          );
        }}
        disabledMinutes={endSelectedHour => {
          const minMinutes =
            startValue && endSelectedHour <= startValue.hours()
              ? startValue.minutes()
              : -1;
          // const maxMinutes = max && endSelectedHour >= max.hours() ? max.minutes() : 60; 
          const maxMinutes = 60;
          return Array.from({ length: 60 }, (v, k) => k).filter(
            minutes => minutes < minMinutes || minutes > maxMinutes
          );
        }}
        disabledSeconds={(startSelectedHour, startSelectedMinutes) => {
          // TODO
          return [];
        }}
        addon={() => (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setEndOpen(false);
            }}
          >
            Ok
          </Button>
        )}
      />
    </>
  );
};

export default RangePicker