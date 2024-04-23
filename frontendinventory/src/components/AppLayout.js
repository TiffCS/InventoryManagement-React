import { Outlet } from "react-router-dom";

// Creates the layout for app routing
// Children routes will be nested within App Layout

const AppLayout = () => {
    return (
        <div className = "App">
                <Outlet />
        </div>
    )
}

export default AppLayout;