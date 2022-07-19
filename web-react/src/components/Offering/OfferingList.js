import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './OfferingDetails.css'
import List from '../List'
import UpdateOffering from './UpdateOffering'
import CreateOffering from './CreateOffering'
import DeleteOffering from './DeleteOffering'


const GET_OFFERING = gql`
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

  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [offeringDeleteId, setOfferingDeleteId] = React.useState('')


  const [updateOfferingData, setUpdateOfferingData] = React.useState("")
  const { loading, data, error } = useQuery(GET_OFFERING)

  const onUpdateClick = (n) => {
    //console.log("here:", n)
    setUpdateOfferingData(n)

    setOpen(true)
  }

  const onCreateClick = () => {
    setCreateModalOpen(true)
  }

  const onDeleteClick = (n) => {
    console.log(n.id)
    setOfferingDeleteId(n.id)
    setDeleteModalOpen(true)
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return (
    <div>

      <List
        data={data.offerings}
        title="Offering"
        linkName="Create Offering"
        listType="list"
        loading={loading}
        error={error}
        onUpdateClick={onUpdateClick}
        onCreateClick={onCreateClick}
        onDeleteClick={onDeleteClick}
      />

      {updateOfferingData ? <UpdateOffering
        open={open}
        setOpen={setOpen}
        updateOfferingData={updateOfferingData}
        setUpdateOfferingData={setUpdateOfferingData}
      ></UpdateOffering> : ""}

      <CreateOffering
        title="Create offering"
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        GET_OFFERING={GET_OFFERING}
      ></CreateOffering>

      <DeleteOffering
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        offeringId={offeringDeleteId}
        GET_OFFERING={GET_OFFERING}
      ></DeleteOffering>
    </div>
  )
}

export default OfferingList