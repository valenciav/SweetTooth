import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateRecipePage from './pages/CreateRecipePage'
import NavBar from './components/NavBar'
import './style.css';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import { FaChevronLeft } from "react-icons/fa";
import BookmarkPage from './pages/BookmarkPage';

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">      
      { location.pathname != "/signIn" && location.pathname != "/register" && <NavBar/>}
      { location.pathname != "/" && <button type='button' className='absolute text-3xl top-3 left-3' onClick={() => (navigate(-1))}><FaChevronLeft/></button>}
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/createRecipe" element={ <CreateRecipePage/> }/>
        <Route path="/signIn" element={ <SignInPage/> }/>
        <Route path="/register" element={ <RegisterPage/> }/>
        <Route path="/bookmark" element={ <BookmarkPage /> }/>
      </Routes>
    </div>
  )
}

export default App
