import React from 'react'
import './AAA.css'
import BBB from './BBB'

const AAA = (props) => {
    // const AAATest = () => {
    //     console.log(' AAA Test')
    // }
    const array = [1]
    return <div className="testaaa" > AAA 
        {array.map((item, index) => {
            return <BBB ref={props.fres}/>
        })}
        {/* <input ref={ref}></input> */}
        <ForWardedComponent ref={props.fref}/>
    </div>
}
export default AAA

const ForWardedComponent = React.forwardRef((props, ref) => {
    return <input ref={ref}></input>
})