import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './CompanyList.css'
import { withStyles } from '@material-ui/core/styles'
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
  Modal,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 24,
    padding: 24,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
})

const GET_COMPANY = gql`
  query companiesPaginateQuery($orderBy: [CompanySort], $filter: CompanyWhere) {
    companies(options: { sort: $orderBy }, where: $filter) {
      name
      description
      website
      city
      region
      country
      domain
    }
  }
`

const UPDATE_COMPANY = gql`
  mutation companyUpdateMutationQuery(
    $where: CompanyWhere
    $update: CompanyUpdateInput
  ) {
    updateCompanies(where: $where, update: $update) {
      companies {
        name
        description
      }
    }
  }
`
const DELETE_COMPANY = gql`
  mutation companyDeleteMutationQuery($where: CompanyWhere) {
    deleteCompanies(where: $where) {
      nodesDeleted
    }
  }
`

function CompanyList(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('ASC')
  const [orderBy, setOrderBy] = React.useState('name')
  /*  const [page] = React.useState(0)
   const [rowsPerPage] = React.useState(10) */
  const [filterState, setFilterState] = React.useState({
    companynameFilter: '',
  })
  const [open, setOpen] = React.useState(false)
  /* const [updateCompany, setUpdateCompany] = React.useState('') */
  const [companyId, setCompanyId] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [companyDescription, setCompanyDescription] = React.useState('')
  const [companyWebsite, setCompanyWebsite] = React.useState('')
  const [companyCity, setCompanyCity] = React.useState('')
  const [companyRegion, setCompanyRegion] = React.useState('')
  const [companyCountry, setCompanyCountry] = React.useState('')
  const [companyDomain, setCompanyDomain] = React.useState('')
  //const [userData, setUserData] = React.useState({})

  const getFilter = () => {
    return filterState.companynameFilter.length > 0
      ? { name_CONTAINS: filterState.companynameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_COMPANY, {
    variables: {
      orderBy: { [orderBy]: order },
      filter: getFilter(),
    },
  })

  const [
    updateCompanies,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_COMPANY, {
    variables: {
      where: { companyId: companyId },
      update: {
        name: companyName,
        description: companyDescription,
        website: companyWebsite,
        city: companyCity,
        region: companyRegion,
        country: companyCountry,
        domain: companyDomain,
      },
    },
  })

  const [
    deleteCompanies,
    {
      data: deleteMutationData,
      loading: deletMutaionLoading,
      error: deleteMutationError,
    },
  ] = useMutation(DELETE_COMPANY, {
    variables: { where: { companyId: companyId } },
  })

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
  const onUpdateCompany = (n) => {
    //console.log("here:", n)
    setCompanyId(n.id)
    setCompanyName(n.name)
    setCompanyDescription(n.description)
    setCompanyWebsite(n.website)
    setCompanyCity(n.city)
    setCompanyRegion(n.region)
    setCompanyCountry(n.country)
    setOpen(true)
  }

  const onCompanyNameChange = (e) => {
    const companyName = e.target.value
    setCompanyName(companyName)
    console.log(companyName)
  }

  const onCompanyDescriptionChange = (e) => {
    const companyDescription = e.target.value
    setCompanyDescription(companyDescription)
    console.log(companyDescription)
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

  const onCompanyDomainChange = (e) => {
    const companyDomain = e.target.value
    setCompanyDomain(companyDomain)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    updateCompanies()
    console.log(companyId)
    console.log(mutationError)
    console.log(mutationLoading)
    if (!mutationError) {
      setOpen(false)
      window.location.reload()
    }
  }

  const OnDeleteCompany = (n) => {
    // setUpdateCompany(n)
    setCompanyId(n.id)
    if (companyId) {
      deleteCompanies()
      window.location.reload()
    }
    console.log(deleteMutationError)
    console.log(deletMutaionLoading)
    console.log(deleteMutationData)
    if (deleteMutationData) {
      alert(`${deleteMutationData} is deletd`)
    }
  }

  const handleClose = () => setOpen(false)

  return (
    <Paper className={classes.root}>
      <div className="title-container">
        <Title>Company List</Title>
        <Link to="/createuser" className={classes.navLink}>
          {' '}
          <Button color="primary" variant="outlined">
            Add Company
          </Button>
        </Link>
      </div>
      <TextField
        id="search"
        label="Company Name Contains"
        className={classes.textField}
        value={filterState.companynameFilter}
        onChange={handleFilterChange('companynameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell key="userId">Company Id</TableCell>
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
            {data.companies.map((n, i) => {
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {n.companyid}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={{
                        pathname: '/detailsCompany',
                        state: { name: n.name },
                      }}
                    >
                      {n.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => onUpdateCompany(n)}
                    >
                      Update Company
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="formButton"
                      color="default"
                      variant="contained"
                      onClick={() => OnDeleteCompany(n)}
                    >
                      Delete Company
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
        <Box className={classes.modalBox}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Update Company
          </Typography>

          <form onSubmit={handlerSubmit}>
            <TextField
              className="textField"
              required
              id="outlined-required"
              label="Company Id"
              defaultValue={companyId}
            ></TextField>
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
            <TextField
              className="textField"
              required
              id="outlined-required"
              label="Company Domain"
              defaultValue={companyDomain}
              onChange={onCompanyDomainChange}
            ></TextField>
            <div className="button-container">
              <Button
                className="formButton"
                color="primary"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Paper>
  )
}

export default withStyles(styles)(CompanyList)
