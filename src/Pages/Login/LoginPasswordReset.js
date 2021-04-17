import React from "react";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../Api/api";
import Error from "../../Components/Helper/Error";
import { useNavigate } from "react-router";


const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");

  const password = useForm();
  const {error, loading, request} = useFetch();  
  const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (password.validate()) {
            const {url, options} = PASSWORD_RESET({login,key, password: password.value});
            const {response} = await request(url, options);
            if (response.ok) navigate('/login')
        }
    }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  return (
    <section>
        <h1 className="title">Resetar senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ?   <Button disabled>Resetando...</Button> :   <Button>Resetar Senha</Button> }
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
