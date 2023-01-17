import { Route, Routes } from 'react-router-dom';
import './assets/global.css';
import RequireAthentication from './components/authentication/RequireAuthentication';
import Layout from './layout/Layout';
import AddBook from './pages/AddBook';
import Book from './pages/Book';
import Books from './pages/Books';
import Home from './pages/Home';
import Missing from './pages/Missing';
import Orders from './pages/Orders';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="sign-in" element={<SignIn />} />
        <Route exact path="sign-up" element={<SignUp />} />
        <Route path="*" element={<Missing />} />
        <Route element={<RequireAthentication allowedRoles={["READER", "LIBRARIAN", "ADMIN"]} />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="" element={<Home />} />
          <Route path="books/" element={<Books />} />
          <Route path="book/:id" element={<Book />} />
        </Route>
        <Route element={<RequireAthentication allowedRoles={["ADMIN"]} />}>
          <Route path="users/" element={<Users />} />
          <Route path="add-book" element={<AddBook />} />
        </Route>
        <Route element={<RequireAthentication allowedRoles={["READER", "LIBRARIAN"]} />}>
          <Route path="orders/" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
