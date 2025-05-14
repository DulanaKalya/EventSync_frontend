import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import EventList from "../common/EventList";
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";
import '../../style/home.css';


const Home = () => {
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 2;

    useEffect(()=> {

        const fetchEvents = async () => {
            try{
                let allEvents = [];
                const queryparams = new URLSearchParams(location.search);
                const searchItem = queryparams.get('search')

                if (searchItem) {
                    const response = await ApiService.searchEvents(searchItem);
                    allEvents = response.eventList || [];
                }else{
                    const response = await ApiService.getAllEvents();
                    allEvents = response.eventList || [];

                }

                setTotalPages(Math.ceil(allEvents.length/itemsPerPage));
                setEvents(allEvents.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));

            }catch(error){
                setError(error.response?.data?.message || error.message || 'unable to fetch events');
            }
        }

            fetchEvents();

    },[location.search, currentPage])


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

export default Home;