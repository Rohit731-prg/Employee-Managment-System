import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Store/UserContext';

function Employee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { empDetails, setEmpDetails, taskList, setTaskList } = useContext(UserContext);

  const compliteTask = (taskTitle) => {
    setTaskList((prev) => ({
      ...prev,
      [`employee${id}`]: prev[`employee${id}`].map((task) =>
        task.taskTitle === taskTitle
          ? { ...task, setStatus: 'Completed' }
          : task
      ),
    }));

    setEmpDetails((prev) =>
      prev.map((emp) =>
        String(emp.id) === id
          ? {
              ...emp,
              acttask: emp.acttask - 1,
              completedTask: emp.completedTask + 1,
            }
          : emp
      )
    );
  };

  const failedTask = (taskTitle) => {
    setTaskList((prev) => ({
      ...prev,
      [`employee${id}`]: prev[`employee${id}`].map((task) =>
        task.taskTitle === taskTitle
          ? { ...task, setStatus: 'Failed' }
          : task
      ),
    }));

    setEmpDetails((prev) =>
      prev.map((emp) =>
        String(emp.id) === id
          ? {
              ...emp,
              newTask: emp.newTask - 1,
              failed: emp.failed + 1,
            }
          : emp
      )
    );
  };

  const logOut = () => {
    setEmpDetails((prev) =>
      prev.map((emp) =>
        String(emp.id) === id
          ? { ...emp, newTask: 0 }
          : emp
      )
    );
    navigate('/');
  };

  return (
    <div className="w-full h-full bg-black px-20 py-10">
      <p className="text-white text-4xl font-semibold">Hello 👋</p>
      <div className="w-full h-auto flex flex-row justify-between mt-5 font-bold">
        <p className="text-white text-4xl ">
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
          { label: 'New Task', value: empDetails[id - 1].newTask, color: 'bg-blue-400' },
          { label: 'Active Task', value: empDetails[id - 1].acttask, color: 'bg-green-400' },
          { label: 'Completed Task', value: empDetails[id - 1].completedTask, color: 'bg-yellow-400' },
          { label: 'Failed Task', value: empDetails[id - 1].failed, color: 'bg-pink-400' },
        ].map((stat, index) => (
          <div key={index} className={`w-1/4 h-auto ${stat.color} rounded-lg p-10`}>
            <p className="mb-5 text-white text-4xl font-medium">{stat.value}</p>
            <p className="text-white text-2xl font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="w-full h-auto mt-40 flex flex-row overflow-x-auto gap-10 wrapper no-scrollbar">
        {taskList[`employee${id}`]?.map((task, index) => (
          <div key={index} className="w-[450px] h-[400px] p-10 rounded-lg bg-pink-400 flex flex-col">
            <div className="w-full h-auto flex flex-row justify-between mb-5">
              <p className="text-white font-medium p-2 bg-red-600 rounded-md">{task.category}</p>
              <p className="text-white font-normal">{task.taskDate}</p>
            </div>
            <p className="text-white font-semibold text-3xl">{task.taskTitle}</p>
            <p className="text-white font-medium text-2xl mt-5">{task.taskDesc}</p>
            <div className="w-full h-auto flex flex-row justify-between mt-10">
              {task.setStatus === 'Pending' ? (
                <>
                  <button
                    onClick={() => compliteTask(task.taskTitle)}
                    className="hover:shadow-myShadow bg-green-400 px-5 py-2 text-white font-medium rounded-md"
                  >
                    Mark as Complete
                  </button>
                  <button
                    onClick={() => failedTask(task.taskTitle)}
                    className="hover:shadow-myShadow bg-red-400 px-5 py-2 text-white font-medium rounded-md"
                  >
                    Mark as Failed
                  </button>
                </>
              ) : task.setStatus === 'Completed' ? (
                <p className="text-white font-medium">Completed</p>
              ) : (
                <p className="text-white font-medium">Failed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employee;
