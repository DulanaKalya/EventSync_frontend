import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPurchasePage.css'
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";


const PurchaseStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];


const AdminPurchasesPage = () => {

    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases();
    }, [searchStatus, currentPage]);



    const fetchPurchases = async () => {

        try {
            let response;
            if(searchStatus){
                response = await ApiService.getAllBookEventsByStatus(searchStatus);
            }else{
                response = await ApiService.getAllPurchases();
            }
            const purchaseList = response.purchaseItemList || [];

            setTotalPages(Math.ceil(purchaseList.length/itemsPerPage));
            setPurchases(purchaseList);
            setFilteredPurchases(purchaseList.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));


        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unable to fetch purchases')
            setTimeout(()=>{
                setError('')
            }, 3000)
        }
    }

    const handleFilterChange = (e) =>{
        const filterValue = e.target.value;
        setStatusFilter(filterValue)
        setCurrentPage(1);

        if (filterValue) {
            const filtered = purchases.filter(purchase => purchase.status === filterValue);
            setFilteredPurchases(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }else{
            setFilteredPurchases(purchases.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(purchases.length / itemsPerPage));
        }
    }


    const handleSearchStatusChange = async (e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    }

    const handlePurchaseDetails = (id) => {
        navigate(`/admin/purchase-details/${id}`)
    }


    return (
        <div className="admin-purchases-page">
            <h2>Purchases</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="filter-container">
                <div className="statusFilter">
                    <label >Filter By Status</label>
                    <select value={statusFilter} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {PurchaseStatus.map(status=>(
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="searchStatus">
                <label>Search By Status</label>
                    <select value={searchStatus} onChange={handleSearchStatusChange}>
                        <option value="">All</option>
                        {PurchaseStatus.map(status=>(
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                </div>
            </div>

            <table className="purchases-table">
                <thead>
                    <tr>
                        <th>Purchase ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Date Purchased</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPurchases.map(purchase => (
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.user.name}</td>
                            <td>{purchase.status}</td>
                            <td>${purchase.price.toFixed(2)}</td>
                            <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={()=> handlePurchaseDetails(purchase.id)}>Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page)=> setCurrentPage(page)}/>
        </div>
    )
}
export default AdminPurchasesPage;