import React from 'react';
import loading from '../../assets/wizbiz/reaplf.gif'
import loading1 from '../../assets/wizbiz/baraduur.gif'
import loading2 from '../../assets/wizbiz/death-demon.gif'
import loading3 from '../../assets/wizbiz/plasmaball.gif'
import loading4 from '../../assets/red/redlightbar.gif'
import loading5 from '../../assets/red/fly-red.gif'

let loadingArray = [loading, loading1, loading2, loading3, loading4, loading5]
const random = loadingArray[Math.floor(Math.random() * loadingArray.length)]

function Loading() {
    return (
        <div className='loading'>
            <h1>LOADING...</h1>
            <img src={random} alt='loading'></img>
        </div>
    )
}

export default Loading;
