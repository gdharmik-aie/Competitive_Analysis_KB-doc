import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './CompanyList.css'

import {
    TextField,
    Button,
    Box,
    Typography,
    Modal
} from '@mui/material'
import List from '../List'


const GET_COMPANY = gql`
  query companiesPaginateQuery {
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
`

const UPDATE_COMPANY = gql`
  mutation companyUpdateMutationQuery(
    $where: CompanyWhere
    $update: CompanyUpdateInput
  ) {
    updateCompanies(where: $where, update: $update) {
      companies {
        name
        description
      }
    }
  }
`
const DELETE_COMPANY = gql`
  mutation companyDeleteMutationQuery($where: CompanyWhere) {
    deleteCompanies(where: $where) {
      nodesDeleted
    }
  }
`

function CompanyList() {
    const [open, setOpen] = React.useState(false)
    const [companyId, setCompanyId] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')
    const [companyDescription, setCompanyDescription] = React.useState('')
    const [companyWebsite, setCompanyWebsite] = React.useState('')
    const [companyCity, setCompanyCity] = React.useState('')
    const [companyRegion, setCompanyRegion] = React.useState('')
    const [companyCountry, setCompanyCountry] = React.useState('')

    const { loading, data, error } = useQuery(GET_COMPANY)

    const [updateCompanies, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_COMPANY, {
        variables: {
            where: { companyId: companyId },
            update: {
                name: companyName,
                description: companyDescription,
                website: companyWebsite,
                city: companyCity,
                region: companyRegion,
                country: companyCountry
            },
        },
    })

    const [deleteCompanies, { data: deleteMutationData, loading: deletMutaionLoading, error: deleteMutationError, }] = useMutation(DELETE_COMPANY, {
        variables: { where: { companyId: companyId } },
    })

    const onUpdateClick = (n) => {
        //console.log("here:", n)
        setCompanyId(n.id)
        setCompanyName(n.name)
        setCompanyDescription(n.description)
        setCompanyWebsite(n.website)
        setCompanyCity(n.city)
        setCompanyRegion(n.region)
        setCompanyCountry(n.country)
        setOpen(true)
    }

    const onCompanyNameChange = (e) => {
        const companyName = e.target.value
        setCompanyName(companyName)
        console.log(companyName)
    }

    const onCompanyDescriptionChange = (e) => {
        const companyDescription = e.target.value
        setCompanyDescription(companyDescription)
        console.log(companyDescription)
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
        updateCompanies()
        console.log(companyId)
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setOpen(false)
            window.location.reload()
        }
    }

    const OnDeleteCompany = (n) => {
        // setUpdateCompany(n)
        setCompanyId(n.id)
        if (companyId) {
            deleteCompanies()
            window.location.reload()
        }
        console.log(deleteMutationError)
        console.log(deletMutaionLoading)
        console.log(deleteMutationData)
        if (deleteMutationData) {
            alert(`${deleteMutationData} is deletd`)
        }
    }

    const handleClose = () => setOpen(false)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <div>
            <List
                data={data.companies}
                title="Company"
                linkName="Create Company"
                loading={loading}
                error={error}
                onUpdateClick={onUpdateClick}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modalBox">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Update Company
                    </Typography>

                    <form onSubmit={handlerSubmit}>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company Name"
                            defaultValue={companyName}
                            onChange={onCompanyNameChange}
                        ></TextField>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company Description"
                            defaultValue={companyDescription}
                            onChange={onCompanyDescriptionChange}
                        ></TextField>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company Website"
                            defaultValue={companyWebsite}
                            onChange={onCompanyWebsiteChange}
                        ></TextField>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company City"
                            defaultValue={companyCity}
                            onChange={onCompanyCityChange}
                        ></TextField>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company Region"
                            defaultValue={companyRegion}
                            onChange={onCompanyRegionChange}
                        ></TextField>
                        <TextField
                            className="textField"
                            required
                            id="outlined-required"
                            label="Company Country"
                            defaultValue={companyCountry}
                            onChange={onCompanyCountryChange}
                        ></TextField>
                        <div className="button-container">
                            <Button
                                className="formButton"
                                color="primary"
                                variant="contained"
                                onClick={() => OnDeleteCompany()}
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
            </Modal>
        </div>
    )

}

export default CompanyList