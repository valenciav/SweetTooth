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

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">      
      { location.pathname != "/signIn" && location.pathname != "/register" && <NavBar/>}
      { location.pathname != "/" && <div className='flex items-center text-3xl font-bold m-2 gap-4'><button type='button' onClick={() => (navigate(-1))}><FaChevronLeft/></button>{location.pathname.charAt(1).toUpperCase() + location.pathname.substring(2)}</div>}
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/createRecipe" element={ <CreateRecipePage/> }/>
        <Route path="/signIn" element={ <SignInPage/> }/>
        <Route path="/register" element={ <RegisterPage/> }/>
        <Route path="/bookmark" element={ <BookmarkPage /> }/>
        <Route path="/recipe/:id" element={ <RecipePage/> }/>
      </Routes>
    </div>
  )
}

export default App
