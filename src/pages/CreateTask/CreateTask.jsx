import "./CreateTask.css";
const CreateTask = () => {
    return (
        <>
            <h3 className="text-center mt-5">Create task</h3>
            <div className="container create-task-container">
                <form>
                    {/* title */}
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="taskTitle" aria-describedby="titleHelp" placeholder="Give a title of the task" />
                    </div>
                    {/* title ends*/}

                    {/* Priority */}
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Set priority
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" >Low</a></li>
                            <li><a className="dropdown-item" >Medium</a></li>
                            <li><a className="dropdown-item" >High</a></li>
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
