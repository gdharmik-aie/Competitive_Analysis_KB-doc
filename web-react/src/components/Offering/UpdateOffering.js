import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import './OfferingList.css'

import { TextField, Button, Box, Typography, Modal, Paper } from '@mui/material'
import Title from '../Title'

const UPDATE_OFFERING = gql`
  mutation offeringUpdateMutation(
    $where: OfferingWhere
    $update: OfferingUpdateInput
  ) {
    updateOfferings(where: $where, update: $update) {
      offerings {
        id
        name
        description
        version
      }
    }
  }
`


function UpdateOffering({ open, setOpen, updateOfferingData, setUpdateOfferingData }) {
  const [offeringId, setOfferingId] = React.useState('')
  const [offeringName, setOfferingName] = React.useState('')
  const [offeringDescription, setOfferingDescription] = React.useState('')
  const [offeringVersion, setOfferingVersion] = React.useState('')


  useEffect(() => {
    // console.log(updateOfferingData)
    function setData() {
      setOfferingId(updateOfferingData.id)
      setOfferingName(updateOfferingData.name)
      setOfferingDescription(updateOfferingData.description)
      setOfferingVersion(updateOfferingData.version)
    }

    setData()
  }, [updateOfferingData])

  const [updateOffering, { error: mutationError }] = useMutation(UPDATE_OFFERING,
    {
      variables: {
        where: { id: offeringId },
        update: {
          name: offeringName,
          description: offeringDescription,
          version: offeringVersion,
        },
      },
      onCompleted: (data) => {
        console.log(data);

      }
    })



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



  const handlerSubmit = (e) => {
    e.preventDefault()
    updateOffering()

    console.log(mutationError)
    if (!mutationError) {
      setOpen(false)
    }
  }



  const handleClose = () => {
    setUpdateOfferingData('')
    setOpen(false)
  }
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
              <Title>Update Offering</Title>
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
                label="Offering Version"
                defaultValue={offeringVersion}
                onChange={onOfferingVersionChange}
              ></TextField>


              <div className="button-container">

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
export default UpdateOffering