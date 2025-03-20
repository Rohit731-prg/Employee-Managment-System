import { useNavigate, useParams } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams(); // Destructure 'id' directly from useParams()
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/');
  };

  const deleteTask = (taskName) => {
    const updatedList = taskList[`employee${id}`].filter(
      (task) => task.taskTitle !== taskName
    );
    setTaskList((prev) => ({
      ...prev,
      [`employee${id}`]: updatedList,
    }));
    setEmpDetails((prev) =>
      prev.map((emp) =>
        String(emp.id) === id
          ? {
              ...emp,
              completedTask: emp.completedTask - 1
            }
          : emp
      )
    );
  };

  const failedTask = (taskName) => {
    const updatedList = taskList[`employee${id}`].filter(
      (task) => task.taskTitle !== taskName
    );
    setTaskList((prev) => ({
      ...prev,
      [`employee${id}`]: updatedList,
    }));
    setEmpDetails((prev) =>
      prev.map((emp) =>
        String(emp.id) === id
          ? {
              ...emp,
              failed: emp.failed - 1
            }
          : emp
      )
    );
  }

  return (
    <div className="w-full h-auto bg-black px-20 py-10">
      <p className="text-white text-4xl font-semibold">Welcome to Employee Details</p>
      <div className="w-full h-auto flex flex-row justify-between mt-5 font-bold">
        <p className="text-white text-4xl">
          {empDetails.map((name) => name.id === Number(id) && name.empName)}
        </p>
        <button
          onClick={logOut}
          className="px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none"
        >
          Log Out
        </button>
      </div>
      <div className="w-full h-auto flex flex-row justify-between items-center mt-20 gap-5">
        {[
          { label: 'New Task', value: empDetails[Number(id) - 1]?.newTask || 0, color: 'bg-blue-400' },
          { label: 'Active Task', value: empDetails[Number(id) - 1]?.acttask || 0, color: 'bg-green-400' },
          { label: 'Completed Task', value: empDetails[Number(id) - 1]?.completedTask || 0, color: 'bg-yellow-400' },
          { label: 'Failed Task', value: empDetails[Number(id) - 1]?.failed || 0, color: 'bg-pink-400' },
        ].map((stat, index) => (
          <div key={index} className={`w-1/4 h-auto ${stat.color} rounded-lg p-10`}>
            <p className="mb-5 text-white text-4xl font-medium">{stat.value}</p>
            <p className="text-white text-2xl font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="w-full h-auto mt-40 flex flex-row overflow-x-auto gap-10 wrapper no-scrollbar">
        {taskList[`employee${id}`]?.map((task, index) => (
          <div key={index} className="w-[400px] h-[400px] p-10 rounded-lg bg-pink-400 flex flex-col">
            <div className="w-full h-auto flex flex-row justify-between mb-5">
              <p className="text-white font-medium p-2 bg-red-600 rounded-md">{task.category}</p>
              <p className="text-white font-normal">{task.taskDate}</p>
            </div>
            <p className="text-white font-semibold text-3xl">{task.taskTitle}</p>
            <p className="w-full text-white font-medium text-2xl mt-5">{task.taskDesc}</p>
            <div className="w-full h-auto flex flex-row justify-between mt-10">
              {task.setStatus === 'Pending' ? (
                <>
                  <p className='text-white text-xl'>Working on this task</p>
                </>
              ) : task.setStatus === 'Completed' ? (
                <>
                  <p className="text-white font-medium">Completed</p>
                  <button
                  className='px-5 py-3 rounded-lg bg-red-500 text-white text-xl font-medium border-none outline-none' 
                  onClick={() => deleteTask(task.taskTitle)}>Delete Task</button>
                </>
              ) : (
                <>
                  <p className="text-white text-xl font-medium">Failed</p>
                  <button
                  onClick={() => failedTask(task.taskTitle)}
                  className='px-5 py-3 rounded-lg bg-red-500 text-white text-xl font-medium border-none outline-none'
                  >Delete Task</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDetails;
