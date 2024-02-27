import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Staff from "./Staff";
import AddProcess from './AddProcess';
import AddPatient from './AddPatient';
import AddStaff from './AddStaff';
import { useNavigate } from 'react-router-dom'

const Main = () => {

  const [page, setPage] = useState('dashboard');
  const [User, setUser] = useState()

  
  const navigate = useNavigate();

  useEffect(() => {

    // Fetching the connected user's username, so we can fetch his information
    
    const connectedUser = sessionStorage.getItem("user");
    if(connectedUser === null){
      navigate("/");
    }

    fetch(`http://localhost:8080/api/staff/getByEmail/${connectedUser}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: 'admin@admin.com',
              passwordHash: 'admin'
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // console.log('Staff member:', data);
          setUser(data);
          // console.log(data);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  

  
  }, [])



  // Function that changes the state of what page it is

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