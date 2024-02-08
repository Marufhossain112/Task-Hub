import { useState } from "react";
import "./CreateTask.css";
import { useForm } from "react-hook-form";
import { PROTOCOL_HOST } from "../../utils/url";
import toast from "react-hot-toast";
const CreateTask = () => {
    const [priority, setPriority] = useState("Set priority");
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handlePrioritySelect = (selectedPriority) => {
        setPriority(selectedPriority);
    };
    const onSubmit = (data) => {
        if (priority === 'Set priority') {
            alert("Please set a priority");
            return;
        }
        const taskData = { ...data, priority };
        fetch(`${PROTOCOL_HOST}/task/create-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then(response => {
                // console.log("🚀 response", response);
                if (response.ok) {
                    reset();
                    setPriority("Set priority");
                    toast.success('Task created successfully');
                }
            })
            .catch(error => {
                console.log("🚀 error", error);
            });
    };
    return (
        <>
         

            <h3 className="text-center mt-5">Create task</h3>
            <div className="container create-task-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="taskTitle" aria-describedby="titleHelp" placeholder="Give a title of the task"
                            {...register("title", { required: "Please give a title" })}
                        />
                    </div>
                    {errors.title && (
                        <p className="text-danger">
                            {errors.title.message}
                        </p>
                    )}
                    {/* title ends*/}

                    {/* Priority */}
                    <div className="dropdown dropend">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {priority}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handlePrioritySelect("Low")}>Low</a></li>
                            <li><a className="dropdown-item" onClick={() => handlePrioritySelect("Medium")}>Medium</a></li>
                            <li><a className="dropdown-item" onClick={() => handlePrioritySelect("High")}>High</a></li>
                        </ul>
                    </div>

                    {/* Priority ends*/}

                    <button type="submit" className="btn btn-primary mt-2">Create</button>
                </form>
            </div>
        </>

    );
};

export default CreateTask;
