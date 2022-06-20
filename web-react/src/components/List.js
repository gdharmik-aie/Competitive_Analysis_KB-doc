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
import Title from './Title'


function List({ data,
  title,
  loading,
  error,
  onUpdateClick,
}) {
  /*  const [entityData, setEntityData] = React.useState([])
 
   useEffect(() => {
     async function getData() {
       console.log(data)
       if (data.domains) {
         setEntityData(data.domains)
       } else if (data.comapnies) {
         setEntityData(data.comapnies)
       } else if (data.offereing) {
         setEntityData(data.offereing)
       }
     }
     getData();
   }, []) */
  /* const [open, setOpen] = React.useState(false); */
  /*  const [Id, setId] = React.useState("")
   const [name, setName] = React.useState("")
   const [description, setDescription] = React.useState("") */



  /*
    const onNameChange = (e) => {
      const Name = e.target.value
      setName(Name)
    }
  
    const onDesChange = (e) => {
      const Des = e.target.value
      setDescription(Des)
    }
  
    const handlerSubmit = (e) => {
      e.preventDefault()
      updateEntity()
      if (!updateMutationError) {
        setOpen(false)
        window.location.reload()
      }
    }
  
    const OnDelete = () => {
      console.log(Id)
      if (Id) {
        deleteEntity()
        window.location.reload()
      }
      console.log(deleteMutationError)
      console.log(deleteMutationData)
      if (deleteMutationData) {
        alert(`${deleteMutationData} is deletd`)
      }
    }
  
   const handleClose = () => setOpen(false); */


  return (
    <Paper className="root">
      <div className='title-container'>
        <Title>
          {title}
        </Title>
        <Link to={`/create${title}`} className="navLink"> <Button color="primary" variant="outlined">
          Create {title}
        </Button></Link>
      </div>


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

      {/*   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalBox">
          <Typography id="modal-modal-title" variant="h5" component="h2" >
            Update
          </Typography>

          <form onSubmit={handlerSubmit}>
            <TextField
              className='TextField'
              required
              id="outlined-required"
              label="Domain Name"
              defaultValue={name}
              onChange={onNameChange}
            ></TextField>
            <TextField
              className='TextField'
              required
              id="outlined-required"
              label="Domain Description"
              defaultValue={description}
              onChange={onDesChange}
            ></TextField>
            <div className='button-container'>
              <Button className='formButton' color="default" variant="contained" onClick={() => OnDelete()}>
                Delete
              </Button>
              <Button className='formButton' color="primary" variant="contained" type='submit'>Submit</Button>
            </div>
          </form>
        </Box>
      </Modal> */}
    </Paper >
  )
}

export default List
