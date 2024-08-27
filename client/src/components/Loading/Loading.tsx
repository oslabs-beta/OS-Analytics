import React from 'react'
import styles from './Loading.module.css'
import { Link } from 'react-router-dom';

export default function Loading(){
return (
    <div className = {styles.cup}>
    <div className = {styles.wave}></div>
    <div className =  {styles.handle}></div>
    </div>
    
)
}
