import React from 'react'
import './List.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import Heading from './Heading'



function List({ data,
  title,
  linkName,
  loading,
  error,
  onUpdateClick,
}) {


  return (
    <Paper className="root">
      <Heading title={title} linkName={linkName}></Heading>


      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {
        data && !loading && !error && (
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell> Name</TableCell>
                <TableCell >Description</TableCell>
                <TableCell></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((n, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      <Link to={{ pathname: `/details${title}`, state: { name: n.name } }}  >
                        {n.name}
                      </Link>
                    </TableCell>
                    <TableCell>{n.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => onUpdateClick(n)}>update
                      </Button>
                    </TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )
      }
    </Paper >
  )
}

export default List
