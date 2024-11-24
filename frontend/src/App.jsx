import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateRecipePage from './pages/CreateRecipePage'
import NavBar from './components/NavBar'
import './style.css';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import { FaChevronLeft } from "react-icons/fa";
import BookmarkPage from './pages/BookmarkPage';
import RecipePage from './pages/RecipePage';
import ProtectedRoutes from './util/ProtectedRoutes';
import { AuthProvider } from './util/AuthContext';

function App() {
  const navigate = useNavigate();
  return (
    <AuthProvider>
      <div className="min-h-screen">      
        { location.pathname != "/signIn" && location.pathname != "/register" && <NavBar/>}
        { location.pathname != "/" && <div className='flex items-center text-3xl font-bold m-2 gap-4'><button type='button' onClick={() => (navigate(-1))}><FaChevronLeft/></button></div>}
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/signIn" element={ <SignInPage/> }/>
          <Route path="/register" element={ <RegisterPage/> }/>
          <Route path="/recipe/:id" element={ <RecipePage/> }/>
        </Routes>
        <ProtectedRoutes>
          <Routes>
            <Route path="/bookmark" element={ <BookmarkPage /> }/>
            <Route path="/createRecipe" element={ <CreateRecipePage/> }/>
          </Routes>
        </ProtectedRoutes>
      </div>
    </AuthProvider>
  )
}

export default App
