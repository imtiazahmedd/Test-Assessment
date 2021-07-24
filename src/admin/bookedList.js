import React, {useState, useEffect} from 'react';
import { Layout, Menu,Table} from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import "./admin.css"

import { firebase } from "../firebaseConfig";

const { Sider, Content } = Layout;

const BookedList = () => {

    const [slotListing, setSlotListing] = useState(null);
    const [data,setData] = useState([]);

    useEffect(() => {
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
      },[]);

      const mappingTableData = () => {
          const data = [];
            for(let key in slotListing){
              if(slotListing[key].email !== ""){
                data.push(slotListing[key])
              }
            }
            setData(data)
      }

      useEffect(()=>{
        mappingTableData()
      },[slotListing])

const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
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
      title: 'Cancel',
      dataIndex: 'time_duration',
      key: 'time_duration',
    },
    {
      title: 'Action',
      dataIndex: 'cancel',
      render: text => <a onClick={(dataIndex)=>{console.log(dataIndex, "chla to gya")}}>Cancel</a>,
    }
  ];

    return (
      <Table columns={columns} dataSource={data} pagination={false} />
    );
};

export default BookedList