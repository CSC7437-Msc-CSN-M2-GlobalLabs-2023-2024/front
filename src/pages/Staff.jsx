import React, {useState} from 'react'
import { FaPlus } from "react-icons/fa6";
import db from "../components/db.json";

const Staff = () => {

  const Staff = db.Staff;


  
  const [base_tuples, setBase_tuples] = useState(5);


  const increaseBaseTuples = () => {
    let newBase = base_tuples+5;
    if (newBase > Staff.length) {
      newBase = Staff.length;
    }
    setBase_tuples(newBase);
  }

  const decreaseBaseTuples = () => {
    let newBase = 5;
    if(Staff.length < 5){
      newBase = Staff.length;
    }
    setBase_tuples(newBase);
  }



  return (
  <div className='w-full min-h-full flex justify-center items-center p-2'>
    <div className='w-5/6 p-2 pr-8 bg-white rounded-lg drop-shadow-xl'>
      
      {/* TITLE AND ADD A PROCESS */}
      <div className='flex items-center justify-Start border-b-2 border-sec p-2 m-2'>
        <p className='font-bold text-lg'>STAFF</p>
      </div>

      
        {/* ID FIRSTNAME LASTNAME SEX AGE CONTACT */}
      <div className='flex items-center justify-start m-2 px-2 pb-2 border-b-2 border-sec'>
          {/* ID */}
        <div className='w-1/12'>
          <p className='font-bold text-sm'>ID</p>
        </div>

          {/* FI  RST NAME */}
        <div className='w-2/12'>
          <p className='font-bold text-sm'>First Name</p>
        </div>

          {/* LAST NAME */}
        <div className='w-2/12'>
          <p className='font-bold text-sm'>Last Name</p>
        </div>

          {/* SEX */}
        <div className='w-2/12'>
          <p className='font-bold text-sm'>Position</p>
        </div>

          {/* CONTACT */}
        <div className='w-3/12'>
          <p className='font-bold text-sm'>Contact</p>
        </div>

      </div>

      {/* PROCESSES */}
      {Staff?.map((staff, index) => (
          index < base_tuples ?
          <div className='flex items-center justify-start m-2 p-2 bg-sec'>
            {/* ID */}
            <div className='w-1/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{staff.id}</p>
            </div>

            {/* FIRSTNAME */}
            <div className='w-2/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{staff.firstname}</p>
            </div>

            {/* LASTNAME */}
            <div className='w-2/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{staff.lastname}</p>
            </div>

            {/* POSITION */}
            <div className='w-2/12 flex items-center justify-start'>
              <p className='font-semibold text-sm ml-1'>{staff.position}</p>
            </div>

            {/* CONTACT */}
            <div className='flex items-center justify-start'>
              <p className='font-semibold text-sm mx-1'>{staff.contactInfo.phone}</p> <p>//</p> <p className='font-semibold text-sm ml-1'>{staff.contactInfo.email}</p>
            </div>

          </div>
          :
          ""
        ))}

        
        {/* SEE ALL */}
        {
          Staff.length < 5 ?
          <></>
          :
          base_tuples === Staff.length ?
          <div className='flex items-center justify-center m-2 px-2 pt-2 border-t-2 border-sec select-none hover:cursor-pointer' onClick={decreaseBaseTuples}>
            <p className='font-bold text-sm'>VIEW LESS</p>
          </div>
          :
          <div className='flex items-center justify-center m-2 px-2 pt-2 border-t-2 border-sec select-none hover:cursor-pointer' onClick={increaseBaseTuples}>
            <p className='font-bold text-sm'>VIEW MORE</p>
          </div>
        }


    </div>
  </div>
  )
}

export default Staff