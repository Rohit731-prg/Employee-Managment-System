import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Store/UserContext';

function AddEmployee() {
    const navigate = useNavigate();
    const [id, setID] = useState(4);
    const [empName, setEmpName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { empDetails, setEmpDetails, taskList, setTaskList } = useContext(UserContext);

    const createID = {
        id: id,
        empName: empName,
        username: userName,
        password: password,
        newTask: 0,
        acttask: 0,
        completedTask: 0,
        failed: 0
    };

    const createNewID = () => {
        if (empName !== '' && userName !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                setEmpDetails((prev) => [...prev, createID]);
                setTaskList((prev) => ({ ...prev, [`employee${id}`]: [] }));
                setID((prev) => prev + 1); // Increment ID properly
                alert('Employee Added Successfully');
                setEmpName('');
                setUserName('');
                setPassword('');
                setConfirmPassword('');
            } else {
                alert('Passwords do not match');
            }
        } else {
            alert('Please fill all the fields');
        }
    };

    return (
        <div className='w-full h-screen bg-black px-10 py-10 relative'>
            <p className='text-4xl text-white font-bold'>Add Employee</p>
            <div className='w-full h-auto flex flex-row justify-between gap-5 mt-10'>
                <p className='text-2xl text-white font-medium'>Welcome, Please Fill the Info</p>
                <button
                    className='px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none'
                    onClick={() => navigate('/')}
                >
                    Logout
                </button>
            </div>
            <div className='flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[30%] rounded-lg border-2 border-green-500 px-10 py-3'>
                <p className='text-white text-sm ml-3 mb-[4px]'>Employee Name</p>
                <input
                    value={empName}
                    placeholder='Enter Employee Name'
                    className='w-full h-10 rounded-full px-5 mb-4 border-none outline-none'
                    onChange={(e) => setEmpName(e.target.value)}
                    type="text"
                />
                <p className='text-white text-sm ml-3 mb-[4px]'>Employee Username</p>
                <input
                    value={userName}
                    placeholder='Enter Employee Username'
                    className='w-full h-10 rounded-full px-5 mb-4 border-none outline-none'
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                />
                <p className='text-white text-sm ml-3 mb-[4px]'>Employee Password</p>
                <input
                    value={password}
                    placeholder='Enter Employee Password'
                    className='w-full h-10 rounded-full px-5 mb-4 border-none outline-none'
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <p className='text-white text-sm ml-3 mb-[4px]'>Confirm Password</p>
                <input
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    className='w-full h-10 rounded-full px-5 mb-4 border-none outline-none'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                />
                <button
                    className='bg-green-500 text-white rounded-full py-3 text-2xl mt-2'
                    onClick={createNewID}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddEmployee;
