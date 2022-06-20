import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateDomain.css'
import {
    Paper,
    TextField,
    Button,
    Typography,
} from '@mui/material'
import Title from '../Title'
import { Link } from 'react-router-dom'




const CREATE_DOMAIN = gql`
 mutation userCreateMutationQuery($input: [DomainCreateInput!]!){
 createDomains(input: $input) {
    domains {
      domainId
      name
      description
    }
  }
 }
 
 
`
function CreateDomain() {

    const [domainId, setDoaminId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")


    const [createDomains, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_DOMAIN,
        { variables: { input: { name: domainName, description: domainDescription } } })





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
        createDomains()
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setDomainName("")
            setDomainDescription("")
            setDoaminId(mutationData)
        }

    }



    return (
        <Paper className="root">
            <div className='title-container'>
                <Title>
                    Create Domain
                </Title>
                <Link to="/domain" className="navLink"> <Button color="primary" variant="outlined" >
                    Domain List
                </Button></Link>
            </div>

            <p className={domainId ? 'Success-message' : 'hidden-message'}>{`Domain with domainId ${domainId} is created`}</p>

            <form onSubmit={handlerSubmit}>

                <Typography>
                    <TextField className="textField" required label="Domain Name" onChange={onDomainNameChange} value={domainName}>
                    </TextField>
                </Typography>
                <Typography>
                    <TextField className="textField" required label="Domain Description" onChange={onDomainDesChange} value={domainDescription}>
                    </TextField>
                </Typography>

                <Button className="submitButton" type='submit' color='primary'>
                    Create Domain
                </Button>
            </form>
        </Paper>
    )
}

export default CreateDomain