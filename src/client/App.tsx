import * as React from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { authApiPathService } from '../shared/PathServices/api/AuthApiPathService';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CreateAccountReq } from '../shared/dto/auth/CreateAccountReq';
import { useEffect, useState } from 'react';

const App = () => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '', name: '', password: '' } as CreateAccountReq,
  });

  const onSubmit = data => {
    fetch(authApiPathService.apiPathCreateAccount(), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => console.log(r));
  };

  const [users, setUsers] = useState([])
  useEffect(() => {

  })

  return (
    <Container>
      <h1> Привет из реакта!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label={'name'} name={'name'} inputRef={register} />
        <TextField fullWidth label={'email'} name={'email'} inputRef={register} />
        <TextField
          fullWidth
          label={'password'}
          error={!!errors.password}
          helperText={errors.password}
          name={'password'}
          inputRef={register}
        />
        <Button fullWidth type={'submit'}>
          Регистрация
        </Button>
      </form>
    </Container>
  );
};

render(<App />, document.getElementById('app'));
