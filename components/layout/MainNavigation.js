import { useState } from 'react'
import classes from './MainNavigation.module.css';
import Link from 'next/link'

function MainNavigation() {
  const [active, setActive] = useState(false)
  
  const setIsVisible = () => {
    setActive(state => !state)
    console.log(active)
  }


  return (
    <header className={classes.header}>
      <div className={classes.logo}>MeexTup</div>
      <nav>
        <ul className={active ? classes.headerUlActive : ''}>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
        <div className={`${classes.ham}`} onClick={setIsVisible}>
          <span className={`${classes.bar} ${classes.bar1}`}></span>
          <span className={`${classes.bar} ${classes.bar2}`}></span>
          <span className={`${classes.bar} ${classes.bar3}`}></span>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
