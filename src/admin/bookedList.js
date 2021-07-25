import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import "./admin.css"

import { firebase } from "../firebaseConfig";

const BookedList = () => {

  const [slotListing, setSlotListing] = useState(null);
  const [data, setData] = useState([]);

  const getSlotListing = () => {
    const dbRef = firebase.database().ref();
    dbRef.child("slots").get().then((snapshot) => {
      if (snapshot.exists()) {
        setSlotListing(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getSlotListing()
  }, []);

  const mappingTableData = () => {
    const data = [];
    for (let key in slotListing) {
      if (slotListing[key].email !== "") {
        data.push(slotListing[key])
      }
    }
    setData(data)
  }

  useEffect(() => {
    mappingTableData()
  }, [slotListing])

  const cancelTargetedNode = (key, data) => {
    return new Promise((resolve, reject) => {
      let slotRef = firebase.database().ref('slots/' + key);
      slotRef.set({ slot_name: data.slot_name, "email": "", "is_booked": false, "date": "", "time_duration": "" })
        .then((res) => {
          resolve(res)
          message.success('Slot has been Cancelled Successfully', 2, onclose).then(() => {
            getSlotListing()
          });
        }).catch((err) => {
          reject(err)
        })
    })
  }

  const cancelBookedSlot = (record) => {
    let targetObjId = null;
    const dbRef = firebase.database().ref();
    dbRef.child("slots").get().then((snapshot) => {
      if (snapshot.exists()) {
        for (let key in snapshot.val()) {
          if (snapshot.val()[key].uid === record.uid) {
            targetObjId = key
          }
        }
        cancelTargetedNode(targetObjId, record)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Slot',
      dataIndex: 'slot_name',
      key: 'slot_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time_duration',
      key: 'time_duration',
    },
    {
      title: 'Action',
      dataIndex: 'cancel',
      render: (text, record) => <a onClick={(dataIndex) => { cancelBookedSlot(record) }}>Cancel</a>,
    }
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  );
};

export default BookedList