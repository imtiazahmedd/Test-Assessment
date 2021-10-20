import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import { Table, Tag, Space } from 'antd';
import { assertRegExpLiteral } from '@babel/types';

const Home = () => {
    const location = useLocation();

    const userData = location?.state?.data;
    const columns = [
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
          render: text => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            render: text => <a>{text}</a>,
          },
          {
            title: 'Company Id',
            dataIndex: 'company_id',
            key: 'company_id',
            render: text => <a>{text}</a>,
          },
          {
            title: 'Locations',
            dataIndex: 'location',
            key: 'location',
            render: text => <a>{text}</a>,
          },
    ]

    const data = [
        {
          key: '1',
          first_name: userData?.firstNameAdmin,
          last_name: userData?.lastNameAdmin,
          company_id: userData?.companyId,
          location: userData?.currentLocation.map((el)=>{return el.locationName + ", "})
        },
    ]

    return (
        <Table columns={columns} dataSource={data} />
    );
};

export default Home