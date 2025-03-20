import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empDetails, setEmpDetails] = useState({});
  const [workList, setWorkList] = useState([]);

  const logOut = () => {
    navigate('/');
  };

  const deleteTask = async (taskName) => {
    
  };

  const failedTask = async (taskName) => {
    
  };

  const fetchData = async () => {
    try {
      const [userRes, workRes] = await Promise.all([
        axios.post('http://localhost:2525/user/getUserById', { id }),
        axios.post('http://localhost:2525/work/getWorkById', { id }),
      ]);

      if (userRes.data.status && workRes.data.status) {
        setEmpDetails(userRes.data.data || {});
        setWorkList(workRes.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-auto bg-black px-20 py-10">
      <p className="text-white text-4xl font-semibold">Welcome to Employee Details</p>
      
      {/* Employee Header */}
      <div className="w-full flex justify-between mt-5 font-bold">
        <p className="text-white text-4xl">{empDetails.empName || 'Loading...'}</p>
        <button
          onClick={logOut}
          className="px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium"
        >
          Log Out
        </button>
      </div>

      {/* Employee Task Stats */}
      <div className="w-full flex justify-between items-center mt-20 gap-5">
        {[
          { label: 'New Task', value: empDetails.newTask, color: 'bg-blue-400' },
          { label: 'Active Task', value: empDetails.activeTask, color: 'bg-green-400' },
          { label: 'Completed Task', value: empDetails.completedTask, color: 'bg-yellow-400' },
          { label: 'Failed Task', value: empDetails.failedTask, color: 'bg-pink-400' },
        ].map((stat, index) => (
          <div key={index} className={`w-1/4 h-auto ${stat.color} rounded-lg p-10`}>
            <p className="mb-5 text-white text-4xl font-medium">{stat.value || 0}</p>
            <p className="text-white text-2xl font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div className="w-full mt-40 flex overflow-x-auto gap-10 wrapper no-scrollbar">
        {workList.length === 0 ? (
          <p className="text-white text-xl">No tasks available</p>
        ) : (
          workList.map((task, index) => (
            <div key={index} className="w-[400px] h-[400px] p-10 rounded-lg bg-pink-400 flex flex-col">
              {/* Task Header */}
              <div className="flex justify-between mb-5">
                <p className="text-white font-medium p-2 bg-red-600 rounded-md">{task.category}</p>
                <p className="text-white font-normal">{task.taskDate}</p>
              </div>

              {/* Task Details */}
              <p className="text-white font-semibold text-3xl">{task.title}</p>
              <p className="w-full text-white font-medium text-2xl mt-5">{task.work}</p>

              {/* Task Status & Actions */}
              <div className="flex justify-between mt-10">
                {task.status === 'pending' ? (
                  <p className='text-white text-xl'>Working on this task</p>
                ) : task.status === 'Completed' ? (
                  <>
                    <p className="text-white font-medium">Completed</p>
                    <button
                      className="px-5 py-3 rounded-lg bg-red-500 text-white text-xl font-medium"
                      onClick={() => deleteTask(task.taskTitle)}
                    >
                      Delete Task
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-white text-xl font-medium">Failed</p>
                    <button
                      onClick={() => failedTask(task.taskTitle)}
                      className="px-5 py-3 rounded-lg bg-red-500 text-white text-xl font-medium"
                    >
                      Delete Task
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;
