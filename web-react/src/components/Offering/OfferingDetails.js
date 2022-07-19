import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import './OfferingDetails.css'
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
/* import UpdateOffering from './UpdateOffering' */
import UpdateDomain from '../Domain/UpdateDomain'
import UpdateCompany from '../Company/UpdateCompany'
import CreateDomain from '../Domain/CreateDomain'
import DeleteDomain from '../Domain/DeleteDomain'
import CreateCompany from '../Company/CreateCompany'
import DeleteCompany from '../Company/DeleteCompany'

const GET_OFFERING = gql`
  query offeringsPaginateQuery($where: OfferingWhere) {
     offerings(where: $where) {
    id
    name
    description
    version
    primaryDomain {
      id
      name
      description
    }
    provider {
      id
        name
        description
        website
        city
        region
        country
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

function OfferingDetails() {
  const location = useLocation()
  const { id } = location.state
  const [offeringId, setOfferingId] = React.useState("")
  const [primaryDomainData, setPrimaryDomainData] = React.useState()
  const [companyData, setCompanyData] = React.useState("")
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPrimaryDomainData("")
    setCompanyData("")
  };

  const [open, setOpen] = React.useState(false);
  const [createDomainOpen, setCreateDomainOpen] = React.useState(false)
  const [createCompanyOpen, setCreateCompanyOpen] = React.useState(false)
  const [deleteDomainOpen, setDeleteDomainOpen] = React.useState(false)
  const [deleteCompanyOpen, setDeleteCompanyOpen] = React.useState(false)
  const [domainDeleteId, setDomainDeleteId] = React.useState('')
  const [companyDeleteId, setCompanyDeleteId] = React.useState('')

  /* const [offeringData, setOfferingData] = React.useState("") */


  const { loading, data, error } = useQuery(GET_OFFERING, {
    variables: { where: { id: id } },
  })

  const onUpdateDomainClick = (n) => {
    setPrimaryDomainData(n)
    setOpen(true)
  }

  const onUpdateCompanyClick = (data) => {
    console.log(data)
    setCompanyData(data)

    setOpen(true)
  }

  const onCreateDomainClick = () => {
    setOfferingId(id)
    setCreateDomainOpen(true)
  }

  const onCreateCompanyClick = () => {
    setOfferingId(id)
    setCreateCompanyOpen(true)
  }

  const onDeleteDomainClick = (n) => {
    setOfferingId(id)
    setDomainDeleteId(n.id)
    setDeleteDomainOpen(true)
  }

  const onDeleteCompanyClick = (n) => {
    setOfferingId(id)
    setCompanyDeleteId(n.id)
    setDeleteCompanyOpen(true)
  }

  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <div>
          {data.offerings.map((n, i) => {
            return (
              <div key={i}>
                <Paper className="root offeringDetails">
                  <Heading
                    title="Offering Details"
                    listType="details"
                    linkName="Offering List"
                  ></Heading>
                  <Card className="cardDetail">
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
                          Primary Domain: {data.offerings[i].primaryDomain.length}
                        </Typography>
                        <Typography variant="body1" component="desc">
                          Provider Company: {data.offerings[i].provider.length}
                        </Typography>

                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Paper>



                <Paper className="offeringDetails " >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Primary Domain" {...a11yProps(0)} />
                        <Tab label="Provider Company" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <List
                        data={data.offerings[i].primaryDomain}
                        title="Primary Domain"
                        linkName="Add Primary Domain"
                        listType="list"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateDomainClick}
                        onCreateClick={onCreateDomainClick}
                        onDeleteClick={onDeleteDomainClick}
                      />

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <List
                        data={data.offerings[i].provider}
                        title="Provider Company"
                        linkName="Add Provider Company"
                        listType="list"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateCompanyClick}
                        onCreateClick={onCreateCompanyClick}
                        onDeleteClick={onDeleteCompanyClick}
                      />

                    </TabPanel>

                  </Box>
                  {primaryDomainData ? <UpdateDomain
                    open={open}
                    setOpen={setOpen}
                    updateDomainData={primaryDomainData}
                    setUpdateDomainData={setPrimaryDomainData}
                  /> : ""}
                  {<CreateDomain
                    title="Primay Domain"
                    createfor="offering"
                    createOpen={createDomainOpen}
                    setCreateOpen={setCreateDomainOpen}
                    offeringId={offeringId}
                  ></CreateDomain>}
                  {domainDeleteId ? <DeleteDomain
                    deleteModalOpen={deleteDomainOpen}
                    setDeleteModalOpen={setDeleteDomainOpen}
                    domainId={domainDeleteId}
                    deleteFor="Offering"
                    detailsOfferingId={offeringId}
                  ></DeleteDomain> : ""}
                  {companyData ? <UpdateCompany
                    open={open}
                    setOpen={setOpen}
                    updateCompanyData={companyData}
                    setUpdateCompanyData={setCompanyData}
                  /> : ""}
                  {<CreateCompany
                    title="Provider Company"
                    createModalOpen={createCompanyOpen}
                    setCreateModalOpen={setCreateCompanyOpen}
                    createfor="Offering"
                    offeringId={offeringId}
                  ></CreateCompany>}
                  {companyDeleteId ? <DeleteCompany
                    deleteModalOpen={deleteCompanyOpen}
                    setDeleteModalOpen={setDeleteCompanyOpen}
                    companyId={companyDeleteId}
                    deleteFor="Offering"
                    detailsOfferingId={offeringId}
                  ></DeleteCompany> : ""}
                </Paper>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OfferingDetails
