import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './UserList';
function MyRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<UserList/>} />
            </Routes>
        </Router>
    )
}
export default MyRouter;