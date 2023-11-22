import React, {useState} from 'react'
import { FaPlus } from "react-icons/fa6";
import db from "../components/db.json";

const Patients = () => {

  const Patients = db.Patients;


  
  const [base_tuples, setBase_tuples] = useState(5)


  const increaseBaseTuples = () => {
    let newBase = base_tuples+5;
    if (newBase > Patients.length) {
      newBase = Patients.length;
    }
    setBase_tuples(newBase);
  }

  const decreaseBaseTuples = () => {
    let newBase = 5;
    if(Patients.length < 5){
      newBase = Patients.length;
    }
    setBase_tuples(newBase);
  }



  return (
  <div className='w-full min-h-full flex justify-center items-center p-2'>
    <div className='w-5/6 p-2 pr-8 bg-white rounded-lg drop-shadow-xl'>
      
      {/* TITLE AND ADD A PROCESS */}
      <div className='flex items-center justify-between border-b-2 border-sec p-2 m-2'>
        <p className='font-bold text-lg'>PATIENTS</p>
        <div className='flex items-center justify-center rounded-full bg-pen p-2 drop-shadow-lg select-none hover:cursor-pointer'>
          <FaPlus color='#ffffff' size={12}/> <p className='ml-1 font-semibold text-white text-xs'>ADD PATIENT</p>
        </div>
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
        <div className='w-1/12'>
          <p className='font-bold text-sm'>Sex</p>
        </div>

          {/* AGE */}
        <div className='w-1/12'>
          <p className='font-bold text-sm'>Age</p>
        </div>

          {/* CONTACT */}
        <div className='w-3/12'>
          <p className='font-bold text-sm'>Contact</p>
        </div>

      </div>

      {/* PROCESSES */}
      {Patients?.map((patient, index) => (
          index < base_tuples ?
          <div className='flex items-center justify-start m-2 p-2 bg-sec'>
            {/* ID */}
            <div className='w-1/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{patient.id}</p>
            </div>

            {/* FIRSTNAME */}
            <div className='w-2/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{patient.firstname}</p>
            </div>

            {/* LASTNAME */}
            <div className='w-2/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{patient.lastname}</p>
            </div>

            {/* SEX */}
            <div className='w-1/12 flex items-center justify-start'>
              <p className='font-semibold text-sm ml-1'>{patient.sex}</p>
            </div>

            {/* AGE */}
            <div className='w-1/12 flex items-center justify-start'>
              <p className='font-semibold text-sm ml-1'>{patient.age}</p>
            </div>

            {/* CONTACT */}
            <div className='w-3/12 flex items-center justify-start'>
              <p className='font-semibold text-sm ml-1'>{patient.contactInfo}</p>
            </div>

          </div>
          :
          ""
        ))}

        
        {/* SEE ALL */}
        {
          Patients.length < 5 ?
          <></>
          :
          base_tuples === Patients.length ?
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

export default Patients