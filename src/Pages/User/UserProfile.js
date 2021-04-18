import React from 'react'
import { useParams } from 'react-router';
import Head from '../../Components/Helper/Head';
import Feed from '../Feed/Feed'

const UserProfile = () => {

    const {user} = useParams();

    return (
        <section className="container mainContainer">
            <Head title={user} description="Perfil do usuário - site dogs"/>
            <h1 className="title">{user}</h1>
            <Feed user={user}/>
        </section>
    )
}

export default UserProfile
