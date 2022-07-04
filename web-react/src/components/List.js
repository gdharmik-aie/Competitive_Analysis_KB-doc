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
import VerticalToggleButtons from './Toggle'
import CardView from './CardView'

function List({ data,
  title,
  linkName,
  loading,
  error,
  onUpdateClick,
}) {

  const [listView, setListView] = React.useState(true)

  function buttonClick() {
    setListView(!listView)
  }

  return (
    <div>

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <Paper className="root">
          <Heading title={title} linkName={linkName}></Heading>
          <div className="toggle-button">
            <VerticalToggleButtons callBack={buttonClick}></VerticalToggleButtons>
          </div>

          {listView ?

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
                        <Link to={{ pathname: `/details${title}`, state: { id: n.id } }}  >
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


            : <div className='card-container'>
              {data.map((n, i) => {
                return (<CardView data={n} title={title} key={i} ></CardView>)
              })}
            </div>}

        </Paper>)
      }
    </div>

  )
}

export default List
