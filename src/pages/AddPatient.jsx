import React, {useRef, useState } from 'react'

const AddPatient = () => {

    const firstname = useRef(null);
    const lastname = useRef(null);
    const email = useRef(null);
    const sex = useRef(null);
    const age = useRef(null);

    const [submitResult, setSubmitResult] = useState("");


    const handleSubmit = () => {
        if(firstname.current.value.trim() === '' || lastname.current.value.trim() === '' || email.current.value.trim() === '' || sex.current.value === '' || age.current.value === ''){
            setSubmitResult("Please fill all fields!");
        }else{ 
            if(!isValidEmail(email.current.value.trim())){
                setSubmitResult("Email not valid!");
                return;
            }
            
            fetch('http://localhost:8080/api/patient/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credential: {
                    email: 'admin@admin.com',
                    passwordHash: 'admin'
                    },
                    patient: {
                        email: email.current.value.trim(),
                        firstName: firstname.current.value.trim(),
                        lastName: lastname.current.value.trim(),
                        age: age.current.value,
                        sex: sex.current.value
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
                // console.log('Newly created patient:', data);
                setSubmitResult("Success!");
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });


        }
    }


    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }


  return (
    <div className='w-full min-h-full flex justify-center items-center p-2'>
        <div className='w-5/6 p-2 pr-8 bg-white rounded-lg drop-shadow-xl'>
            {/* TITLE AND ADD A PATIENT */}
            <div className='flex items-center justify-between border-b-2 border-sec p-2 m-2'>
                <p className='font-bold text-lg'>ADD PATIENTS</p>
            </div>
            
            {/* FORM */}
            <div className='flex items-center justify-between'>

                {/* LABELS */}
                <div className='flex-col w-1/2 p-2'>

                    {/* FIRST NAME */}
                    <div className='flex items-center justify-end'>
                        <p className='m-1 font-semibold'>First Name:</p>
                    </div>
                    
                    {/* LAST NAME */}
                    <div className='flex items-center justify-end'>
                        <p className='m-1 font-semibold'>Last Name:</p>
                    </div>
                    
                    {/* EMAIL */}
                    <div className='flex items-center justify-end'>
                        <p className='m-1 font-semibold'>Email:</p>
                    </div>
                    
                    {/* SEX */}
                    <div className='flex items-center justify-end'>
                        <p className='m-1 font-semibold'>Sex:</p>
                    </div>
                    
                    {/* AGE */}
                    <div className='flex items-center justify-end'>
                        <p className='m-1 font-semibold'>Age:</p>
                    </div>
                    
                    
                </div>

                {/* INPUTS */}
                <div className='flex-col w-1/2 p-2'>

                    {/* FIRST NAME */}
                    <div className='flex items-center justify-start'>
                        <input ref={firstname} className='m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* LAST NAME */}
                    <div className='flex items-center justify-start'>
                        <input ref={lastname} className='m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* EMAIL */}
                    <div className='flex items-center justify-start'>
                        <input ref={email} className='m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                    {/* SEX */}
                    <div className='flex items-center justify-start'>
                        <select ref={sex} className='border-2 border-tri m-1 rounded-lg focus:outline-tet'>
                            <option selected="selected" value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>
                    
                    {/* AGE */}
                    <div className='flex items-center justify-start'>
                        <input ref={age} type='number' className='m-1 border-2 border-tri rounded-lg focus:outline-tet px-1' />
                    </div>
                    
                </div>

            </div>
            
            {/* SUBMIT BUTTON */}

            <div className='flex justify-center items-center'>
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

export default AddPatient