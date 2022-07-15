import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import './DomainDetails.css'
import List from '../List'
import {
  Paper,
  Card,
  CardActions,
  Typography,
  Box,
  CardContent,
} from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Heading from '../Heading'
import UpdateDomain from './UpdateDomain'
import CreateDomain from './CreateDomain'
import DeleteDomain from './DeleteDomain'
/* import CardView from '../CardView' */

const GET_SINGLE_DOMAIN = gql`
  query domainsPaginateQuery($where: DomainWhere) {
    domains(where: $where){
    id
    name
    description
    childDomains {
      id
      name
      description
    }
    parentDomains {
      id
      name
      description
    }
    }
  }
`



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="tabPanel">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function DomainDetails() {
  const location = useLocation()
  const { id } = location.state
  const [domainId, setDomainId] = React.useState("")
  const [updateDomainData, setUpdateDomainData] = React.useState("")
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUpdateDomainData("")
  };

  const [open, setOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [domainDeleteId, setDomainDeleteId] = React.useState('')


  const { loading, data, error } = useQuery(GET_SINGLE_DOMAIN, {
    variables: { where: { id: id } },
  })



  const onUpdateClick = (n) => {
    // console.log("here:", n)
    setUpdateDomainData(n)
    setOpen(true)
  }


  const onCreateClick = () => {

    setDomainId(id)
    setCreateOpen(true)
  }

  const onDeleteClick = (n) => {
    console.log(n.id)
    setDomainDeleteId(n.id)
    setDeleteModalOpen(true)
  }

  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <div>


          {data.domains.map((n, i) => {
            return (
              <div key={i}>
                <Paper className="root domainDeatils" >
                  <Heading title="Domain Details" listType="list" linkName="Domain List"></Heading>
                  <Card className='cardDetail'>
                    <React.Fragment>
                      <CardContent className='cardContent'>
                        <Typography variant="body1" component="header" className='cardHeader'>
                          Name: {n.name}
                        </Typography>
                        <Typography variant="body1" component="desc">
                          Description: {n.description}
                        </Typography>

                      </CardContent>
                      <CardActions>
                        <Typography variant="body1" component="desc">
                          Parent Domains: {data.domains[i].parentDomains.length}
                        </Typography>
                        <Typography variant="body1" component="desc">
                          Child Domains: {data.domains[i].childDomains.length}
                        </Typography>

                      </CardActions>
                    </React.Fragment>
                  </Card>
                  {/*  <CardView data={n}></CardView> */}
                </Paper>


                <Paper className="domainDeatils " >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Parent domain" {...a11yProps(0)} />
                        <Tab label="Child domain" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <List
                        data={data.domains[i].parentDomains}
                        title="Domain"
                        linkName="Add parent domain"
                        listType="details"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateClick}
                        onCreateClick={onCreateClick}
                        onDeleteClick={onDeleteClick}
                      />

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <List
                        data={data.domains[i].childDomains}
                        title="Domain"
                        linkName="Add child domain"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateClick}
                        onCreateClick={onCreateClick}
                        onDeleteClick={onDeleteClick}
                      />
                    </TabPanel>

                  </Box>
                  {updateDomainData && value === 1 ? <UpdateDomain
                    open={open}
                    setOpen={setOpen}
                    updateDomainData={updateDomainData}
                    setUpdateDomainData={setUpdateDomainData}
                    deleteFor="Child"
                    detailsDomainId={id}
                  /> : <UpdateDomain
                    open={open}
                    setOpen={setOpen}
                    updateDomainData={updateDomainData}
                    setUpdateDomainData={setUpdateDomainData}
                    deleteFor="Parent"
                    detailsDomainId={id}
                  />}
                  {domainDeleteId && value === 1 ? <DeleteDomain
                    deleteModalOpen={deleteModalOpen}
                    setDeleteModalOpen={setDeleteModalOpen}
                    domainId={domainDeleteId}
                    deleteFor="Child"
                    detailsDomainId={id}
                  >
                  </DeleteDomain> : <DeleteDomain
                    deleteModalOpen={deleteModalOpen}
                    setDeleteModalOpen={setDeleteModalOpen}
                    domainId={domainDeleteId}
                    deleteFor="Parent"
                    detailsDomainId={id}
                  >
                  </DeleteDomain>}
                  {createOpen && value === 1 ? <CreateDomain
                    title="Create Child Domain"
                    createfor="child"
                    createOpen={createOpen}
                    setCreateOpen={setCreateOpen}
                    domainId={domainId}
                  ></CreateDomain> : <CreateDomain
                    title="Create Parent Domain"
                    createfor="parent"
                    createOpen={createOpen}
                    setCreateOpen={setCreateOpen}
                    domainId={domainId}
                  ></CreateDomain>}
                </Paper>

              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default DomainDetails
