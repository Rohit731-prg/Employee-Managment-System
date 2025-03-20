import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Employee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empDetails, setEmpDetails] = useState({});
  const [workList, setWorkList] = useState([]);

  // Fetch employee and task data
  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        axios.post("http://localhost:2525/user/getUserById", { id }),
        axios.post("http://localhost:2525/work/getWorkById", { id }),
      ]);

      if (res1.data.status && res2.data.status) {
        setEmpDetails(res1.data.data || {});
        setWorkList(res2.data.data || []);
      }
    } catch (error) {
      console.log("Error from fetchData: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mark task as complete
  const completeTask = async (taskTitle) => {
    try {
      await axios.post("http://localhost:2525/work/updateStatus", {
        id,
        taskTitle,
        status: "Completed",
      });
      fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // Mark task as failed
  const failedTask = async (taskTitle) => {
    try {
      await axios.post("http://localhost:2525/work/updateStatus", {
        id,
        taskTitle,
        status: "Failed",
      });
      fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // Log out function
  const logOut = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-full bg-black px-20 py-10">
      <p className="text-white text-4xl font-semibold">Hello 👋</p>

      {/* Employee Details Section */}
      <div className="w-full flex justify-between mt-5 font-bold">
        <p className="text-white text-4xl">{empDetails.empName || "Employee"}</p>
        <button
          onClick={logOut}
          className="px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none"
        >
          Log Out
        </button>
      </div>

      {/* Task Summary Cards */}
      <div className="w-full flex justify-between items-center mt-20 gap-5">
        {[
          { label: "New Task", value: empDetails.newTask || 0, color: "bg-blue-400" },
          { label: "Active Task", value: empDetails.activeTask || 0, color: "bg-green-400" },
          { label: "Completed Task", value: empDetails.completedTask || 0, color: "bg-yellow-400" },
          { label: "Failed Task", value: empDetails.failedTask || 0, color: "bg-pink-400" },
        ].map((stat, index) => (
          <div key={index} className={`w-1/4 h-auto ${stat.color} rounded-lg p-10`}>
            <p className="mb-5 text-white text-4xl font-medium">{stat.value}</p>
            <p className="text-white text-2xl font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Task List Section */}
      <div className="w-full h-auto mt-40 flex flex-row overflow-x-auto gap-10 wrapper no-scrollbar">
        {workList.map((task, index) => (
          <div key={index} className="w-[450px] h-[400px] p-10 rounded-lg bg-pink-400 flex flex-col">
            <div className="w-full flex justify-between mb-5">
              <p className="text-white font-medium p-2 bg-red-600 rounded-md">{task.category}</p>
              <p className="text-white font-normal">{task.taskDate}</p>
            </div>

            <p className="text-white font-semibold text-3xl">{task.title}</p>
            <p className="text-white font-medium text-2xl mt-5">{task.work}</p>

            <div className="w-full flex justify-between mt-10">
              {task.status === "pending" ? (
                <>
                  <button
                    onClick={() => completeTask(task.taskTitle)}
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
              ) : task.setStatus === "Completed" ? (
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
