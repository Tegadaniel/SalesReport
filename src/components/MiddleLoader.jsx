import React from 'react'
import Loader from 'react-loader-spinner';
import  './Footer.css';


export default function MiddleLoader() {
    return (
        <div className= 'footer mt-5 p-3'>
            <Loader type="ThreeDots" color="gray" height="100" width="100" />
        </div>
    )
}