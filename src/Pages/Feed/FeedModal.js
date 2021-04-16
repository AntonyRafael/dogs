import React from 'react'
import { PHOTO_GET } from '../../Api/api'
import Error from '../../Components/Helper/Error'
import Loading from '../../Components/Helper/Loading'
import PhotoContent from '../../Components/PhotoContent/PhotoContent'
import useFetch from '../../Hooks/useFetch'
import styles from './FeedModal.module.css'

const FeedModal = ({photo, setModalPhoto}) => {

    const {data, error, loading, request} = useFetch()
    console.log(photo.id)
    React.useEffect(() => {
        const {url, options} = PHOTO_GET(photo.id)
        request(url, options)
    },[photo, request])

    function hadnleOutsideClick({ target, currentTarget}) {
        if (target === currentTarget) setModalPhoto(null);
    }

    return (
        <div className={styles.modal} onClick={hadnleOutsideClick}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    )
}

export default FeedModal
