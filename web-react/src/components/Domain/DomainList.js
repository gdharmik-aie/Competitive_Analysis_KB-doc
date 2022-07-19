import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './DomainList.css'
import List from '../List'
import UpdateDomain from './UpdateDomain'
import CreateDomain from './CreateDomain'
import DeleteDomain from './DeleteDomain'


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
  const [createOpen, setCreateOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [domainDeleteId, setDomainDeleteId] = React.useState('')

  const [updateDomainData, setUpdateDomainData] = React.useState("")





  const { data, loading, error } = useQuery(GET_DOMAIN)



  const onUpdateClick = (n) => {
    //console.log("here:", n)
    setUpdateDomainData(n)
    setOpen(true)
  }

  const onCreateClick = () => {
    setCreateOpen(true)
  }

  const onDeleteClick = (n) => {
    console.log(n.id)
    setDomainDeleteId(n.id)
    setDeleteModalOpen(true)
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return (
    <div>
      {data ? <List
        data={data.domains}
        title="Domain"
        linkName="Create Domain"
        listType="list"
        loading={loading}
        error={error}
        onUpdateClick={onUpdateClick}
        onCreateClick={onCreateClick}
        onDeleteClick={onDeleteClick}
      /> : ""}

      {updateDomainData ? <UpdateDomain
        open={open}
        setOpen={setOpen}
        updateDomainData={updateDomainData}
        setUpdateDomainData={setUpdateDomainData}
      /> : ""}

      <CreateDomain
        title="Create Domain"
        createfor="list"
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        GET_DOMAIN={GET_DOMAIN}
      ></CreateDomain>

      <DeleteDomain
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        domainId={domainDeleteId}
        GET_DOMAIN={GET_DOMAIN}

      >

      </DeleteDomain>
    </div>

  )
}

export default DomainList
