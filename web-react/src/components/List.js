import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './List.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
  Button,
  Box,
  Typography,
  Modal
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Title from './Title'



const GET_USER = gql`
  query usersPaginateQuery(
    $orderBy: [UserSort]
    $filter: UserWhere
  ) {
    users(
      options: {sort: $orderBy }
      where: $filter
    ) {
      id: userId
      name
      avgStars
      numReviews
    }
  }
`

const UPDATE_USER = gql`
  mutation userUpdateMutationQuery(
   $where: UserWhere, $update: UserUpdateInput
  ){
    updateUsers(where: $where, update: $update){
       users {
         userId
         name
        }
    }
  }
`
const DETETE_USER = gql`
  mutation userDeleteMutationQuery($where: UserWhere) {
  deleteUsers(where: $where) {
     nodesDeleted
  }
}
`


function UserList() {
  const [order, setOrder] = React.useState('ASC')
  const [orderBy, setOrderBy] = React.useState('name')
  /*  const [page] = React.useState(0)
   const [rowsPerPage] = React.useState(10) */
  const [filterState, setFilterState] = React.useState({ usernameFilter: '' })
  const [open, setOpen] = React.useState(false);
  const [updateUser, setUpdateUser] = React.useState({})
  const [userId, setUserId] = React.useState("")
  const [userName, setUserName] = React.useState("")
  //const [userData, setUserData] = React.useState({})



  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { name_CONTAINS: filterState.usernameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      orderBy: { [orderBy]: order },
      filter: getFilter(),
    },
  })



  const [updateUsers, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER,
    { variables: { where: { userId: userId }, update: { userId: userId, name: userName } } })


  const [deleteUsers, { data: deleteMutationData, loading: deletMutaionLoading, error: deleteMutationError }] = useMutation(DETETE_USER,
    { variables: { where: { userId: userId, } } })


  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'DESC'

    if (orderBy === property && order === 'DESC') {
      newOrder = 'ASC'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleFilterChange = (filterName) => (event) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }
  const onUpdateUser = (n) => {
    //console.log("here:", n)
    setUpdateUser(n)
    setUserId(n.id)
    setOpen(true);
  }


  const onUserIdChange = (e) => {
    const userId = e.target.value
    setUserId(userId)
    console.log(userId)
  }

  const onUserNameChange = (e) => {
    const userName = e.target.value
    setUserName(userName)
    console.log(userName)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    updateUsers()
    console.log(userId)
    console.log(mutationError)
    console.log(mutationLoading)
    if (!mutationError) {
      setOpen(false)
      window.location.reload()
    }
  }

  const OnDeleteUser = (n) => {
    setUpdateUser(n)
    setUserId(n.id)
    if (userId) {
      deleteUsers()
      window.location.reload()
    }
    console.log(deleteMutationError)
    console.log(deletMutaionLoading)
    console.log(deleteMutationData)
    if (deleteMutationData) {
      alert(`${deleteMutationData} is deletd`)
    }

  }

  const handleClose = () => setOpen(false);

  return (
    <Paper className="root">
      <div className='title-container'>
        <Title>
          User List
        </Title>
        <Link to="/createuser" className="navLink"> <Button color="primary" variant="outlined">
          Create User
        </Button></Link>
      </div>
      <TextField
        id="search"
        label="User Name Contains"
        className="textField"
        value={filterState.usernameFilter}
        onChange={handleFilterChange('usernameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: "input"
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell key="userId">User Id</TableCell>
              <TableCell
                key="name"
                sortDirection={orderBy === 'name' ? order.toLowerCase() : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={order.toLowerCase()}
                    onClick={() => handleSortRequest('name')}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell key="avgStars">Average Stars</TableCell>
              <TableCell key="numReviews">Number of Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((n, i) => {
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {n.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>
                    {n.avgStars ? n.avgStars.toFixed(2) : '-'}
                  </TableCell>
                  <TableCell>{n.numReviews}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => onUpdateUser(n)}>update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className='formButton' color="default" variant="contained" onClick={() => OnDeleteUser(n)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalBox">
          <Typography id="modal-modal-title" variant="h5" component="h2" >
            Update user
          </Typography>

          <form onSubmit={handlerSubmit}>
            <TextField
              className='textField'
              required
              id="outlined-required"
              label="User Id"
              defaultValue={updateUser.id}
              onChange={onUserIdChange}
            ></TextField>
            <TextField
              className='textField'
              required
              id="outlined-required"
              label="User Name"
              defaultValue={updateUser.name}
              onChange={onUserNameChange}
            ></TextField>
            <div className='textfield-container'>
              <TextField
                className='textField'
                id="outlined-required"
                label="Review Count"
                defaultValue={updateUser.numReviews}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
              <TextField
                className='textField'
                id="outlined-required"
                label="Average star"
                defaultValue={updateUser.avgStars}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </div>
            <div className='button-container'>
              <Button className='formButton' color="primary" variant="contained" type='submit'>Submit</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Paper>
  )
}

export default UserList
