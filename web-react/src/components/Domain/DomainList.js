import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './DomainList.css'
import List from '../List'
import UpdateDomain from './UpdateDomain'


const GET_DOMAIN = gql`
  query domainsPaginateQuery {
    domains {
        id
        name
        description
    childDomains {
        id
        name
        description
    }
    parentDomains {
      id
      name
      description
    }
    }
  }
`





function DomainList() {
  /*
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(10)  
n */
  const [open, setOpen] = React.useState(false);
  const [domainData, setDomainData] = React.useState("")



  const { loading, data, error } = useQuery(GET_DOMAIN)




  const onUpdateClick = (n) => {
    //console.log("here:", n)
    setDomainData(n)
    setOpen(true)
  }


  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return (
    <div>
      <List
        data={data.domains}
        title="Domain"
        linkName="Create Domain"
        loading={loading}
        error={error}
        onUpdateClick={onUpdateClick}
      />

      {domainData ? <UpdateDomain
        open={open}
        setOpen={setOpen}
        domainData={domainData}
      /> : ""}
    </div>

  )
}

export default DomainList
