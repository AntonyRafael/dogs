import React from "react";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../Api/api";
import Error from "../../Components/Helper/Error";
import Head from "../../Components/Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });
      const { json } = await request(url, options);
    }
  }

  return (
    <section>
            <Head title="Perdeu a senha ? " description="Perdeu a senha do site dogs"/>

      <h1 className="title">Perdeu sua senha:</h1>
      {data ? (
        <p style={{color: '#4c1',}}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Usuário / Email"
            type="text"
            name="username"
            {...login}
          />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
