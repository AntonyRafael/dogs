import React from "react";
import styles from "./UserPhotoPost.module.css";

import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../Api/api";
import Error from "../../Components/Helper/Error";

import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
import { useNavigate } from "react-router";
import Head from "../../Components/Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const { url, options } = PHOTO_POST(
      formData,
      window.localStorage.getItem("token")
    );
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Pose sua Foto " description="Home do site dogs" />

      <form onSubmit={handleSubmit}>
        <Input label="Nome:" type="text" name="nome" {...nome} />
        <Input label="Peso:" type="number" name="peso" {...peso} />
        <Input label="Idade:" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Postando...</Button>
        ) : (
          <Button>Postar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
