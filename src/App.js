import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import AddBook from './pages/AddBook';
import Books from './pages/Books';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route exact path="/" component={<Home />} />
          <Route exact path="/users/" element={<Users />} />
          <Route exact path="/books/" element={<Books />} />
          <Route exact path="/orders/" element={<Orders />} />
          <Route exact path="/add-book" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
