import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const LoginApp = () => {
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
  const addAuthor = (e) => {
    e.preventDefault();
    let userObj = {
      id: e.target.id.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post('/account', userObj)
      .then((res) => getusers())
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <form className='todo' onSubmit={addAuthor}>
        <h3>
          <label>Id</label>
        </h3>
        <input type='number' name='id' placeholder='id' />
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
          <button className='btn btn-primary'>Add Author</button>
        </div>
      </form>
    </div>
  );
};
export default LoginApp;
