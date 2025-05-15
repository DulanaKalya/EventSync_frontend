import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addEvent.css'
import ApiService from "../../service/ApiService";


const EditEventPage = () => {
    const {eventId} = useParams();
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

        if (eventId) {
            ApiService.getEventById(eventId).then((response)=>{
                setName(response.event.name);
                setDescription(response.event.description);
                setPrice(response.event.price);
                setCategoryId(response.event.categoryId);
                setImageUrl(response.event.imageUrl);
            })
        }
    }, [eventId]);

    const handleImageChange = (e) =>{
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if(image){
                formData.append('image', image);
            }
            formData.append('eventId', eventId);
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            const response = await ApiService.updateEvent(formData);
            if (response.status === 200) {
                setMessage(response.message)
                setTimeout(() => {
                    setMessage('')
                    navigate('/admin/events')
                }, 3000);
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'unable to update event')
        }
    }

    return(
        <form onSubmit={handleSubmit} className="event-form">
            <h2>Edit Event</h2>
            {message && <div className="message">{message}</div>}
            <input type="file" onChange={handleImageChange}/>
            {imageUrl && <img src={imageUrl} alt={name} />}
            <select value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cat)=>(
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                ))}
            </select>

            <input type="text"
                placeholder="Event name"
                value={name}
                onChange={(e)=> setName(e.target.value)} />

                <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}/>

                <input type="number"
                placeholder="Price"
                value={price}
                onChange={(e)=> setPrice(e.target.value)} />

                <button type="submit">Update</button>
        </form>
    );
}

export default EditEventPage;