import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const ValidateApp = () => {
  let [users, setusers] = useState([]);
  useEffect(() => {
    getusers();
  }, []);
  const getusers = () => {
    axios
      .get('/account')
      .then((res) => {
        setusers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Check = (e) => {
    e.preventDefault();
    let userObj = {
      id: e.target.id.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post('/account/checklogin/' + userObj.username + '/' + userObj.password)
      .then((res) => setusers(res.data))
      .catch((e) => console.log(e));
  };

  const showUser = () => {
    setusers('Login With the respected credentials');
    axios
      .get('/account')
      .then((res) => {
        setusers(res.data.results);
        alert(users);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <form className='todo' onSubmit={Check}>
        <h3>
          <label>User Name:</label>
        </h3>
        <input
          required
          type='text'
          name='username'
          placeholder='Enter FirstName'
          className='form-control'
        />
        <h3>
          <label>Password :</label>
        </h3>
        <input
          required
          type='password'
          name='password'
          placeholder='Enter Password'
          className='form-control'
        />
        <br />
        <div className='text-center'>
          <button className='btn btn-primary'>Login</button>
        </div>
      </form>
      <div>
        <button onClick={showUser}>Show user Details</button>
      </div>
      <div className='displayinline'></div>
    </div>
  );
};
export default ValidateApp;
