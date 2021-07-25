import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import "./admin.css"

import { firebase } from "../firebaseConfig";

const UserList = () => {
  const [userListing, setUserListing] = useState(null);
  const [data, setData] = useState([]);


  const getUserListing = () => {
    const dbRef = firebase.database().ref();
    dbRef.child("users").get().then((snapshot) => {
      if (snapshot.exists()) {
        setUserListing(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getUserListing()
  }, []);

  const deleteTargetedNode = (key, data) => {
    return new Promise((resolve, reject) => {
      let userRef = firebase.database().ref('users/' + key);
      userRef.remove()
        .then((res) => {
          resolve(res)
          message.success('User has been deleted Successfully', 2, onclose).then(() => {
            getUserListing()
          });
        }).catch((err) => {
          reject(err)
        })
    })
  }

  const detleteUser = (record) => {
    let targetObjId = null;
    const dbRef = firebase.database().ref();
    dbRef.child("users").get().then((snapshot) => {
      if (snapshot.exists()) {
        for (let key in snapshot.val()) {
          if (snapshot.val()[key].uid === record.uid) {
            targetObjId = key
          }
        }
        deleteTargetedNode(targetObjId, record)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const mappingTableData = () => {
    const data = [];
    for (let key in userListing) {
      if (userListing[key].email !== "admin12@gmail.com") {
        data.push(userListing[key])
      }
    }
    setData(data)
  }

  useEffect(() => {
    mappingTableData()
  }, [userListing])

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
      title: 'Action',
      dataIndex: 'cancel',
      render: (text, record) => <a onClick={(dataIndex) => { detleteUser(record) }}>Delete</a>,
    }
  ];
  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default UserList