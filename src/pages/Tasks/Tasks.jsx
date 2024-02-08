import { useFetch } from "../../hooks/useFetch";
import { PROTOCOL_HOST } from "../../utils/url";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
const Tasks = () => {
    const { data, loading } = useFetch(`${PROTOCOL_HOST}/task/all-tasks`);

    console.log("🚀 is Data got", data);
    return (
        <>
            <h3 className="text-center mt-5">All tasks</h3>
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
                            data?.map((table, index) => (
                                <tr className="text-center" key={table?._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{table?.title}</td>
                                    <td>{table?.priority}</td>
                                    <td>{table?.status}</td>
                                    <td ><FaCheck /></td>
                                    <td ><BsPencilSquare /></td>
                                    <td><AiOutlineDelete /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Tasks;