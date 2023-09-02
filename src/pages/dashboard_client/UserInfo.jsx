import React from 'react'
import { dateFormatDMY } from '../../helpers/dateFormat'
import AddPatientBtn from '../../components/buttons_client/AddPatientBtn'
import UpPWBtn from '../../components/buttons_client/UpPWBtn'
import UpEmailBtn from '../../components/buttons_client/UpEmailBtn'

const UserInfo = ({ userData, setReload, patientsRelation}) => {
    return (
        <article className='row'>
            <div className='py-2 col-12 col-lg-5 col-md-12 col-sm-12 align-items-center'>
                <h1 className='m-2 align-items-center'>Bienvenid@ {userData.name} {userData.lastName}</h1>
            </div>
            <div className='col-12 col-lg-7 col-md-12 col-sm-12 row align-items-center text-end p-0 m-0'>
                <div className='row text-end'>
                <span className='col-3 fw-bold p-0 m-0'>RUN:{userData?.run}</span>
                <span className='col-3 fw-bold p-0 m-0'>🗓️ {dateFormatDMY(userData?.birthday)}</span>
                <span className='col-6 fw-bold p-0 m-0'>✉️ {userData?.email}</span>
                </div>
                <div className='p-0 text-end'>
                    <AddPatientBtn id={userData?._id} setReload={setReload} patientsRelation={patientsRelation} />
                    <UpPWBtn id={userData?._id} />
                    <UpEmailBtn id={userData?._id} />
                </div>
            </div>
        </article>
    )
}

export default UserInfo
