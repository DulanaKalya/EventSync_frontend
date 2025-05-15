import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css'


const AdminPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <button onClick={()=> navigate("/admin/categories")}>Manage Categories</button>
            <button onClick={()=> navigate("/admin/events")}>Manage Events</button>
            <button onClick={()=> navigate("/admin/purchases")}>Manage Purchases</button>
        </div>
    )
}

export default AdminPage;