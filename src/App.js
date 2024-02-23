import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { useEffect, useState } from "react";

function App() {

  const [User, setUser] = useState()

  useEffect(() => {
    

    fetch('http://localhost:8080/api/staff/getByEmail/char@gmail.com', {
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
          console.log(data);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  

  
  }, [])
  


  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/main" element={<Main User={User} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
