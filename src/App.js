import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/footer';
import { CartProvider } from './component/context/CartContext';
import Home from './component/pages/Home';
import EventDetailsPage from './component/pages/EventDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryEventsPage from './component/pages/CategoryEventsPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategory from './component/admin/AddCategory';
import EditCategory from './component/admin/EditCategory';
import AdminEventPage from './component/admin/AdminEventPage';
import AddEventPage from './component/admin/AddEventPage';
import EditEventPage from './component/admin/EditEventPage';
import AdminPurchasesPage from './component/admin/AdminPurchasePage';
import AdminPurchaseDetailsPage from './component/admin/AdminPurchaseDetailsPage';

function App() {
  return (
    <BrowserRouter>
    <CartProvider> 
      <Navbar/>
        <Routes>
          {/* OUR ROUTES */}
          <Route exact path='/' element={<Home/>}/>
          <Route path='event/:id' element={<EventDetailsPage/>}/>
          <Route path='/categories' element={<CategoryListPage/>}/>
          <Route path='/category/:categoryId' element={<CategoryEventsPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<ProtectedRoute element={<ProfilePage/>} />} />

          <Route path='/add-address' element={<ProtectedRoute element={<AddressPage/>} />} />
          <Route path='/edit-address' element={<ProtectedRoute element={<AddressPage/>} />} />

          <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
          <Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage/>} />} />
          <Route path='/admin/add-category' element={<AdminRoute element={<AddCategory/>} />} />
          <Route path='/admin/edit-category/:categoryId' element={<AdminRoute element={<EditCategory/>} />} />

          <Route path='/admin/events' element={<AdminRoute element={<AdminEventPage/>} />} />
          <Route path='/admin/add-event' element={<AdminRoute element={<AddEventPage/>} />} />
          <Route path='/admin/edit-event/:eventId' element={<AdminRoute element={<EditEventPage/>} />} />

          <Route path='/admin/purchases' element={<AdminRoute element={<AdminPurchasesPage/>} />} />
          <Route path='/admin/purchase-details/:itemId' element={<AdminRoute element={<AdminPurchaseDetailsPage/>} />} />

        </Routes>
      
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
