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
      { location.pathname != "/" && <button type='button' className='text-3xl m-2' onClick={() => (navigate(-1))}><FaChevronLeft/></button>}
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
