import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './OfferingDetails.css'
import List from '../List'
import UpdateOffering from './UpdateOffering'


const GET_Offering = gql`
query offeringPaginationQuery{
   offerings {
    id
    name
    description
    version
    primaryDomain {
      id
      name
      description
    }
    provider {
      id
      name
      description
    }
  }
}
`

function OfferingList() {

    const [open, setOpen] = React.useState(false);
    const [offeringData, setOfferingData] = React.useState('')

    const { loading, data, error } = useQuery(GET_Offering)

    const onUpdateClick = (n) => {
        // console.log("here:", n)
        setOfferingData(n)
        setOpen(true)
    }

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <div>

            <List
                data={data.offerings}
                title="Offering"
                linkName="Create Offering"
                loading={loading}
                error={error}
                onUpdateClick={onUpdateClick}
            />

            {offeringData ? <UpdateOffering
                open={open}
                setOpen={setOpen}
                offeringData={offeringData}
            >
            </UpdateOffering> : ""}
        </div>
    )
}

export default OfferingList