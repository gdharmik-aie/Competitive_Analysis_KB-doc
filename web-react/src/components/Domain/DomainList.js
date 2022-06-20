import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './DomainList.css'
import {
    TextField,
    Button,
    Box,
    Typography,
    Modal
} from '@mui/material'
import List from '../List'


const GET_DOMAIN = gql`
  query domainsPaginateQuery {
    domains {
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


function DomainList() {
    /*
    const [page] = React.useState(0)
    const [rowsPerPage] = React.useState(10) 
   
 */

    const [open, setOpen] = React.useState(false);
    const [domainId, setDomainId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")


    const { loading, data, error } = useQuery(GET_DOMAIN)

    const [updateDomain, { error: mutationError }] = useMutation(UPDATE_DOMAIN,
        { variables: { where: { domainId: domainId }, update: { name: domainName, description: domainDescription } } })

    const [deleteDomain, { data: deleteMutationData, error: deleteMutationError }] = useMutation(DETETE_USER,
        { variables: { where: { domainId: domainId, } } })


    const onUpdateClick = (n) => {
        // console.log("here:", n)
        setDomainId(n.domainId)
        setDomainName(n.name)
        setDomainDescription(n.description)
        setOpen(true)
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
        if (!mutationError) {
            setOpen(false)
            window.location.reload()
        }
    }

    const OnDeleteDomain = () => {
        //setDomainId(updateData.domainId)
        if (domainId) {
            deleteDomain()
            setOpen(false)
            window.location.reload()
        }
        console.log(deleteMutationError)
        console.log(deleteMutationData)
        if (deleteMutationData) {
            alert(`${deleteMutationData} is deletd`)
        }
    }

    const handleClose = () => setOpen(false);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <div>

            <List
                data={data.domains}
                title="Domain"
                loading={loading}
                error={error}
                onUpdateClick={onUpdateClick}

            />



            {/* <div className='title-container'>
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
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.domains.map((n, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            <Link to={{ pathname: "/detailsDomain", state: { name: n.name } }}  >
                                                {n.name}
                                            </Link>
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
 */}
            <Modal
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
                            defaultValue={domainName}
                            onChange={onDomainNameChange}
                        ></TextField>
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Domain Description"
                            defaultValue={domainDescription}
                            onChange={onDomainDesChange}
                        ></TextField>
                        <div className='button-container'>
                            <Button className='formButton' color="primary" variant="contained" onClick={() => OnDeleteDomain()}>
                                Delete
                            </Button>
                            <Button className='formButton' color="primary" variant="contained" type='submit'>Submit</Button>
                        </div>
                    </form>
                </Box>
            </Modal>

        </div>
    )
}

export default DomainList
