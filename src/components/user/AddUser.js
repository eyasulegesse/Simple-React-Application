import React, { Fragment, useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import ErrorModal from './ErrorModal';
const AddUser = (props) => {
  const [username, setUsername] = useState();
  const [age, setAge] = useState();
  const [error, setError] = useState(false);

  const changeusernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const changeAgeHandler = (e) => {
    setAge(e.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === '' || age === '') {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(username, age);
    setUsername('');
    setAge('');
  };
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={changeusernameHandler}
          />
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            id='age'
            value={age}
            onChange={changeAgeHandler}
          />
          <Button type='submit'>Save</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
