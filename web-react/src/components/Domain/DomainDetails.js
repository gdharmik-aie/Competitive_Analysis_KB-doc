import React from 'react'
import { useLocation } from "react-router-dom";
import { useQuery, gql } from '@apollo/client'
import './DomainDetails.css'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    InputLabel

} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Title from '../Title'




const GET_DOMAIN = gql`
  query domainsPaginateQuery($where: DomainWhere) {
    domains(where: $where){
       domainId
       name
       description
    parentDomains {
      domainId
      name
      description
    }
    }
  }
`

function DomainDetails() {
    const location = useLocation();
    const { name } = location.state
    const { loading, data, error } = useQuery(GET_DOMAIN, {
        variables: { where: { name: name, } },
    })
    //console.log(data.domains[0].parentDomains)

    return (
        <Paper className="root">
            <div className='title-container'>
                <Title>
                    Domain Details
                </Title>
                <Link to="/domain" className="navLink"> <Button color="primary" variant="outlined" >
                    Domain List
                </Button></Link>
            </div>

            {loading && !error && <p>Loading...</p>}
            {error && !loading && <p>Error {console.log(error)}</p>}
            {data && !loading && !error && (
                <div>
                    {data.domains.map((n, i) => {
                        return (
                            <div key={i}>
                                <div >
                                    <div >
                                        <InputLabel className='inputLable'>Domain id</InputLabel>
                                        <TextField className='textField' variant="standard" defaultValue={n.domainId} InputProps={{
                                            readOnly: true,
                                        }}></TextField>
                                    </div>
                                    <div >
                                        <InputLabel className='inputLable'>Domain name</InputLabel>
                                        <TextField className='textField' variant="standard" defaultValue={n.name} InputProps={{
                                            readOnly: true,
                                        }}></TextField>
                                    </div>
                                    <div >
                                        <InputLabel className='inputLable'>Domain Description</InputLabel>
                                        <TextField className='textField' variant="standard" defaultValue={n.description} InputProps={{
                                            readOnly: true,
                                        }}></TextField>
                                    </div>
                                </div>

                                <div className='title-container'>
                                    <Title>
                                        Domain parent domain Details
                                    </Title>
                                </div>
                                <Table className="table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key="userId">Domain Id</TableCell>
                                            <TableCell key="name">Name</TableCell>
                                            <TableCell key="numReviews">Domain Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.domains[i].parentDomains.map((n, j) => {
                                            return (
                                                <TableRow key={j}>
                                                    <TableCell component="th" scope="row">
                                                        {n.domainId}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {n.name}
                                                    </TableCell>
                                                    <TableCell>{n.description}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    })}
                </div>
            )}
        </Paper>
    )
}

export default DomainDetails