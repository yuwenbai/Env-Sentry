import React, { useEffect } from 'react'
import './BBB.css'
const BBB = () => {
    console.log(' BBB  change ')
    useEffect(()=>{
        console.log(' BBB  construct ')
    },[])
    return <div className="testbbb"> bbb </div>
}
export default BBB