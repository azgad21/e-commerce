import React from 'react'
import '../styles/loading-screen.css'

function LoadingScreen() {
    return (
        <div className='overlay'>
            <div className="lds-heart"><div></div></div>
        </div>
    )
}

export default LoadingScreen
