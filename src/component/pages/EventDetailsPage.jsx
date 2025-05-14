import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/eventDetailsPage.css';


const EventDetailsPage = () => {

    const {id} = useParams();
    const {cart, dispatch} = useCart();
    const [event, setEvent] = useState(null);

    useEffect(()=>{
        fetchEvent();
    }, [id])

    const fetchEvent = async () => {
        try {
            const response = await ApiService.getEventById(id);
            setEvent(response.event);
        } catch (error) {
            console.log(error.message || error)
        }
    }

    
    const addToCart = () => {
        if (event) {
            dispatch({type: 'ADD_ITEM', payload: event});
        }
    }

    const incrementItem = () => {
        if(event){
            dispatch({type: 'INCREMENT_ITEM', payload: event});
        }
    }

    const decrementItem = () => {
        if (event) {
            const cartItem = cart.find(item => item.id === event.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({type: 'DECREMENT_ITEM', payload: event});
            }else{
                dispatch({type: 'REMOVE_ITEM', payload: event});
            }
            
        }
    }

    if (!event) {
        return <p>Loading event details ...</p>
    }

    const cartItem = cart.find(item => item.id === event.id);

    return(
        <div className="event-detail">
            <img src={event?.imageUrl} alt={event?.name} />
            <h1>{event?.name}</h1>
            <p>{event?.description}</p>
            <span>${event.price.toFixed(2)}</span>
            {cartItem ? (
                <div className="quantity-controls">
                    <button onClick={decrementItem}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementItem}>+</button>
                </div>
            ):(
                <button onClick={addToCart}>Add To Cart</button>
            )}

        </div>
    )

}

export default EventDetailsPage;