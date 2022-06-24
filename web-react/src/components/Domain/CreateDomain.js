import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateDomain.css'
import {
    Paper,
    TextField,
    Button,
    Typography,
} from '@mui/material'
import Heading from '../Heading'

const CREATE_DOMAIN = gql`
 mutation userCreateMutationQuery($input: [DomainCreateInput!]!){
 createDomains(input: $input) {
    domains {
      id
      name
      description
    }
  }
 }
`
function CreateDomain() {

    /*  const [domainId, setDoaminId] = React.useState("") */
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
        console.log(mutationData)
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setDomainName("")
            setDomainDescription("")

        }

    }



    return (
        <Paper className="root createDomain">
            <Heading title=" Create Domain" linkName="Domain List"></Heading>

            <form onSubmit={handlerSubmit}>
                <Typography>
                    <TextField className="textField" required label="Domain Name" onChange={onDomainNameChange} value={domainName}>
                    </TextField>
                </Typography>
                <Typography>
                    <TextField className="textField" required label="Domain Description" onChange={onDomainDesChange} value={domainDescription}>
                    </TextField>
                </Typography>
                <div className='button-container'>
                    <Button className="formButton" type='submit' variant="contained" color='primary'>
                        Create Domain
                    </Button>
                </div>
            </form>
            {/* <div>
                <p className={domainId ? 'Success-message' : 'hidden-message'}>{`Domain with domainId ${domainId} is created`}</p>
            </div> */}
        </Paper>
    )
}

export default CreateDomain