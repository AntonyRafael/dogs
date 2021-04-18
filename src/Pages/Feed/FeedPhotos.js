import React from "react";

import styles from "./FeedPhotos.module.css";

import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../Api/api";
import Error from "../../Components/Helper/Error";
import Loading from "../../Components/Helper/Loading";

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
      console.log(json);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);



  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.length === 0)
    return <p className={styles.noPost}>Você ainda não possui fotos...</p>;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            setModalPhoto={setModalPhoto}
            key={photo.id}
            photo={photo}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
