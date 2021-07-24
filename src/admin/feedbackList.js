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

const FeedBackList = () => {

    const [feedbackListing, setFeedbackListing] = useState(null);
    const [data,setData] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("feedback").get().then((snapshot) => {
          if (snapshot.exists()) {
            setFeedbackListing(snapshot.val())
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      },[]);

      const mappingTableData = () => {
          const data = [];
            for(let key in feedbackListing){
                data.push(feedbackListing[key])
            }
            setData(data)
      }

      useEffect(()=>{
        mappingTableData()
      },[feedbackListing])
    console.log(data, "ddd")
const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Feedback',
      dataIndex: 'feed_back',
      key: 'feed_back',
    },
  ];
  
    return (
      <Table columns={columns} dataSource={data} />
    );
};

export default FeedBackList