import React from "react";
import Button from "../../Components/Forms/Button/Button";
import Input from "../../Components/Forms/Input/Input";
import Error from "../../Components/Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";

import {UserContext} from "../../UserContext"
import { USER_POST } from "../../Api/api";
import Head from "../../Components/Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();
  
  const { userLogin } = React.useContext(UserContext);
  const {loading, error, request} = useFetch()

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const {response} = await request(url, options);
    if (response.ok) userLogin(username.value, password.value)
    console.log(response);
  }

  return (
    <section className="animeLeft">
            <Head title="Criar Conta " description="Criat conta do site dogs"/>

      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ?<Button disabled>Cadastrarando...</Button>  : <Button>Cadastrar</Button>}
        <Error error={error}/>
      </form>
    </section>
  );
};

export default LoginCreate;
