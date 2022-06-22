import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './DomainList.css'
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
import List from '../List'
import Title from '../Title'
import { Link } from 'react-router-dom'
import VerticalToggleButtons from '../Toggle'

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
    $where: DomainWhere
    $update: DomainUpdateInput
  ) {
    updateDomains(where: $where, update: $update) {
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

  const [open, setOpen] = React.useState(false)
  const [domainId, setDomainId] = React.useState('')
  const [domainName, setDomainName] = React.useState('')
  const [domainDescription, setDomainDescription] = React.useState('')
  const [listView, setListView] = React.useState(true)

  const { loading, data, error } = useQuery(GET_DOMAIN)

  const [updateDomain, { error: mutationError }] = useMutation(UPDATE_DOMAIN, {
    variables: {
      where: { domainId: domainId },
      update: { name: domainName, description: domainDescription },
    },
  })

  const [
    deleteDomain,
    { data: deleteMutationData, error: deleteMutationError },
  ] = useMutation(DETETE_USER, { variables: { where: { domainId: domainId } } })

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

  const handleClose = () => setOpen(false)

  function buttonClick() {
    setListView(!listView)
  }

  if (loading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>
  console.log(data.domains)
  return (
    <div>
      <div className="title-container">
        <Title>Domain</Title>
        <Link to={`/createDomain`} className="navLink">
          {' '}
          <Button color="primary" variant="outlined">
            Create Domain
          </Button>
        </Link>
      </div>
      <div className="toggle-button">
        <VerticalToggleButtons callBack={buttonClick}></VerticalToggleButtons>
      </div>
      {listView ? (
        <List
          title="Domain"
          data={data.domains}
          loading={loading}
          error={error}
          onUpdateClick={onUpdateClick}
        />
      ) : data.domains ? (
        <div>
          {data.domains.map((n, i) => {
            return (
              <div key={i}>
                <Box sx={{ width: '30%' }}>
                  <div style={{ display: 'inline-block' }}>
                    <Card variant="outlined">
                      <React.Fragment>
                        <CardContent>
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
              </div>
            )
          })}
        </div>
      ) : (
        <div>No data found</div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalBox">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Update
          </Typography>

          <form onSubmit={handlerSubmit}>
            <TextField
              className="TextField"
              required
              id="outlined-required"
              label="Domain Name"
              defaultValue={domainName}
              onChange={onDomainNameChange}
            ></TextField>
            <TextField
              className="TextField"
              required
              id="outlined-required"
              label="Domain Description"
              defaultValue={domainDescription}
              onChange={onDomainDesChange}
            ></TextField>
            <div className="button-container">
              <Button
                className="formButton"
                color="primary"
                variant="contained"
                onClick={() => OnDeleteDomain()}
              >
                Delete
              </Button>
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
    </div>
  )
}

export default DomainList
