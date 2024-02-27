import React, { useState } from 'react'
import { useRef } from 'react';
import { FaPlus } from "react-icons/fa6";

const AddProcess = () => {

  
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const name = useRef(null);
  const staff = useRef(null);
  const stageName = useRef(null);
  const stageStaff = useRef(null);

  const [addStage, setAddStage] = useState(false);
  const [stages, setStages] = useState([]);
  const [submitResult, setSubmitResult] = useState("");
  const [processId, setProcessId] = useState(-1);


  const handleStageBool = () => {
    const x = !addStage;
    setAddStage(x);
  }

  const handleSubmit = () => {
    if(firstname.current.value.trim() === '' || lastname.current.value.trim() === '' || email.current.value.trim() === '' || age.current.value === '' || name.current.value === '' || staff.current.value === ''){
      setSubmitResult("Please fill all fields!");
    }else{ 

      const emails = email.current.value.trim().split(" ");
      console.log(emails)


      fetch('http://localhost:8080/api/process/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            credential: {
                email: 'admin@admin.com',
                passwordHash: 'admin'
            },
            process: {
              name: name.current.value.trim(),
              staffEmails: emails,
              patientId: {
                firstName: firstname.current.value.trim(),
                lastName: lastname.current.value.trim(),
                email: email.current.value.trim(),
                age: age.current.value.trim()
              },
              stageIds: []
            }
        })
    })
    .then(response => {
        if (!response.ok) {
          setSubmitResult("Network response was not ok!");
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log('Newly created process:', data);
        setSubmitResult("Success!");
        stages?.map((stage) => (
          postStages(stage)
        ));
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSubmitResult("There was a problem with the fetch operation!");
    });



    }
  }

  const postStages = (stage) => {

    fetch('http://localhost:8080/api/process/getAll', {
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
        // console.log('Processes:', data);
        const paid = {
          firstName: firstname.current.value.trim(),
          lastName: lastname.current.value.trim(),
          email: email.current.value.trim(),
          age: age.current.value.trim()
        }
        data.map((p) => {
          if(p.name === name.current.value.trim() && p.patientId === paid){
            setProcessId(p.id);
          }
      });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    fetch('http://localhost:8080/api/stage/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            credential: {
                email: 'admin@admin.com',
                passwordHash: 'admin'
            },
            stage: {
              name: stage.name,
              completed: stage.completed,
              staffEmail: stage.staffEmail,
              processId: processId
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Newly created stage:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

  }

  const handleAddStage = () => {

    if(stageName.current.value.trim() === "" || stageStaff.current.value.trim() === ""){
      setSubmitResult("Please fill all fields of the stage!");
      return;
    }


    const s = {name: stageName.current.value.trim(), completed: false, staffEmail: stageStaff.current.value.trim()}
    const a = stages;
    a.push(s);
    setStages(a);
    handleStageBool();
  }



  return (
    <div className='w-full min-h-full flex justify-center items-center p-2 select-none'>
        <div className='w-5/6 p-2 pr-8 bg-white rounded-lg drop-shadow-xl'>
          {/* TITLE AND ADD A PATIENT */}
          <div className='flex items-center justify-between border-b-2 border-sec p-2 m-2'>
              <p className='font-bold text-lg'>ADD PROCESS</p>
          </div>
          
          <div className='flex border-b-2 border-sec'>
            <div className='w-1/2'>
              
              {/* FORM */}
              <div className='flex items-center justify-between p-2'>

                {/* LABELS */}
                <div className='flex-col w-1/2 p-2'>

                  {/* NAME */}
                  <div className='flex items-center justify-end'>
                    <p className='m-1 font-semibold'>Name:</p>
                  </div>
                  
                  {/* ASSIGNED STAFF */}
                  <div className='flex items-center justify-end'>
                    <p className='m-1 font-semibold'>Assigned Staff:</p>
                  </div>

                  {/* STAGES */}
                  <div className='flex items-center justify-end'>
                    <p className='m-1 font-semibold'>Stages:</p>
                  </div>


                </div>

                {/* INPUTS */}
                <div className='flex-col w-1/2 p-2'>

                  {/* NAME */}
                  <div className='flex items-center justify-start'>
                    <input ref={name} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                  </div>

                  {/* ASSIGNED STAFF */}
                  <div className='flex items-center justify-start'>
                    <input ref={staff} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                  </div>

                  {/* STAGES */}
                  <div className='flex items-center justify-start'>
                    <div className='flex items-center justify-center rounded-full bg-tet p-2 drop-shadow-lg select-none hover:cursor-pointer' onClick={() => {handleStageBool()}}>
                      <FaPlus color='#ffffff' size={12}/> <p className='ml-1 font-semibold text-white text-xs'>ADD STAGE</p>
                    </div>
                  </div>

                </div>

              </div>

              <div className='flex justify-center'>
                {/* CURRENT STAGES */}
              {
                      stages?.map((stage, index) => (
                        
                        <div className='flex items-center justify-center rounded-full w-fit bg-tet p-2 m-1 drop-shadow-lg select-none'>
                          <p className='font-semibold text-white text-xs'>{stage.name}</p>
                        </div>

                      ))
                  }
              </div>

              

              {/* ADD STAGE FORM */}
              <div className={addStage ? "flex-col items-center justify-between p-2" : "hidden" }>

                <div className='flex items-center justify-center border-t-2 border-sec p-2 m-2'>
                  <p className='font-semibold text-md text-tet'>ADD STAGE</p>
                </div>

                <div className='flex items-center justify-between'>


                  {/* LABELS */}
                  <div className='flex-col w-1/2 p-2'>

                    {/* NAME */}
                    <div className='flex items-center justify-end'>
                      <p className='m-1 font-semibold'>Name:</p>
                    </div>
                    
                    {/* ASSIGNED STAFF */}
                    <div className='flex items-center justify-end'>
                      <p className='m-1 font-semibold'>Assigned Staff:</p>
                    </div>
                    


                  </div>

                  {/* INPUTS */}
                  <div className='flex-col w-1/2 p-2'>

                    {/* NAME */}
                    <div className='flex items-center justify-start'>
                      <input ref={stageName} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>

                    {/* ASSIGNED STAFF */}
                    <div className='flex items-center justify-start'>
                      <input ref={stageStaff} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>


                  </div>

                </div>

                {/* STAGE SUBMIT BUTTON */}

                <div className='flex justify-center items-center m-2'>
                    <p className='px-2 py-1 bg-pen rounded-full text-pri font-bold hover:cursor-pointer select-none hover:shadow-xl' onClick={() => {handleAddStage()}}>SUBMIT STAGE</p>
                </div>

              </div>

            </div>
            
            {/* PATIENT ID */}
            <div className='w-1/2 border border-tet border-2 rounded-lg h-fit p-2'>

              <div className='boder-tet border-b-1'>
                <p className='text-tet font-bold'>Add Assigned Patient</p>
              </div>

              {/* FORM */}
              <div className='flex items-center justify-between p-2'>

                {/* LABELS */}
                  <div className='flex-col w-1/2 p-2'>

                    {/* FIRST NAME */}
                    <div className='flex items-center justify-start'>
                        <p className='m-1 font-semibold'>First Name:</p>
                    </div>
                    
                    {/* LAST NAME */}
                    <div className='flex items-center justify-start'>
                        <p className='m-1 font-semibold'>Last Name:</p>
                    </div>
                    
                    {/* EMAIL */}
                    <div className='flex items-center justify-start'>
                        <p className='m-1 font-semibold'>Email:</p>
                    </div>
                    
                    {/* AGE */}
                    <div className='flex items-center justify-start'>
                        <p className='m-1 font-semibold'>Age:</p>
                    </div>
                    
                    
                  </div>

                {/* INPUTS */}
                  <div className='flex-col w-1/2 p-2'>

                    {/* FIRST NAME */}
                    <div className='flex items-center justify-start'>
                        <input ref={firstname} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* LAST NAME */}
                    <div className='flex items-center justify-start'>
                        <input ref={lastname} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* EMAIL */}
                    <div className='flex items-center justify-start'>
                        <input ref={email} className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* AGE */}
                    <div className='flex items-center justify-start'>
                        <input ref={age} type='number' className='w-3/4 m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                  
                  </div>
                </div>
            </div>
        </div>

        {/* SUBMIT BUTTON */}

        <div className='flex justify-center items-center m-2'>
            <p className='px-2 py-1 bg-tet rounded-full text-pri font-bold hover:cursor-pointer select-none hover:shadow-xl' onClick={() => {handleSubmit()}}>SUBMIT</p>
        </div>

        {/* SUBMIT MESSAGE */}
        <div className={submitResult === "" ? 'hidden' : 'flex items-center justify-center border-t-2 border-sec p-2 m-2'}>
            <p className={submitResult === "Success!" ? 'text-green-500 font-bold text-lg' : 'text-red-600 font-bold text-lg'}>{submitResult}</p>
        </div>
      </div>
    </div>
  )
}

export default AddProcess