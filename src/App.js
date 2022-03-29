import logo from './logo.svg';
import './App.css';
import ProductContext from './ProductContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import AuthorApp from './AuthorApp';
import CityCookie from './CityCookie';
import DetailCookie from './DetailCookie';
import { useReducer } from 'react';
import CityApp from './City';
import ProductReducer from './ProductReducer';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import TodoApp from './TodoApp';
import CarApp from './Car';
import LoginApp from './Login';
import ValidateApp from './Validate';
function App() {
  const myProduct = [];
  const [state, dispatch] = useReducer(ProductReducer, myProduct);
  const value = { state, dispatch };
  return (
    <div className='App'>
      {/* <CityCookie />
      <DetailCookie /> */}
      <BrowserRouter>
        <Link to='/register' className='col-lg-4 btn btn-primary'>
          Register
        </Link>
        <Link to='/login' className='col-lg-4 btn btn-primary'>
          Login
        </Link>
        <Routes>
          <Route path='/register' element={<LoginApp />} />
          <Route path='/login' element={<ValidateApp />} />
        </Routes>
      </BrowserRouter>
      {/* <CarApp /> */}
      {/* <ProductContext.Provider value={value}>
                <ProductForm />
                <ProductList />
            </ProductContext.Provider> */}
      {/* <CityApp></CityApp> */}
      {/* <AuthorApp></AuthorApp>
      <TodoApp></TodoApp> */}
    </div>
  );
}

export default App;
