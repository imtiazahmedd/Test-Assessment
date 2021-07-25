import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import "./admin.css"
import { firebase } from "../firebaseConfig";
import ReplyModal from "./replyModal"


const FeedBackList = () => {

  const [feedbackListing, setFeedbackListing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [feedbackUserData, setFeedbackUserData] = useState(null);
  const [data, setData] = useState([]);

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
  }, []);

  const mappingTableData = () => {
    const data = [];
    for (let key in feedbackListing) {
      data.push(feedbackListing[key])
    }
    setData(data)
  }

  const ReplyToFeedback = (record) => {
    setShowModal(true)
    setFeedbackUserData(record)
  }

  useEffect(() => {
    mappingTableData()
  }, [feedbackListing])
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
    {
      title: 'Action',
      dataIndex: 'Reply',
      render: (text, record) => <a onClick={(dataIndex) => { ReplyToFeedback(record) }}>Reply</a>,
    }
  ];

  const submitFeedbackToTargetedNode = (targetObjId, feedbackUserData) => {
    return new Promise((resolve, reject) => {
      let feedbackRef = firebase.database().ref('feedback/' + targetObjId);
      feedbackRef.set({ email: feedbackUserData.email, feedback: feedbackUserData.feed_back, uid: feedbackUserData.uid, reply: replyMessage })
        .then((res) => {
          resolve(res)
          setShowModal(false)
          setReplyMessage("")
          message.success('Reply has been sent Successfully', 2)
        }).catch((err) => {
          reject(err)
        })
    })
  }
  const submitReply = () => {
    let targetObjId = null;
    const dbRef = firebase.database().ref();
    dbRef.child("feedback").get().then((snapshot) => {
      if (snapshot.exists()) {
        for (let key in snapshot.val()) {
          if (snapshot.val()[key].uid === feedbackUserData.uid) {
            targetObjId = key
          }
        }
        submitFeedbackToTargetedNode(targetObjId, feedbackUserData)
      }
    })

  }

  const hideModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <Table columns={columns} dataSource={data} />
      <ReplyModal textAreaChange={(text) => { setReplyMessage(text.target.value) }} isModalVisible={showModal} handleOk={() => { submitReply() }} handleCancel={hideModal} />
    </>
  );
};

export default FeedBackList