import React from 'react'
import logo from '../imgs/logo_gl.png';
import photo from '../imgs/pfp.png';
import { PiMonitorBold } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { GoPeople } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { useNavigate } from 'react-router-dom'




const Layout = ({ children, page, changePage, User}) => {

    
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem("user");
        navigate("/");
    }


    


  return (
    <div className='h-screen'>
        <div className='h-full w-full'>
            {/* Upper Navbar */}
            <div className='bg-pri h-[12%] drop-shadow-lg flex items-center justify-between'>
                <div className='w-[20%]'>
                    <img src={logo} alt='logo' className='h-[50%] w-[50%] mx-6'/>
                </div>
                <div className='p-2 m-2 flex items-center justify-center h-fit rounded-lg bg-pen text-white font-bold select-none hover:cursor-pointer' onClick={() => { handleLogOut() }}>
                    <p>Log Out</p>
                </div>
            </div>

            {/* Body */}
            <div className='h-[88%] flex'>

                {/* Side Navbar */}
                <div className='w-[20%]'>

                    <div className='flex flex-col items-center mt-4 mb-4'>
                        <img src={photo} alt='pfp' className='rounded-full w-[45%] drop-shadow-lg'/>
                        <p className='font-bold text-xl mt-2'>{User?.firstName + " " + User?.lastName}</p>
                        <p className='font-semibold text-center text-sm text-tri mt-1'>{User?.position}</p>
                    </div>

                    <div className='h-fit overflow-auto select-none'>

                        <div className={page === 'dashboard' ? 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tet bg-sec' :
                        page === 'addprocess' ? 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tet bg-sec'
                         : 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tri hover:bg-sec hover:cursor-pointer'} onClick={() => changePage('dashboard')}>
                            <div className='flex items-center'>
                                <PiMonitorBold className='mx-1' size={15} color={page === 'dashboard' ? '#4680ff' : page === 'addprocess' ? '#4680ff' : '#5c5c5c'}/>
                                <p className='font-semibold text-sm'>Dashboard</p>
                            </div>
                                <IoIosArrowForward className='mx-1' size={15} color={page === 'dashboard' ? '#4680ff' : page === 'addprocess' ? '#4680ff' : '#5c5c5c'}/>
                        </div>

                        <div className={page === 'patients'? 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tet bg-sec' : 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tri hover:bg-sec hover:cursor-pointer'} onClick={() => changePage('patients')}>
                            <div className='flex items-center'>
                                <GoPeople className='mx-1' size={15} color={page === 'patients' ? '#4680ff' : '#5c5c5c'}/>
                                <p className='font-semibold text-sm'>Patients</p>
                            </div>
                                <IoIosArrowForward className='mx-1' size={15} color={page === 'patients' ? '#4680ff' : '#5c5c5c'}/>
                        </div>
                        
                        <div className={page === 'staff'? 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tet bg-sec' : 'mx-4 flex justify-between items-center px-2 py-3 rounded-lg text-tri hover:bg-sec hover:cursor-pointer'} onClick={() => changePage('staff')}>
                            <div className='flex items-center'>
                                <GoPerson className='mx-1' size={15} color={page === 'staff' ? '#4680ff' : '#5c5c5c'}/>
                                <p className='font-semibold text-sm'>Staff</p>
                            </div>
                                <IoIosArrowForward className='mx-1' size={15} color={page === 'staff' ? '#4680ff' : '#5c5c5c'}/>
                        </div>


                    </div>

                    
                    

                </div>

                {/* Children / page content */}
                <div className='w-[80%] h-full bg-sec overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout