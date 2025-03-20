import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogInPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const adminDetails = {
        userName: 'admin',
        password: 'admin'
    }

    const logInEmployee = async () => {
      const userDetails = {
        username: userName,
        password: password
      }
      console.log(userDetails);
      try {
        const res = await axios.post('http://localhost:2525/user/login', userDetails);
        if(res.data.status == true){
          console.log(res.data.data._id)
          navigate(`/employee/${res.data.data._id}`);
        } else if (res.status == false){
          alert('User Not Found');
        } else if (userName == '' || password == '') {
          alert('Fill the form');
        } else if (userName == adminDetails.userName && password == adminDetails.password) {
          navigate('/admin');
        }
      } catch (error) {
        console.log(error);
      }

      
    };
    
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='w-[30%] h-auto flex flex-col gap-10 p-14 border-2 border-green-500 rounded-xl'>
            <input type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Enter User Name'
            className='px-5 py-3 rounded-full border-none outline-none' 
            />
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            className='px-5 py-3 rounded-full border-none outline-none' 
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