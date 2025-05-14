import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../style/eventList.css';


const EventList = ({events}) => {
    const {cart, dispatch} = useCart();

    const addToCart = (event) => {
        dispatch({type: 'ADD_ITEM', payload: event});
    }

    const incrementItem = (event) => {
        dispatch({type: 'INCREMENT_ITEM', payload: event});
    }

    const decrementItem = (event) => {

        const cartItem = cart.find(item => item.id === event.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({type: 'DECREMENT_ITEM', payload: event});
        }else{
            dispatch({type: 'REMOVE_ITEM', payload: event});
        }
    }


    return(
        <div className="event-list">
                {events.map((event, index) => {
                    const cartItem = cart.find(item => item.id === event.id);
                    return (
                        <div className="event-item" key={index}>
                            <Link to={`/event/${event.id}`}>
                            <img src={event.imageUrl} alt={event.name} className="event-image" />
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <span>Rs{event.price.toFixed(2)}</span>
                            </Link>
                            {cartItem ? (
                                <div className="quantity-controls">
                                    <button onClick={()=> decrementItem(event)}> - </button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={()=> incrementItem(event)}> + </button>
                                </div>
                            ):(
                                <button onClick={()=> addToCart(event)}>Add To Cart</button>
                            )}
                        </div>
                    )
                })}
        </div>
    )
};

export default EventList;