import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Modal,
} from '@mui/material'
import Title from '../Title'


const CREATE_COMPANY = gql`
  mutation companyCreateMutationQuery($input: [CompanyCreateInput!]!) {
    createCompanies(input: $input) {
      companies {
          id
          name
          description
          website
          city
         region
         country
      }
    }
  }
`

const CREATE_PROVIDER_COMPANY = gql`
mutation UpdateProviderCompanies($where: OfferingWhere, $create: OfferingRelationInput) {
  updateOfferings(where: $where, create: $create) {
    offerings {
      id
      name
      description
      version
      provider {
        id
        name
        description
        website
        city
        region
        country
      }
    }
  }
}
`

function CreateCompany({ title, createModalOpen, setCreateModalOpen, GET_COMPANY, createfor, offeringId }) {

  /*  const [companyId, setCompanyId] = React.useState('') */
  const [companyName, setCompanyName] = React.useState('')
  const [companyDescription, setCompanyDescription] = React.useState('')
  const [companyWebsite, setCompanyWebsite] = React.useState('')
  const [companyCity, setCompanyCity] = React.useState('')
  const [companyRegion, setCompanyRegion] = React.useState('')
  const [companyCountry, setCompanyCountry] = React.useState('')


  const [companyCreated] = useMutation(CREATE_COMPANY,
    {
      variables: {
        input: {
          name: companyName,
          description: companyDescription,
          website: companyWebsite,
          city: companyCity,
          region: companyRegion,
          country: companyCountry,

        }
      },
      onCompleted: (data) => {
        console.log(data)
      },
      update(cache, { data }) {
        const { companies } = cache.readQuery({ query: GET_COMPANY });

        cache.writeQuery({
          query: GET_COMPANY,
          data: {
            companies: [
              data.createCompanies.companies,
              ...companies
            ]
          }
        });
      }
    })

  const [createProviderCompany] = useMutation(CREATE_PROVIDER_COMPANY,
    {
      variables: {
        where: {
          id: offeringId
        },
        create: {
          provider: [
            {
              name: companyName,
              description: companyDescription,
              website: companyWebsite,
              city: companyCity,
              region: companyRegion,
              country: companyCountry
            }
          ]
        }
      }, onCompleted: (data) => {
        console.log(data)
      }
    })

  const onCompanyNameChange = (e) => {
    const companyName = e.target.value
    setCompanyName(companyName)
  }

  const onCompanyDescriptionChange = (e) => {
    const companyDescription = e.target.value
    setCompanyDescription(companyDescription)
  }

  const onCompanyWebsiteChange = (e) => {
    const companyWebsite = e.target.value
    setCompanyWebsite(companyWebsite)
  }

  const onCompanyCityChange = (e) => {
    const companyCity = e.target.value
    setCompanyCity(companyCity)
  }

  const onCompanyRegionChange = (e) => {
    const companyRegion = e.target.value
    setCompanyRegion(companyRegion)
  }

  const onCompanyCountryChange = (e) => {
    const companyCountry = e.target.value
    setCompanyCountry(companyCountry)
  }




  const handlerSubmit = (e) => {
    e.preventDefault()
    if (createfor === "Offering") {
      createProviderCompany()
      setCreateModalOpen(false)
      setCompanyName('')
      setCompanyDescription('')
      setCompanyWebsite('')
      setCompanyCity('')
      setCompanyRegion('')
      setCompanyCountry('')
    } else {
      companyCreated()
      setCreateModalOpen(false)
      setCompanyName('')
      setCompanyDescription('')
      setCompanyWebsite('')
      setCompanyCity('')
      setCompanyRegion('')
      setCompanyCountry('')
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
                  label="Company Name"
                  onChange={onCompanyNameChange}
                  value={companyName}
                ></TextField>
              </Typography>
              <Typography>
                <TextField
                  className="textField"
                  required
                  label="Company Description"
                  onChange={onCompanyDescriptionChange}
                  value={companyDescription}
                ></TextField>
              </Typography>
              <Typography>
                <TextField
                  className="textField"
                  required
                  label="Company Website"
                  onChange={onCompanyWebsiteChange}
                  value={companyWebsite}
                ></TextField>
              </Typography>
              <Typography>
                <TextField
                  className="textField"
                  required
                  label="Company City"
                  onChange={onCompanyCityChange}
                  value={companyCity}
                ></TextField>
              </Typography>
              <Typography>
                <TextField
                  className="textField"
                  required
                  label="Company Region"
                  onChange={onCompanyRegionChange}
                  value={companyRegion}
                ></TextField>
              </Typography>{' '}
              <Typography>
                <TextField
                  className="textField"
                  required
                  label="Company Country"
                  onChange={onCompanyCountryChange}
                  value={companyCountry}
                ></TextField>
              </Typography>
              <div className='button-container'>
                <Button
                  className="formButton"
                  variant="contained"
                  type="submit"
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

export default CreateCompany
