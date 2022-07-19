import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import './CompanyList.css'

import {
    TextField,
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'
import Title from '../Title'

const UPDATE_COMPANY = gql`
  mutation companyUpdateMutation(
    $where: CompanyWhere
    $update: CompanyUpdateInput
  ) {
    updateCompanies(where: $where, update: $update) {
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

function UpdateCompany({ open, setOpen, updateCompanyData, setUpdateCompanyData }) {

    const [companyId, setCompanyId] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')
    const [companyDescription, setCompanyDescription] = React.useState('')
    const [companyWebsite, setCompanyWebsite] = React.useState('')
    const [companyCity, setCompanyCity] = React.useState('')
    const [companyRegion, setCompanyRegion] = React.useState('')
    const [companyCountry, setCompanyCountry] = React.useState('')


    useEffect(() => {
        function setData() {
            console.log(updateCompanies)
            setCompanyId(updateCompanyData.id)
            setCompanyName(updateCompanyData.name)
            setCompanyDescription(updateCompanyData.description)
            setCompanyWebsite(updateCompanyData.website)
            setCompanyCity(updateCompanyData.city)
            setCompanyRegion(updateCompanyData.region)
            setCompanyCountry(updateCompanyData.country)

        }

        setData()
    }, [updateCompanyData])

    const [updateCompanies, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_COMPANY, {
        variables: {
            where: { id: companyId },
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
        updateCompanies()
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setOpen(false)
        }
    }


    const handleClose = () => {
        setUpdateCompanyData("")
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
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            <Title>
                                Update Company
                            </Title>
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
                                    type="submit"
                                >
                                    Update
                                </Button>

                            </div>
                        </form>
                    </Box>
                </Paper>
            </Modal>
        </div>
    )
}

export default UpdateCompany