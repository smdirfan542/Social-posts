import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Login from './Features/Auth/pages/Login'
import Register from './Features/Auth/pages/Register'
import Home from '../Home'
import Feed from './Feed'
import CreatePost from './Features/Auth/posts/Components/CreatePost'
function AppRoutes(){
    return(

        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Feed/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/CreatePost' element={<CreatePost/>} />
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes;