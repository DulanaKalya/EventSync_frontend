import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import EventList from "../common/EventList";
import Pagination from "../common/pagination";
import '../../style/home.css'


const CategoryEventsPage = () => {

    const { categoryId } = useParams();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;


    useEffect(() => {
        fetchEvents();
    }, [categoryId, currentPage]);

    const fetchEvents = async () => {
        try {

            const response = await ApiService.getAllEventsByCategoryId(categoryId);
            const allEvents = response.eventList || [];
            //console.log(allEvents);
            setTotalPages(Math.ceil(allEvents.length / itemsPerPage));
            setEvents(allEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unable to fetch events by category id')
        }
    }


    return(
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ):(
                <div>
                    <EventList events={events}/>
                    <Pagination  currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page)=> setCurrentPage(page)}/>
                </div>
            )}
        </div>
    )
}
export default CategoryEventsPage;