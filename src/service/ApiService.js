import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTh && USERS API */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data;
    }


    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data;
    }


    static async getLoggedInUserInfo() {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    /**Event ENDPOINT */

    static async addEvent(formData) {
        const response = await axios.post(`${this.BASE_URL}/event/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateEvent(formData) {
        const response = await axios.put(`${this.BASE_URL}/event/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    /*
    static async updateEvent(eventId, formData) {
        const response = await axios.put(`${this.BASE_URL}/event/update/${eventId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }*/

    static async getAllEvents() {
        const response = await axios.get(`${this.BASE_URL}/event/get-all`)
        return response.data;
    }

    static async searchEvents(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/event/search`, {
            params: { searchValue }
        });
        return response.data;
    }

    static async getAllEventsByCategoryId(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/event/get-by-category-id/${categoryId}`)
        return response.data;
    }

    static async getEventById(eventId) {
        const response = await axios.get(`${this.BASE_URL}/event/get-by-event-id/${eventId}`)
        return response.data;
    }

    static async deleteEvent(eventId) {
        const response = await axios.delete(`${this.BASE_URL}/event/delete/${eventId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**CATEGORY */
    static async createCategory(body) {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllCategory() {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`)
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`)
        return response.data;
    }

    static async updateCategory(categoryId, body) {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    /**Purchase */
    static async createPurchase(body) {
        const response = await axios.post(`${this.BASE_URL}/purchase/create`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllPurchases() {
        const response = await axios.get(`${this.BASE_URL}/purchase/filter`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getBookEventById(eventId) {
        const response = await axios.get(`${this.BASE_URL}/purchase/filter`, {
            headers: this.getHeader(),
            params: {eventId}
        })
        return response.data;
    }

    static async getAllBookEventsByStatus(status) {
        const response = await axios.get(`${this.BASE_URL}/purchase/filter`, {
            headers: this.getHeader(),
            params: {status}
        })
        return response.data;
    }

    static async updateBookEventStatus(bookEventId, status) {
        const response = await axios.put(`${this.BASE_URL}/purchase/update-event-status/${bookEventId}`, {}, {
            headers: this.getHeader(),
            params: {status}
        })
        return response.data;
    }




    /**ADDRESS */
    static async saveAddress(body) {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    /***AUTHEMNTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }



}