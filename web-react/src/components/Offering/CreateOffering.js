import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateOffering.css'
import { Paper, TextField, Button, Typography } from '@mui/material'
import Heading from '../Heading'

const CREATE_OFFERING = gql`
  mutation userCreateMutationQuery($input: [OfferingCreateInput!]!) {
    createOfferings(input: $input) {
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

function CreateOffering() {
  // const [offeringId, setOfferingId] = React.useState("")
  const [offeringName, setOfferingName] = React.useState('')
  const [offeringDescription, setOfferingDescription] = React.useState('')
  const [offeringVersion, setOfferingVersion] = React.useState('')
  const [offeringProvider, setOfferingProvider] = React.useState('')

  const [
    createOffering,
    { date: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_OFFERING, {
    variables: {
      input: {
        name: offeringName,
        desciption: offeringDescription,
        version: offeringVersion,
        provider: offeringProvider,
      },
    },
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

  const onOfferingProviderChange = (e) => {
    const offeringPrvider = e.target.value
    setOfferingProvider(offeringPrvider)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    createOffering()
    console.log(mutationData)
    console.log(mutationError)
    console.log(mutationLoading)

    if (!mutationError) {
      setOfferingName('')
      setOfferingDescription('')
      setOfferingVersion('')
      setOfferingProvider('')
    }
  }

  return (
    <Paper className="root createOffering">
      <Heading title="Create Offering" listType="list" linkName="Offering List"></Heading>

      <form onSubmit={handlerSubmit}>
        <Typography>
          <TextField
            className="textField"
            required
            label="Offering Name"
            onChange={onOfferingNameChange}
            value={offeringName}
          ></TextField>

          <TextField
            className="textField"
            required
            label="Offering Description"
            onChange={onOfferingDescChange}
            value={offeringDescription}
          ></TextField>

          <TextField
            className="textField"
            required
            label="Offering Version"
            onChange={onOfferingVersionChange}
            value={offeringVersion}
          ></TextField>

          <TextField
            className="textField"
            required
            label="Offering Provider"
            onChange={onOfferingProviderChange}
            value={offeringProvider}
          ></TextField>
        </Typography>
        <div>
          <Button
            className="formButton"
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Offering
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default CreateOffering
