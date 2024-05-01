import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import './assets/css/global.css';
import RequireAthentication from './components/authentication/RequireAuthentication';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import Layout from './layout/Layout';
import AddBook from './pages/AddBook';
import Book from './pages/Book';
import Books from './pages/Books';
import EditBook from './pages/EditBook';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import Missing from './pages/Missing';
import Order from './pages/Order';
import Orders from './pages/Orders';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import User from './pages/User';
import Users from './pages/Users';

function App() {
  const locale = navigator.language || navigator.userLanguage || LOCALES.ENGLISH;

  const [currentLocale, setCurrentLocale] = useState(locale);

  return (
    <IntlProvider locale={currentLocale} defaultLocale={LOCALES.ENGLISH} messages={messages[currentLocale]}>
      <Routes>
        <Route path="/" element={<Layout locale={locale} setCurrentLocale={setCurrentLocale} />}>
          <Route exact path="sign-in" element={<SignIn />} />
          <Route exact path="sign-up" element={<SignUp />} />
          <Route path="" element={<Home />} />
          <Route path="books/" element={<Books />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="*" element={<Missing />} />
          <Route element={<RequireAthentication allowedRoles={["READER", "LIBRARIAN", "ADMIN"]} />}>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
          <Route element={<RequireAthentication allowedRoles={["ADMIN"]} />}>
            <Route path="users/" element={<Users />} />
            <Route path="user/:login" element={<User />} />
            <Route path="user/:login/edit" element={<EditUser />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="book/:id/edit" element={<EditBook />} />
          </Route>
          <Route element={<RequireAthentication allowedRoles={["READER", "LIBRARIAN"]} />}>
            <Route path="orders/" element={<Orders />} />
            <Route path="order/:id" element={<Order />} />
          </Route>
        </Route>
      </Routes>
    </IntlProvider>
  );
}

export default App;
