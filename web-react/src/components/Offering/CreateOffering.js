import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateOffering.css'
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Modal,
} from '@mui/material'
/* import Heading from '../Heading' */
import Title from '../Title'

const CREATE_OFFERING = gql`
  mutation userCreateMutationQuery($input: [OfferingCreateInput!]!) {
    createOfferings(input: $input) {
      offerings {
        id
        name
        description
        version
      }
    }
  }
`

const CREATE_OFFERING_USED = gql`
mutation UpdateOfferingUsedCompanies($where: CompanyWhere, $create: CompanyRelationInput) {
  updateCompanies(where: $where, create: $create) {
    companies {
      id
      name
      description
      website
      city
      region
      country
      offeringsUsed {
        id
        name
        description
        version
      }
    }
  }
}
`
const CREATE_OFFERING_PROVIDE = gql`
mutation UpdateOfferingProvideCompanies($where: CompanyWhere, $create: CompanyRelationInput) {
  updateCompanies(where: $where, create: $create) {
    companies {
      id
      name
      description
      website
      city
      region
      country
      offeringsProvided {
        id
        name
        description
        version
      }
    }
  }
}
`

function CreateOffering({ title, createModalOpen, setCreateModalOpen, GET_OFFERING, createfor, companyId }) {
  // const [offeringId, setOfferingId] = React.useState("")
  const [offeringName, setOfferingName] = React.useState('')
  const [offeringDescription, setOfferingDescription] = React.useState('')
  const [offeringVersion, setOfferingVersion] = React.useState('')


  const [OfferingCreated] = useMutation(CREATE_OFFERING,
    {
      variables: {
        input: {
          name: offeringName,
          description: offeringDescription,
          version: offeringVersion,
        },
      },
      onCompleted: (data) => {
        console.log(data)
      },
      update(cache, { data }) {
        const { offerings } = cache.readQuery({ query: GET_OFFERING });

        cache.writeQuery({
          query: GET_OFFERING,
          data: {
            offerings: [
              data.createOfferings.offerings,
              ...offerings
            ]
          }
        })
      }

    })

  const [createOfferingUsed] = useMutation(CREATE_OFFERING_USED,
    {
      variables: {
        where: {
          id: companyId
        },
        create: {
          offeringsUsed: [
            {
              name: offeringName,
              description: offeringDescription,
              version: offeringVersion
            }
          ]
        }
      }
    })


  const [createOfferingProvide] = useMutation(CREATE_OFFERING_PROVIDE,
    {
      variables: {
        where: {
          id: companyId
        },
        create: {
          offeringsProvided: [
            {
              name: offeringName,
              description: offeringDescription,
              version: offeringVersion
            }
          ]
        }
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
    if (createfor === "OfferingUsed") {
      createOfferingUsed()
      setCreateModalOpen(false)
      setOfferingName('')
      setOfferingDescription('')
      setOfferingVersion('')
    } else if (createfor === "OfferingProvide") {
      createOfferingProvide()
      setCreateModalOpen(false)
      setOfferingName('')
      setOfferingDescription('')
      setOfferingVersion('')
    } else {
      OfferingCreated()
      setCreateModalOpen(false)
      setOfferingName('')
      setOfferingDescription('')
      setOfferingVersion('')
    }


  }

  const handleClose = () => {
    setCreateModalOpen(false)
  };


  return (
    <div>
      <Modal
        open={createModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper >
          {/* <Heading title=" Create Domain" listType="list" linkName="Domain List"></Heading> */}
          <Box className="modalBox">
            <Typography id="modal-modal-title" variant="h5" component="h2" >
              <Title>{title}</Title>
            </Typography>

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

              </Typography>
              <div className='button-container'>
                <Button
                  className="formButton"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </div>
            </form>
          </Box>
          {/* <div>
                <p className={domainId ? 'Success-message' : 'hidden-message'}>{`Domain with domainId ${domainId} is created`}</p>
            </div> */}
        </Paper>
      </Modal>
    </div>
  )
}

export default CreateOffering
