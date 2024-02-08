import { useFetch } from "../../hooks/useFetch";
import { PROTOCOL_HOST } from "../../utils/url";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import EditTask from "../../Components/EditTask/EditTask";
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("");
    const [editTask, setEditTask] = useState({});
    const { data, loading } = useFetch(`${PROTOCOL_HOST}/task/all-tasks?priority=${filter}`);
    useEffect(() => {
        if (!loading) {
            setTasks(data);
        }
    }, [data, loading]);
    const handleCompleted = (taskId) => {
        console.log("🚀 task id", taskId);
        const updateData = { status: 'Completed' };
        fetch(`${PROTOCOL_HOST}/task/update-task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        })
            .then(response => {
                if (response.ok) {
                    const updatedTasks = tasks.map(task => {
                        if (task._id === taskId) {
                            return { ...task, status: 'Completed' };
                        }
                        return task;
                    });
                    setTasks(updatedTasks);
                    toast.success('Task completed successfully');
                }
            })
            .catch(error => {
                console.log("🚀 error", error);
            });
    };
    const handleDelete = (taskId) => {
        fetch(`${PROTOCOL_HOST}/task/delete-task/${taskId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    const updatedTasks = tasks.filter(task => task._id !== taskId);
                    setTasks(updatedTasks);
                    toast.success('Task deleted successfully');
                }
            })
            .catch(error => {
                console.log("🚀 error", error);
            });
    };

    const updateTasks = (taskId, updatedData) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const completedTasks = tasks.filter((task) => (
        task.status === 'Completed'
    ));


    if (loading) {
        return (
            <Loader />
        );
    }
    // console.log("🚀 is Data got", data);
    return (
        <>
            <h3 className="text-center mt-4">All tasks</h3>
            <div className="container d-flex justify-content-between">
                <div className="d-flex flex-column  mb-3" >
                    <span>Total tasks : {tasks.length}</span>
                    <span>Completed tasks : {completedTasks.length}</span>
                </div>
                <div className="d-flex gap-2">
                    <span className="fw-bold">
                        Priority :
                    </span>
                    <div className="d-flex gap-2">
                        <span className="text-success" onClick={() => setFilter("Low")}>Low</span>
                        <span className="text-primary" onClick={() => setFilter("Medium")}>Medium</span>
                        <span className="text-danger" onClick={() => setFilter("High")}>High</span>
                    </div>
                </div>

            </div>
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Mark as complete</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks?.map((table, index) => (
                                <tr className="text-center" key={table?._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{table?.title}</td>
                                    <td className={`${table?.priority === 'High' ? 'text-danger' :
                                        table?.priority === 'Low' ? 'text-success' :
                                            table?.priority === 'Medium' ? 'text-primary' : ""} `}>{table?.priority}</td>
                                    <td>{table?.status}</td>
                                    <td onClick={() => handleCompleted(table?._id)}>
                                        {
                                            table?.status === 'Not Completed' && <FaCheck />
                                        }
                                    </td>
                                    <td type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setEditTask(table)}><BsPencilSquare /></td>
                                    <td onClick={() => handleDelete(table?._id)}><AiOutlineDelete /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >

            <EditTask editTask={editTask} updateTasks={updateTasks} />
        </>
    );
};

export default Tasks;