import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import './OfferingList.css'

import { TextField, Button, Box, Typography, Modal, Paper } from '@mui/material'
import Title from '../Title'

const UPDATE_OFFERING = gql`
  mutation offeringUpdateMutationQuery(
    $where: OfferingWhere
    $update: OfferingUpdateInput
  ) {
    updateOfferings(where: $where, update: $update) {
      offerings {
        id
        name
        description
        version
        provider
      }
    }
  }
`

const DELETE_OFFERING = gql`
  mutation offeringDeleteMutationQuery($where: OfferingWhere) {
    deleteOfferings(where: $where) {
      nodesDeleted
    }
  }
`

export default function UpdateOffering({ open, setOpen, offeringData }) {
  const [offeringId, setOfferingId] = React.useState('')
  const [offeringName, setOfferingName] = React.useState('')
  const [offeringDescription, setOfferingDescription] = React.useState('')
  const [offeringVersion, setOfferingVersion] = React.useState('')
  const [offeringProvider, setOfferingProvider] = React.useState('')

  useEffect(() => {
    function setData() {
      setOfferingId(offeringData.id)
      setOfferingName(offeringData.name)
      setOfferingDescription(offeringData.description)
    }

    setData()
  }, [offeringData])

  const [
    updateOffering,
    { error: mutationError },
  ] = useMutation(UPDATE_OFFERING, {
    variables: {
      where: { id: offeringId },
      update: {
        name: offeringName,
        description: offeringDescription,
        version: offeringVersion,
        provider: offeringProvider,
      },
    },
  })

  const [
    deleteOffering,
    { data: deleteMutationData, error: deleteMutationError },
  ] = useMutation(DELETE_OFFERING, { variables: { where: { id: offeringId } } })

  const onOfferingNameChange = (e) => {
    const offeringName = e.target.value
    setOfferingName(offeringName)
  }

  const onOfferingDescChange = (e) => {
    const offeringDesc = e.target.value
    setOfferingDescription(offeringDesc)
  }

  const onOfferingVersionChange = (e) => {
    const offeringVer = e.target.value
    setOfferingVersion(offeringVer)
  }

  const onOfferingProviderChange = (e) => {
    const offeringPrvider = e.target.value
    setOfferingProvider(offeringPrvider)
  }

  const handlerSubmit = (e) => {
    e.preventionDefault()
    updateOffering()

    console.log(mutationError)
    if (!mutationError) {
      setOpen(false)
      window.location.reload()
    }
  }

  const onDeleteOffering = () => {
    if (offeringId) {
      deleteOffering()
      setOpen(false)
      window.location.reload()
    }
    console.log(deleteMutationError)
    console.log(deleteMutationData)
    if (deleteMutationData) {
      alert(`${deleteMutationData} is deleted`)
    }
  }

  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper>
          <Box className="modalBox">
            <Typography id="modal-modal--title" variant="h5" component="h2">
              <Title>Update</Title>
            </Typography>

            <form onSubmit={handlerSubmit}>
              <TextField
                className="TextField"
                required
                id="outline-required"
                label="Offering Name"
                defaultValue={offeringName}
                onChange={onOfferingNameChange}
              ></TextField>
              <TextField
                className="TextField"
                required
                id="outlined-required"
                label="Offering Description"
                defaultValue={offeringDescription}
                onChange={onOfferingDescChange}
              ></TextField>
              <TextField
                className="TextField"
                required
                id="outlined-required"
                label="Offering Description"
                defaultValue={offeringVersion}
                onChange={onOfferingVersionChange}
              ></TextField>
              <TextField
                className="TextField"
                required
                id="outlined-required"
                label="Offering Description"
                defaultValue={offeringProvider}
                onChange={onOfferingProviderChange}
              ></TextField>

              <div className="button-container">
                <Button
                  className="formButton"
                  color="primary"
                  variant="contained"
                  onClick={() => onDeleteOffering()}
                >
                  Delete
                </Button>
                <Button
                  className="formButton"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </Modal>
    </div>
  )
}
