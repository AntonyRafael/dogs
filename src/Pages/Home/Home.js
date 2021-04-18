import React from 'react'

import styles from './Home.module.css'
import Feed from '../Feed/Feed'
import Head from '../../Components/Helper/Head'

const Home = () => {
    return (
        <section className="container mainContainer">
            <Head title="Home " description="Home do site dogs"/>
            <Feed />
        </section>
    )
}

export default Home
