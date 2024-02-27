import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";

const Dashboard = ( {changePage, User} ) => {

  const [Processes, setProcesses] = useState(); 

  // const total_Progress = 5;

  const [base_tuples, setBase_tuples] = useState(5)


  useEffect(() => {

    const a = [];
    User?.processIds.map((id) => (
      a.push(fetchProcesses(id))
    ));

    setProcesses(a);


    if (base_tuples > Processes?.length) {
      setBase_tuples(Processes?.length);
    }
  }, [])



  const fetchProcesses = (id) => {
    fetch(`http://localhost:8080/api/process/getById/${id}`, {
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
      return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

  }



  const getStagesByID = (id) => {
    

    fetch('http://localhost:8080/api/stage/getById/1', {
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
        // console.log('Stage:', data);
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


  }

  const getProcessProgress = (process) => {
    const total = process.stageIds.length;
    const stages = [];
    for(var i = 0 ; i < total ; i++){
      stages.push(getStagesByID(process.stageIds[i]));
    }

    let done = 0;
    for(var j = 0 ; j < total ; j++){
      if(stages[j].completed){
        done+=1;
      }
    }
    return Math.trunc((done/total*100));
  }


  const increaseBaseTuples = () => {
    let newBase = base_tuples+5;
    if (newBase > Processes?.length) {
      newBase = Processes?.length;
    }
    setBase_tuples(newBase);
  }

  const decreaseBaseTuples = () => {
    let newBase = 5;
    if(Processes?.length < 5){
      newBase = Processes?.length;
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

    var done = percentage/100*process.stageIds.length;
    var total = process.stageIds.length;
    
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
          <div className='flex items-center justify-center rounded-full bg-pen p-2 drop-shadow-lg select-none hover:cursor-pointer' onClick={() => {changePage("addprocess")}}>
            <FaPlus color='#ffffff' size={12}/> <p className='ml-1 font-semibold text-white text-xs'>ADD PROCESS</p>
          </div>
        </div>

        {/* INJURY PATIENT_NAME PROGRESS OPEN */}
        <div className='flex items-center justify-start m-2 px-2 pb-2 border-b-2 border-sec'>

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
          
        </div>


        {/* PROCESSES */}
        {Processes?.map((process, index) => (
          index < base_tuples ?
          <div className='flex items-center justify-start m-2 p-2 bg-sec'>

            {/* INJURY NAME */}
            <div className='w-3/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{process.name}</p>
            </div>

            {/* PATIENT_NAME */}
            <div className='w-3/12 flex items-center justify-start'>
              <p className='font-semibold text-sm'>{process.patientId.firstname + " " + process.patientId.lastname}</p>
            </div>

            {/* PROGRESS */}
            <div className='w-3/12 flex items-center justify-start'>
              <div className='w-fit flex items-center justify-start bg-white drop-shadow-lg border border-2 rounded-full'>
                {progress(process)}
              </div>
              <p className='font-semibold text-sm ml-1'>{getProcessProgress(process)}%</p>
            </div>
          </div>
          :
          ""
        ))}

        {/* SEE ALL */}
        {
          Processes?.length < 5 ?
          <></>
          :
          base_tuples === Processes?.length ?
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