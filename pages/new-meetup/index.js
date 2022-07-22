import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const NewMeetupPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const addMeetupHandler = async (enteredData) => {
    setIsLoading(true)
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    
    console.log(data)
    
    router.push('/')
    setIsLoading(false)
  }
  
  return (
    <React.Fragment>
      <Head>
				<title>Meextup | Add meetup</title>
				<meta name="description" content='meetup website created with nextjs' />
				<meta name="keywords" content="nextjs meetups"/>
			</Head>
      {isLoading ? <div className="center"><LoadingSpinner /></div>: <NewMeetupForm onAddMeetup={addMeetupHandler}/>}
    </React.Fragment>
  )
}

export default NewMeetupPage