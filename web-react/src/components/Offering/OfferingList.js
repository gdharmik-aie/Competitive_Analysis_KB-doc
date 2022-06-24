import React from 'react'
import { useQuery, gql } from '@apollo/client'
import List from '../List'

const GET_Offering = gql`
query offeringPaginationQuery{
 offerings {
    id
    name
    description
    version
  }
}
`

function OfferingList() {

    const [offeringId, setOfferingId] = React.useState('')
    const [offeringName, setOfferingName] = React.useState('')
    const [offeringDescription, setOfferingDescription] = React.useState('')
    const [offeringVersion, setOfferingVersion] = React.useState('')

    const { loading, data, error } = useQuery(GET_Offering)

    const onUpdateClick = (n) => {
        // console.log("here:", n)
        setOfferingId(n.id)
        setOfferingName(n.name)
        setOfferingDescription(n.description)
        setOfferingVersion(n.version)
        console.log(offeringId)
        console.log(offeringName)
        console.log(offeringDescription)
        console.log(offeringVersion)
    }

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <div>

            <List
                data={data.offerings}
                title="Offerings"
                linkName="Create Offering"
                loading={loading}
                error={error}
                onUpdateClick={onUpdateClick}

            />
        </div>
    )
}

export default OfferingList