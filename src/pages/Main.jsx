import React, {useState} from 'react';
import Layout from '../components/Layout';
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Appointment from "./Appointment";
import Staff from "./Staff";
const Main = () => {

  const [page, setPage] = useState('dashboard')


  const changePage = (p) => {
    setPage(p);
  }

  return (
    <Layout page={page} changePage={changePage}>
      {
        page === 'dashboard' ?
        <Dashboard />
        :
        page === 'patients' ?
        <Patients />
        :
        page === 'appointment' ?
        <Appointment />
        :
        page === 'staff' ?
        <Staff />
        :
        <div></div>
      }
    </Layout>
  )
}

export default Main