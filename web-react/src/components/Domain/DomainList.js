import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './DomainList.css'
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
    Modal
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Title from '../Title'

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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "white",
        border: "none",
        boxShadow: 24,
        padding: 24
    },
    navLink: {
        textDecoration: 'none',
        color: 'inherit',
    }
})

const GET_DOMAIN = gql`
  query domainsPaginateQuery(
    $orderBy: [DomainSort]
    $filter: DomainWhere
  ) {
    domains(
      options: {sort: $orderBy }
      where: $filter
    ) {
      domainId
      name
      description
    }
  }
`

const UPDATE_DOMAIN = gql`
  mutation domainUpdateMutationQuery(
   $where: DomainWhere, $update: DomainUpdateInput
  ){
    updateDomains(where: $where, update: $update){
       domains {
         domainId
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


function DomainList(props) {
    const { classes } = props
    const [order, setOrder] = React.useState('ASC')
    const [orderBy, setOrderBy] = React.useState('name')
    /*  const [page] = React.useState(0)
     const [rowsPerPage] = React.useState(10) */
    const [filterState, setFilterState] = React.useState({ domainnameFilter: '' })
    const [open, setOpen] = React.useState(false);
    // const [updateDomains, setUpdateDoamins] = React.useState({})
    const [domainId, setDomainId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")
    //const [userData, setUserData] = React.useState({})



    const getFilter = () => {
        return filterState.domainnameFilter.length > 0
            ? { name_CONTAINS: filterState.domainnameFilter }
            : {}
    }

    const { loading, data, error } = useQuery(GET_DOMAIN, {
        variables: {
            orderBy: { [orderBy]: order },
            filter: getFilter(),
        },
    })



    const [updateDomain, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_DOMAIN,
        { variables: { where: { domainId: domainId }, update: { name: domainName, description: domainDescription } } })


    const [deleteDomain, { data: deleteMutationData, loading: deletMutaionLoading, error: deleteMutationError }] = useMutation(DETETE_USER,
        { variables: { where: { domainId: domainId, } } })


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

    const onUpdateDaomin = (n) => {
        //console.log("here:", n)

        setDomainId(n.domainId)
        setDomainName(n.name)
        setDomainDescription(n.description)
        setOpen(true);
    }

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
        console.log(mutationLoading)
        if (!mutationError) {
            setOpen(false)
            window.location.reload()
        }
    }

    const OnDeleteDomain = (n) => {
        setDomainId(n.domainId)
        if (domainId) {
            deleteDomain()
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
        <Paper className={classes.root}>
            <div className='title-container'>
                <Title>
                    Domain List
                </Title>
                <Link to="/createDomain" className={classes.navLink}> <Button color="primary" variant="outlined">
                    Create Domain
                </Button></Link>
            </div>
            <TextField
                id="search"
                label="Domain Name Contains"
                className={classes.textField}
                value={filterState.domainnameFilter}
                onChange={handleFilterChange('domainnameFilter')}
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
                            <TableCell key="userId">Domain Id</TableCell>
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

                            <TableCell key="numReviews">Domain Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.domains.map((n, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {n.domainId}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {n.name}
                                    </TableCell>

                                    <TableCell>{n.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => onUpdateDaomin(n)}>update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className='formButton' color="default" variant="contained" onClick={() => OnDeleteDomain(n)}>
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
                <Box className={classes.modalBox}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" >
                        Update Domain
                    </Typography>

                    <form onSubmit={handlerSubmit}>
                        <TextField
                            className='textField'
                            required
                            id="outlined-required"
                            label="Daomin Id"
                            defaultValue={domainId}
                            InputProps={{
                                readOnly: true,
                            }}
                        ></TextField>
                        <TextField
                            className='textField'
                            required
                            id="outlined-required"
                            label="Domain Name"
                            defaultValue={domainName}
                            onChange={onDomainNameChange}
                        ></TextField>
                        <TextField
                            className='textField'
                            required
                            id="outlined-required"
                            label="Domain Description"
                            defaultValue={domainDescription}
                            onChange={onDomainDesChange}
                        ></TextField>
                        <div className='button-container'>
                            <Button className='formButton' color="primary" variant="contained" type='submit'>Submit</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </Paper>
    )
}

export default withStyles(styles)(DomainList)
