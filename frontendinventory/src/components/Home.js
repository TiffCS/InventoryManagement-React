import { Link } from "react-router-dom";

const Home = () => {
    return (
            <section>
                <h1>Inventory Management Links</h1>
                <br />
                <Link to="/register">Register</Link>
                <br />
                <Link to="/admin">Admin Page </Link>
                <Link to="/users">User Page</Link>
            </section>
    );
}

export default Home;