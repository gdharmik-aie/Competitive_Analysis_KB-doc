import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Paper, TextField, Button, Typography } from '@mui/material'
import Title from '../Title'
import { Link } from 'react-router-dom'



const CREATE_COMPANY = gql`
  mutation companyCreateMutationQuery($input: [CompanyCreateInput!]!) {
    createCompanies(input: $input) {
      companies {
        name
        description
        website
        city
        region
        country
        domain
      }
    }
  }
`
function CreateCompany() {

  /*  const [companyId, setCompanyId] = React.useState('') */
  const [companyName, setCompanyName] = React.useState('')
  const [companyDescription, setCompanyDescription] = React.useState('')
  const [companyWebsite, setCompanyWebsite] = React.useState('')
  const [companyCity, setCompanyCity] = React.useState('')
  const [companyRegion, setCompanyRegion] = React.useState('')
  const [companyCountry, setCompanyCountry] = React.useState('')
  const [companyDomain, setCompanyDomain] = React.useState('')

  const [
    createCompanies,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_COMPANY, {
    variables: {
      input: {
        name: companyName,
        description: companyDescription,
        website: companyWebsite,
        city: companyCity,
        region: companyRegion,
        country: companyCountry,
        domain: companyDomain,
      },
    },
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

  const onCompanyDomainChange = (e) => {
    const companyDomain = e.target.value
    setCompanyDomain(companyDomain)
  }

  const onCreateCompany = () => {
    createCompanies()
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    createCompanies()
    console.log(mutationError)
    console.log(mutationLoading)
    if (!mutationError) {
      setCompanyName('')
      setCompanyDescription('')
      setCompanyWebsite('')
      setCompanyCity('')
      setCompanyRegion('')
      setCompanyCountry('')
      setCompanyDomain('')
    }
  }

  return (
    <Paper className="root" style={{ width: "50%" }}>
      <div className="title-container">
        <Title>Add Company</Title>
        <Link to="/companyList" className="navLink">
          <Button color="primary" variant="outlined">
            Company List
          </Button>
        </Link>
      </div>

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
        <Typography>
          <TextField
            className="textField"
            required
            label="Company Domain"
            onChange={onCompanyDomainChange}
            value={companyDomain}
          ></TextField>
        </Typography>
        <Button
          onClick={onCreateCompany}
          variant="contained"
          className="submitButton"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Paper>
  )
}

export default CreateCompany
