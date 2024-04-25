import {useNavigate} from "react-router-dom"

// Sends the user back one page when trying to access an unauthorized link
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate('/');

    return (
        <section>
            <form>
                <h1>Unauthorized Access</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </form>
        </section>
    )
}

export default Unauthorized;