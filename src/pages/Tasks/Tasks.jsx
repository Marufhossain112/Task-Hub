import { useFetch } from "../../hooks/useFetch";
import { PROTOCOL_HOST } from "../../utils/url";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { data, loading } = useFetch(`${PROTOCOL_HOST}/task/all-tasks`);
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
    if (loading) {
        return (
            <Loader />
        );
    }
    // console.log("🚀 is Data got", data);
    return (
        <>
            <h3 className="text-center mt-4">All tasks</h3>
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
                                    <td className={`${table?.priority === 'High' ? 'text-danger' : table?.priority === 'Low' ? 'text-success' : table?.priority === 'Medium' ? 'text-primary' : ""} `}>{table?.priority}</td>
                                    <td>{table?.status}</td>
                                    <td onClick={() => handleCompleted(table?._id)}>
                                        {
                                            table?.status === 'Not Completed' && <FaCheck />
                                        }
                                    </td>
                                    <td ><BsPencilSquare /></td>
                                    <td><AiOutlineDelete /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default Tasks;