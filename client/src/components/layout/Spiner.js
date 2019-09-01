import React,{Fragment} from 'react'
import giphy from './giphy.gif'

const Spiner = () => {
    return (
        <Fragment>
            <img src={giphy}
            style={{width:'200px',margin:'auto', display:'block'}}
            alt='Loading...'/>
        </Fragment>
    )
}

export default Spiner
