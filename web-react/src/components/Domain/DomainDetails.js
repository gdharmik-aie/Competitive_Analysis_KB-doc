import React from 'react'
import { useLocation } from 'react-router-dom'
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
  // TextField,
  // InputLabel,
  Card,
  CardActions,
  Typography,
  Box,
  CardContent,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Title from '../Title'

const GET_DOMAIN = gql`
  query domainsPaginateQuery($where: DomainWhere) {
    domains(where: $where) {
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
  const location = useLocation()
  const { name } = location.state
  const { loading, data, error } = useQuery(GET_DOMAIN, {
    variables: { where: { name: name } },
  })
  //console.log(data.domains[0].parentDomains)

  return (
    <Paper className="root">
      <div className="title-container">
        <Title>Domain Details</Title>
        <Link to="/domain" className="navLink">
          {' '}
          <Button color="primary" variant="outlined">
            Domain List
          </Button>
        </Link>
      </div>

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <div>
          {data.domains.map((n, i) => {
            return (
              <div key={i}>
                <Box sx={{ width: '30%' }}>
                  <div style={{ display: 'inline-block' }}>
                    <Card variant="outlined">
                      <React.Fragment>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            ID: {n.domainId}
                          </Typography>
                          <Typography variant="h5" component="div">
                            Name: {n.name}
                          </Typography>
                          <Typography variant="body2">
                            Description: {n.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </React.Fragment>
                    </Card>
                  </div>
                </Box>
                <div className="title-container">
                  <Title>Domain parent domain Details</Title>
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
