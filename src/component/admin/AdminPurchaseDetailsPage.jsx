import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/adminPurchaseDetails.css'
import ApiService from "../../service/ApiService";


const PurchaseStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminPurchaseDetailsPage = () => {
    const { itemId } = useParams();
    const [purchaseEvents, setPurchaseEvents] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});


    useEffect(() => {
        fetchPurchaseDetails(itemId);
    }, [itemId]);

    const fetchPurchaseDetails = async (itemId) => {
        try {
            const response = await ApiService.getBookEventById(itemId);
            setPurchaseEvents(response.eventList)
        } catch (error) {
            console.log(error.message || error);
        }
    }

    const handleStatusChange = (eventId, newStatus) => {
        setSelectedStatus({ ...selectedStatus, [eventId]: newStatus })
    }

    const handleSubmitStatusChange = async (eventId) => {
        try {
            await ApiService.updateEventStatus(eventId, selectedStatus[eventId]);
            setMessage('event status was successfully updated')
            setTimeout(() => {
                setMessage('');
            }, 3000)
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'unable  to update event status')
        }
    }


    return (
        <div className="order-details-page">
            {message && <div className="message">{message}</div>}
            <h2>Order Details</h2>
            {purchaseEvents.length ? (
                purchaseEvents.map((bookEvents) => (
                    <div key={bookEvents.id} className="order-item-details">
                        <div className="info">
                            <h3>Order Information</h3>
                            <p><strong>Order Item ID:</strong>{bookEvents.id}</p>
                            <p><strong>Quantity:</strong>{bookEvents.quantity}</p>
                            <p><strong>Total Price:</strong>{bookEvents.price}</p>
                            <p><strong>Order Status:</strong>{bookEvents.status}</p>
                            <p><strong>date Ordered:</strong>{new Date(bookEvents.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="info">
                            <h3>User Information</h3>
                            <p><strong>Name:</strong>{bookEvents.user.name}</p>
                            <p><strong>Email:</strong>{bookEvents.user.email}</p>
                            <p><strong>Phone:</strong>{bookEvents.user.phoneNumber}</p>
                            <p><strong>Role:</strong>{bookEvents.user.role}</p>

                            <div className="info">
                                <h3>Delivery Address</h3>
                                <p><strong>Country:</strong>{bookEvents.user.address?.country}</p>
                                <p><strong>State:</strong>{bookEvents.user.address?.state}</p>
                                <p><strong>City:</strong>{bookEvents.user.address?.city}</p>
                                <p><strong>Street:</strong>{bookEvents.user.address?.street}</p>
                                <p><strong>Zip Code:</strong>{bookEvents.user.address?.zipcode}</p>
                            </div>
                        </div>
                        <div>
                            <h2>Product Information</h2>
                            <img src={bookEvents.product.imageUrl} alt={bookEvents.product.name} />
                            <p><strong>Name:</strong>{bookEvents.product.name}</p>
                            <p><strong>Description:</strong>{bookEvents.product.description}</p>
                            <p><strong>Price:</strong>{bookEvents.product.price}</p>
                        </div>
                        <div className="status-change">
                            <h4>Change Status</h4>
                            <select
                                className="status-option"
                                value={selectedStatus[bookEvents.id] || bookEvents.status}
                                onChange={(e) => handleStatusChange(bookEvents.id, e.target.value)}>

                                {PurchaseStatus.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button className="update-status-button" onClick={() => handleSubmitStatusChange(bookEvents.id)}>Update Status</button>
                        </div>
                    </div>

                ))
            ) : (
                <p>Loading order details ....</p>
            )}
        </div>
    );

}

export default AdminPurchaseDetailsPage;