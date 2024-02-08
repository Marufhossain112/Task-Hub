/* eslint-disable react/prop-types */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PROTOCOL_HOST } from "../../utils/url";
import toast from "react-hot-toast";

const EditTask = ({ editTask, updateTasks }) => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [priority, setPriority] = useState("Set priority");
    const [status, setStatus] = useState("");
    const handleStatusUpdate = (selectedStatus) => {
        setStatus(selectedStatus);
    };
    const handlePrioritySelect = (selectedPriority) => {
        setPriority(selectedPriority);
    };
    const onSubmit = (data) => {
        const editableData = { ...data, priority, status };
        if (editableData.title === "") {
            editableData.title = editTask.title;
        }
        if (editableData.priority === 'Set priority') {
            editableData.priority = editTask.priority;
        }
        if (editableData.status === "") {
            editableData.status = editTask.status;
        }

        fetch(`${PROTOCOL_HOST}/task/update-task/${editTask?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editableData)
        })
            .then(response => {
                updateTasks(editTask?._id, editableData);
                if (response.ok) {
                    toast.success('Task updated successfully');
                }
            })
            .catch(error => {
                console.log("🚀 error", error);
            });
    };
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="task-title" className="col-form-label">Title</label>
                                    <input type="text" className="form-control" id="task-title" defaultValue={editTask?.title}  {...register("title")} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex gap-2 align-items-center">
                                        <div>
                                            Set priority
                                        </div>
                                        <div className="dropdown dropend">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {priority === 'Set priority' ? editTask?.priority : priority}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className={`dropdown-item ${editTask?.priority === 'Low' && 'disabled'}`} onClick={() => handlePrioritySelect("Low")}>Low</a></li>
                                                <li><a className={`dropdown-item ${editTask?.priority === 'Medium' && 'disabled'}`} onClick={() => handlePrioritySelect("Medium")}>Medium</a></li>
                                                <li><a className={`dropdown-item ${editTask?.priority === 'High' && 'disabled'}`} onClick={() => handlePrioritySelect("High")}>High</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex gap-2 align-items-center">
                                        <div>
                                            Set status
                                        </div>
                                        <div className="dropdown dropend">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {status === '' ? editTask.status : status}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className={`dropdown-item ${editTask?.status === 'Completed' && 'disabled'}`} onClick={() => handleStatusUpdate("Completed")}>Completed</a></li>
                                                <li><a className={`dropdown-item ${editTask?.status === 'Not Completed' && 'disabled'}`} onClick={() => handleStatusUpdate("Not Completed")}>Not Completed</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;