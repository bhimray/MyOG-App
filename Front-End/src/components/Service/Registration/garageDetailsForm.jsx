import React from 'react'
import {useParams} from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GARAGE_DETAILS_QUERY=gql`
  query garageProfile($UserId:String){
  garageProfile(UserId:$UserId){
    Name
    GarageName
    Email
    Mobile
    ServiceType
    OpeningClosingTime
    Customer{
      latitude
      longitude
      date
    }
  }
}
`
const garageDetailsForm = () => {
  const {id} = useParams()
  const {data:garageDetails, loading:detailsLoading, error:detailsError} = useQuery(GARAGE_DETAILS_QUERY,{
    variables:{
      UserId:id
    }
  })

  if (garageDetails) console.log(garageDetails);
  if (loading) return <div>Loading....</div>;
  if (detailsError) console.log("detailsError",detailsError);

  return (
    <div>

    </div>
  )
}

export default garageDetailsForm