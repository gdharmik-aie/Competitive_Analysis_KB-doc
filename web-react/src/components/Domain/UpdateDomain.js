import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import './DomainList.css'

import {
    TextField,
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'
import Title from '../Title'



const UPDATE_DOMAIN = gql`
  mutation domainUpdateMutationQuery(
   $where: DomainWhere, $update: DomainUpdateInput
  ){
    updateDomains(where: $where, update: $update){
       domains {
         id
         description
        }
    }
  }
`
const DETETE_USER = gql`
  mutation domainDeleteMutationQuery($where: DomainWhere) {
  deleteDomains(where: $where) {
     nodesDeleted
  }
} 
`

export default function UpdateDomain({ open, setOpen, domainData }) {

    const [domainId, setDomainId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")
    //const [domainData, setDomianData] = React.useState({})



    useEffect(() => {
        function setData() {
            setDomainId(domainData.id)
            setDomainName(domainData.name)
            setDomainDescription(domainData.description)

        }

        setData()
    }, [domainData])



    const [updateDomain, { error: mutationError }] = useMutation(UPDATE_DOMAIN,
        { variables: { where: { id: domainId }, update: { name: domainName, description: domainDescription } } })

    const [deleteDomain, { data: deleteMutationData, error: deleteMutationError }] = useMutation(DETETE_USER,
        { variables: { where: { id: domainId, } } })

    const onDomainNameChange = (e) => {
        const domainName = e.target.value
        setDomainName(domainName)
    }
    const onDomainDesChange = (e) => {
        const domainDes = e.target.value
        setDomainDescription(domainDes)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        updateDomain()

        console.log(mutationError)
        if (!mutationError) {
            setOpen(false)
            window.location.reload()
        }
    }

    const OnDeleteDomain = () => {
        //setDomainId(updateData.domainId)
        if (domainId) {
            deleteDomain()
            setOpen(false)
            window.location.reload()
        }
        console.log(deleteMutationError)
        console.log(deleteMutationData)
        if (deleteMutationData) {
            alert(`${deleteMutationData} is deletd`)
        }
    }

    const handleClose = () => setOpen(false);



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper  >
                    <Box className="modalBox">
                        <Typography id="modal-modal-title" variant="h5" component="h2" >
                            <Title>
                                Update Domain
                            </Title>
                        </Typography>

                        <form onSubmit={handlerSubmit}>

                            <TextField
                                className='TextField'
                                required
                                id="outlined-required"
                                label="Domain Name"
                                defaultValue={domainName}
                                onChange={onDomainNameChange}
                            ></TextField>
                            <TextField
                                className='TextField'
                                required
                                id="outlined-required"
                                label="Domain Description"
                                defaultValue={domainDescription}
                                onChange={onDomainDesChange}
                            ></TextField>


                            <div className='button-container'>
                                <Button className='formButton' color="primary" variant="contained" onClick={() => OnDeleteDomain()}>
                                    Delete
                                </Button>
                                <Button className='formButton' color="primary" variant="contained" type='submit'>Submit</Button>
                            </div>

                        </form>
                    </Box>
                </Paper>
            </Modal></div>
    )
}
