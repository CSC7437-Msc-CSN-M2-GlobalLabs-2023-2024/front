import React, {useState} from 'react';
import Layout from '../components/Layout';
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Staff from "./Staff";
import AddProcess from './AddProcess';
import AddPatient from './AddPatient';
import AddStaff from './AddStaff';

const Main = ({User}) => {

  const [page, setPage] = useState('dashboard');

  const changePage = (p) => {
    setPage(p);
  }

  return (
    <Layout page={page} changePage={changePage} User={User}>
      {
        page === 'dashboard' ?
        <Dashboard changePage={changePage} User={User}/>
        :
        page === 'addprocess' ? 
        <AddProcess />
        :
        page === 'patients' ?
        <Patients changePage={changePage}/>
        :
        page === 'addpatient' ?
        <AddPatient />
        :
        page === 'staff' ?
        <Staff User={User} changePage={changePage}/>
        :
        page === 'addstaff' ?
        <AddStaff />
        :
        <div></div>
      }
    </Layout>
  )
}

export default Main