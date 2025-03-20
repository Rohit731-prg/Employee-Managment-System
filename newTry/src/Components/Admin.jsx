import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Admin() {
    const navigate = useNavigate();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignTo, setAssignTo] = useState('');

    const [allUser, setAllUser] = useState([]);

    const createTask = async () => {
        const newTask = {
            title: taskTitle,
            date: taskDate,
            assignTo: assignTo,
            category: category,
            work: taskDesc,
        }

        try {
            const res = await axios.post('http://localhost:2525/work/insert', newTask);
            if(res.data.status == true){
                alert('Task Created Successfully');
            } else {
                alert('Task Not Created');
            }
        } catch (error) {
            console.log('Error from createTask: ', error);
        }
    };

    const fetAllUser = async () => {
        try {
            const res = await axios.get('http://localhost:2525/user/getAllUser');
            const updatedAllUser = res.data.data;
            setAllUser(updatedAllUser);
            console.log(updatedAllUser);

        } catch (error) {
            console.log("Error from fetAllUser: ", error);
        }
    }

    useEffect(() => {
        fetAllUser();
    }, [])
    
  return (
    <div className='w-full h-full bg-black px-20 py-10'>
        <p className='text-white text-4xl font-semibold'>Hellow 👋</p>
        <div className='w-full h-auto flex flex-row justify-between mt-5 font-bold'>
            <p className='text-white text-4xl '>Admin</p>                
            <button
            onClick={() => navigate('/')}
            className='px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none'
            >Log Out</button>
        </div>
        <div className='w-full h-auto bg-[#474747] py-10 rounded-xl my-10 flex flex-row justify-center items-center gap-20'>
            <div className='w-[40%] h-full'>
                <p className='text-white text-2xl font-medium my-2'>Task Title</p>
                <input type="text" 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder='Enter Task Title'
                className='w-full text-white h-11 rounded-lg px-5 border-2 border-white bg-transparent outline-none'/>
                <p className='text-white text-2xl font-medium my-2'>Date</p>
                <input type="date" 
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className='w-full text-white h-11 rounded-lg px-5 border-2 border-white bg-transparent outline-none'/>
                <p className='text-white text-2xl font-medium my-2'>Asign To</p>
                <select 
                onChange={(e) => setAssignTo(e.target.value)}
                className='w-full text-white h-11 rounded-lg px-5 border-2 border-white bg-transparent outline-none'>
                    <option className='bg-black' value="">Select Employee Name</option>
                    {allUser.map((emp, index) => (
                        <option className='bg-black' key={index} value={emp._id}>{emp.empName}</option>
                    ))}
                </select>
                <p className='text-white text-2xl font-medium my-2'>Category</p>
                <input type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter Category'
                className='w-full text-white h-11 rounded-lg px-5 border-2 border-white bg-transparent outline-none'/>
            </div>
            <div className='w-[40%] h-full flex flex-col'>
                <p
                className='text-white text-2xl font-medium my-2'
                >Description</p>
                <textarea 
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                className='w-full text-white h-56 rounded-lg px-5 border-2 border-white bg-transparent outline-none'
                />
                <button
                onClick={() => createTask()}
                className='py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none mt-2'
                >Create Task</button>
            </div>
        </div>
        <div className='w-full h-auto bg-[#474747] py-10 rounded-xl my-10 flex flex-col gap-5 px-5'>
            <div className='w-full h-auto px-5 bg-orange-500 flex flex-row justify-between py-2 rounded-lg'>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>Employee Name</p>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>New Task</p>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>Active Task</p>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>Complite</p>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>Failed</p>
                <p className='w-1/6 text-2xl text-center font-medium text-white'>Action</p>
            </div>
            {allUser.map((emp, idx) => (
                <div
                key={idx}
                className='w-full h-auto flex flex-row justify-between py-2 px-2'>
                    <p className='w-1/6 text-start text-2xl font-medium text-white'>{emp.empName}</p>
                    <p className='w-1/6 text-center text-2xl font-medium text-white'>{emp.newTask}</p>
                    <p className='w-1/6 text-center text-2xl font-medium text-white'>{emp.acttask}</p>
                    <p className='w-1/6 text-center text-2xl font-medium text-white'>{emp.completedTask}</p>
                    <p className='w-1/6 text-center text-2xl font-medium text-white'>{emp.failed}</p>
                    <button
                    onClick={() => navigate(`/employeeDetails/${emp._id}`)}
                    className='w-1/6 text-center text-xl font-medium text-white border-2 border-white py-2 rounded-lg'>Details</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Admin