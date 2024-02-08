import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid navbar-container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" aria-current="page" to={'/'}>
                        Task Hub
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item d-flex nav-items">
                                <Link className="nav-link active" aria-current="page" to={'/'}>
                                    Tasks
                                </Link>
                                <Link className="nav-link active" aria-current="page" to={'/create-task'}>
                                    Create
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;