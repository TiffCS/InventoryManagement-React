import { Link } from "react-router-dom";

const Home = () => {
    return (
            <section>
                <form>
                    <h1>Inventory Management Links</h1>
                    <br />
                    <Link to="/register">Register</Link>
                    <br />
                    <Link to="/admin">Admin Page </Link>
                    <Link to="/users">User Page</Link>
                </form>
            </section>
    );
}

export default Home;