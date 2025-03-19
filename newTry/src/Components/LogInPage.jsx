import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Store/UserContext';

function LogInPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {empDetails} = useContext(UserContext);

    const logInEmployee = () => {
        if (userName !== '' && password !== '') {
            if (userName === 'Admin' && password === 'admin') {
                navigate('/admin');
            } else {
                const employee = empDetails.find(
                    (details) => details.username === userName && details.password === password
                );
                if (employee) {
                    navigate(`/employee/${employee.id}`);
                } else {
                    alert('Invalid username or password!');
                }
            }
        } else {
            alert('Please enter both username and password!');
        }
    };
    
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='w-[30%] h-auto flex flex-col gap-10 p-14 border-2 border-green-500 rounded-xl'>
            <input type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Enter User Name'
            className='px-3 py-3 rounded-full border-none outline-none' 
            />
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            className='px-3 py-3 rounded-full border-none outline-none' 
            />
            <button
            onClick={logInEmployee}
            className='text-white bg-green-500 py-3 rounded-full text-2xl font-medium'
            >Log In</button>
            <button
            className='text-green-500'
            onClick={() => navigate('/addEmployee')}
            >Sign Up</button>
        </div>
    </div>
  )
}

export default LogInPage