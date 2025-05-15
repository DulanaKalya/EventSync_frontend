import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminEvent.css'
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";

const AdminEventPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;


    const fetchEvents = async() => {
        try {
            const response = await ApiService.getAllEvents();
            const eventList = response.eventList || [];
            setTotalPages(Math.ceil(eventList.length/itemsPerPage));
            setEvents(eventList.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unable to fetch events')

        }
    }

    useEffect(()=>{
        fetchEvents();
    }, [currentPage]);

    const handleEdit = async (id) => {
        navigate(`/admin/edit-event/${id}`)
    }
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are your sure you want to delete this event? ")
        if(confirmed){
            try {
                await ApiService.deleteEvent(id);
                fetchEvents();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'unable to delete event')
            }
        }
    }

    return(
        <div className="admin-event-list">
            {error ? (
                <p className="error-message">{error}</p>
            ): (
                <div>
                    <h2>Events</h2>
                    <button className="event-btn" onClick={()=> {navigate('/admin/add-event'); }}>Add event</button>
                    <ul>
                        {events.map((event)=>(
                            <li key={event.id}>
                                <span>{event.name}</span>
                                <button className="event-btn" onClick={()=> handleEdit(event.id)}>Edit</button>
                                <button className="event-btn-delete" onClick={()=> handleDelete(event.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page)=> setCurrentPage(page)}/>
                </div>
            )}
        </div>
    )
}
export default AdminEventPage;