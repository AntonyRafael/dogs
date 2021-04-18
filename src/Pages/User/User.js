import React from 'react'
import { Route, Routes } from 'react-router'
import UserHeader from './UserHeader'
import Feed from '../Feed/Feed'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { UserContext } from '../../UserContext'
import Page404 from '../NotFound/Page404'
import Head from '../../Components/Helper/Head'

const User = () => {

    const {data} = React.useContext(UserContext)

    return (
        <section className="container">
            <Head title="Minha Conta " description="Conta do usuario do site dogs"/>

            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data.id} />} />
                <Route path="postar" element={<UserPhotoPost />} />
                <Route path="estatisticas" element={<UserStats />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </section>
    )
}

export default User;
