import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import db from "../components/db.json";
import axios from 'axios';

const Dashboard = ( {changePage} ) => {

  // const Processes = [
  //   { id: 1, injury: "Too Handsome", name: "Charbel", progress: 2 },
  //   { id: 2, injury: "Back pain", name: "Alice", progress: 4 },
  //   { id: 3, injury: "Headache", name: "Bob", progress: 3 },
  //   { id: 4, injury: "Muscle strain", name: "Eva", progress: 3 },
  //   { id: 5, injury: "Knee injury", name: "Mike", progress: 2 },
  //   { id: 6, injury: "Shoulder pain", name: "Sara", progress: 4 },
  //   { id: 7, injury: "Fractured wrist", name: "Tom", progress: 1 },
  //   { id: 8, injury: "Neck stiffness", name: "Emily", progress: 5 },
  //   { id: 9, injury: "Torn ligament", name: "Chris", progress: 4 },
  //   { id: 10, injury: "Migraine", name: "Olivia", progress: 3 }
  // ];

  const Processes = db.Processes; 

  const Patients = db.Patients;

  const Staff = db.Staff;

  const Stages = db.Stages;

  const total_Progress = 5;

  const [base_tuples, setBase_tuples] = useState(5)

  const [test, setTest] = useState("Test")


  useEffect(() => {
    if (base_tuples > Processes.length) {
      setBase_tuples(Processes.length);
    }
  }, [])


  const getApi = () => {
    axios.get("localhost:8080/hello").then(function (response){
      setTest(response);
    })
  }
  

  const getPatientByID = (id) => {
    for(var i = 0; i < Patients.length ; i ++){
      if(Patients[i].id === id){
        return Patients[i];
      }
    }
  }

  const getStagesByID = (id) => {
    for(var i = 0; i < Stages.length ; i ++){
      if(Stages[i].id === id){
        return Stages[i];
      }
    }
  }

  const getProcessProgress = (process) => {
    const total = process.stages.length;
    const stages = [];
    for(var i = 0 ; i < total ; i++){
      stages.push(getStagesByID(process.stages[i]));
    }

    let done = 0;
    for(var i = 0 ; i < total ; i++){
      console.log(stages[i])
      if(stages[i].completed){
        done+=1;
      }
    }
    return Math.trunc((done/total*100));
  }


  const increaseBaseTuples = () => {
    let newBase = base_tuples+5;
    if (newBase > Processes.length) {
      newBase = Processes.length;
    }
    setBase_tuples(newBase);
  }

  const decreaseBaseTuples = () => {
    let newBase = 5;
    if(Processes.length < 5){
      newBase = Processes.length;
    }
    setBase_tuples(newBase);
  }

  const progress = (process) => {

    const progressElements = [];
    const percentage = getProcessProgress(process);

    
    let color = "#FF0000";

    if(percentage > 80){
      color = '#00FF00';
    }else if(percentage > 60){
      color = '#AFFF00';
    }else if(percentage > 40){
      color = '#FFFF00';
    }else if(percentage > 20){
      color = '#FFBC00';
    }

    var done = percentage/100*process.stages.length;
    var total = process.stages.length;
    
    for(let i = 0; i < total ; i++){


      if(i < done) {
        if(i === 0){
          progressElements.push(
          <div style={{backgroundColor: `${color}`,'padding-left': `${1/total}rem`,'padding-right': `${1/total}rem`}} className={`py-1 rounded-l-full`}>
  
          </div>
          );
        }else if(total === done && i === total-1){
          progressElements.push(
          <div style={{backgroundColor: `${color}`,'padding-left': `${1/total}rem`,'padding-right': `${1/total}rem`}} className={`py-1 rounded-r-full`}>
  
          </div>
          );
        }else{
          progressElements.push(
          <div style={{backgroundColor: `${color}`,'padding-left': `${1/total}rem`,'padding-right': `${1/total}rem`}} className={`py-1`}>
  
          </div>
          );
        }
      }else {
        progressElements.push(
        <div style={{'padding-left': `${1/total}rem`,'padding-right': `${1/total}rem`}} className={`py-1`}>

        </div>
        )
      }
    }

    return progressElements;
  }
  
  

  return (
    <div className='w-full min-h-full flex justify-center items-center p-2'>

      <div className='w-5/6 p-2 pr-8 bg-white rounded-lg drop-shadow-xl'>

        {/* TITLE AND ADD A PROCESS */}
        <div className='flex items-center justify-between border-b-2 border-sec p-2 m-2'>
          <p className='font-bold text-lg'>PROCESSES</p>
          {/* <div onClick={getApi}>{test}</div> */}
          <div className='flex items-center justify-center rounded-full bg-pen p-2 drop-shadow-lg select-none hover:cursor-pointer'>
            <FaPlus color='#ffffff' size={12}/> <p className='ml-1 font-semibold text-white text-xs'>ADD PROCESS</p>
          </div>
        </div>


        {/* ORDER BY */}
        {/* <div className='flex items-center justify-between mt-2 mx-2'>
          <p className='font-semibold text-xs'>Order By</p>

          <div className='flex justify-center items-center'>
            <select className='border-none bg-transparent'>
              <option>Priority</option>
            </select>
          </div>
        </div> */}

        {/* ID INJURY PATIENT_NAME PROGRESS OPEN */}
        <div className='flex items-center justify-center m-2 px-2 pb-2 border-b-2 border-sec'>
          {/* ID */}
          <div className='w-1/12'>
            <p className='font-bold text-sm'>ID</p>
          </div>

          {/* INJURY */}
          <div className='w-3/12'>
            <p className='font-bold text-sm'>Injury</p>
          </div>

          {/* PATIENT_NAME */}
          <div className='w-3/12'>
            <p className='font-bold text-sm'>Patient</p>
          </div>

          {/* PROGRESS */}
          <div className='w-3/12'>
            <p className='font-bold text-sm'>Progress</p>
          </div>

          {/* OPEN */}
          <div className='w-2/12'>
            <p className='font-bold text-sm'>Edit</p>
          </div>
        </div>


        {/* PROCESSES */}
        {Processes?.map((process, index) => (
          index < base_tuples ?
          <div className='flex items-center justify-start m-2 p-2 bg-sec'>
            {/* ID */}
            <div className='w-1/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{process.id}</p>
            </div>

            {/* INJURY NAME */}
            <div className='w-3/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{process.name}</p>
            </div>

            {/* PATIENT_NAME */}
            <div className='w-3/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{getPatientByID(process.patient).firstname + " " + getPatientByID(process.patient).lastname}</p>
            </div>

            {/* PROGRESS */}
            <div className='w-3/12 flex items-center justify-start'>
              <div className='w-fit flex items-center justify-start bg-white drop-shadow-lg border border-2 rounded-full'>
                {progress(process)}
              </div>
              <p className='font-semibold text-sm ml-1'>{getProcessProgress(process)}%</p>
            </div>

            {/* OPEN */}
            <div className='w-2/12 flex items-center justify-start'>
              <BiSolidEdit size={24} color='#6ec473' className='hover:cursor-pointer'/>
            </div>
          </div>
          :
          ""
        ))}

        {/* SEE ALL */}
        {
          Processes.length < 5 ?
          <></>
          :
          base_tuples === Processes.length ?
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

export default Dashboard