import React from 'react'
import classes from './MeetupDetail.module.css'

const MeetupDetail = (props) => {
  return (
    <div className={classes.item}>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <i>{ props.address  }</i>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default MeetupDetail