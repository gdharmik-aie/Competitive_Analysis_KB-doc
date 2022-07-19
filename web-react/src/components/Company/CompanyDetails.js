import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import './CompanyDetails.css'
import List from '../List'
import {
    Paper,
    Card,
    CardActions,
    Typography,
    Box,
    CardContent,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Heading from '../Heading'
import UpdateDomain from '../Domain/UpdateDomain'
import CreateDomain from '../Domain/CreateDomain'
import DeleteDomain from '../Domain/DeleteDomain'
import UpdateOffering from '../Offering/UpdateOffering'
import CreateOffering from '../Offering/CreateOffering'
import DeleteOffering from '../Offering/DeleteOffering'



const GET_COMPANY = gql`
 query comapnyQuery($where: CompanyWhere){
    companies(where: $where){
         id
        name
        description
        website
        city
        region
        country
    primaryDomain {
      id
      name
      description
    }
    offeringsUsed {
       id
      name
      description
      version
    }
    offeringsProvided {
      id
      name
      description
      version
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

function CompanyDetails() {
    const location = useLocation()
    const { id } = location.state
    const [companyId, setCompanyId] = React.useState("")
    const [updateDomainData, setUpdateDomainData] = React.useState("")
    const [offeringUsedData, setOfferingUsedData] = React.useState("")
    const [offeringProvideData, setOfferingProvideData] = React.useState("")
    const [offeringProvide, setOfferingProvide] = React.useState(false)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(`newValue ${newValue}`)
        if (newValue === 2) {
            setOfferingProvide(true)
        } else {
            setOfferingProvide(false)
        }
        setValue(newValue);
        setUpdateDomainData("")
        setOfferingUsedData("")
        setOfferingProvideData("")

    };



    const [open, setOpen] = React.useState(false)
    const [createDomainOpen, setCreateDomainOpen] = React.useState(false)
    const [deleteDomainOpen, setDeleteDomainOpen] = React.useState(false)
    const [domainDeleteId, setDomainDeleteId] = React.useState('')

    const [createOfferingUsedOpen, setCreateOfferingUsedOpen] = React.useState(false)
    const [deleteOfferingUsedOpen, setDeleteOfferingUsedOpen] = React.useState(false)
    const [offeringUsedDeleteId, setofferingUsedDeleteId] = React.useState('')



    const [createOfferingProvideOpen, setCreateOfferingProvideOpen] = React.useState(false)
    const [deleteOfferingProvideOpen, setDeleteOfferingProvideOpen] = React.useState(false)
    const [offeringProvideDeleteId, setofferingProvideDeleteId] = React.useState('')



    const { loading, data, error } = useQuery(GET_COMPANY, {
        variables: { where: { id: id } }
    })

    const onUpdateDomainClick = (n) => {
        // console.log("here:", n)
        setUpdateDomainData(n)
        setOpen(true)
    }
    const onDomainCreateClick = () => {
        setCompanyId(id)
        setCreateDomainOpen(true)
    }
    const onDomainDeleteClick = (n) => {
        setCompanyId(id)
        setDomainDeleteId(n.id)
        setDeleteDomainOpen(true)
    }

    const onUpdateOfferingUsedClick = (n) => {
        // console.log("here:", n)
        setOfferingUsedData(n)
        setOpen(true)
    }
    const onCreateOfferingUsedClick = () => {
        setCompanyId(id)
        setCreateOfferingUsedOpen(true)
    }
    const onDeleteOfferingUsedClick = (n) => {
        setCompanyId(id)
        setofferingUsedDeleteId(n.id)
        setDeleteOfferingUsedOpen(true)
    }

    const onUpdateOfferingProvideClick = (n) => {
        setOfferingProvideData(n)
        setOpen(true)
    }
    const onCreateOfferingProvideClick = () => {
        setCompanyId(id)
        setCreateOfferingProvideOpen(true)
    }

    const onDeleteOfferingProvideClick = (n) => {
        setCompanyId(id)
        setofferingProvideDeleteId(n.id)
        setDeleteOfferingProvideOpen(true)
    }






    return (
        <div>
            {loading && !error && <p>Loading...</p>}
            {error && !loading && <p>Error {console.log(error)}</p>}
            {data && !loading && !error && (
                <div>
                    {data.companies.map((n, i) => {
                        return (
                            <div key={i}>
                                <Paper className="root companyDetails" >
                                    <Heading title="Company Details" listType="details" linkName="Company List"></Heading>
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
                                                    Primary Domain: {data.companies[i].primaryDomain.length}
                                                </Typography>
                                                <Typography variant="body1" component="desc">
                                                    Offerings Used: {data.companies[i].offeringsUsed.length}
                                                </Typography>
                                                <Typography variant="body1" component="desc">
                                                    Offerings Provided: {data.companies[i].offeringsProvided.length}
                                                </Typography>
                                            </CardActions>
                                        </React.Fragment>
                                    </Card>
                                </Paper>
                                <Paper className='companyDetails'>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="Primary Domain" {...a11yProps(0)} />
                                                <Tab label="Offerings Used" {...a11yProps(1)} />
                                                <Tab label="Offerings Provide" {...a11yProps(2)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <List
                                                data={data.companies[i].primaryDomain}
                                                title="Primary Domain"
                                                linkName="Add Primary Domain"
                                                listType="list"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateDomainClick}
                                                onCreateClick={onDomainCreateClick}
                                                onDeleteClick={onDomainDeleteClick}
                                            />

                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <List
                                                data={data.companies[i].offeringsUsed}
                                                title="Offering Used"
                                                linkName="Add Offering used"
                                                listType="list"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateOfferingUsedClick}
                                                onCreateClick={onCreateOfferingUsedClick}
                                                onDeleteClick={onDeleteOfferingUsedClick}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <List
                                                data={data.companies[i].offeringsProvided}
                                                title="Offering Provider"
                                                linkName="Add Offering Provided"
                                                listType="list"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateOfferingProvideClick}
                                                onCreateClick={onCreateOfferingProvideClick}
                                                onDeleteClick={onDeleteOfferingProvideClick}
                                            />
                                        </TabPanel>
                                    </Box>
                                    {updateDomainData ? <UpdateDomain
                                        open={open}
                                        setOpen={setOpen}
                                        updateDomainData={updateDomainData}
                                        setUpdateDomainData={setUpdateDomainData}
                                    ></UpdateDomain> : ""}
                                    {<CreateDomain
                                        title="Primay Domain"
                                        createfor="Company"
                                        createOpen={createDomainOpen}
                                        setCreateOpen={setCreateDomainOpen}
                                        companyId={companyId}
                                    ></CreateDomain>}
                                    {domainDeleteId ? <DeleteDomain
                                        deleteModalOpen={deleteDomainOpen}
                                        setDeleteModalOpen={setDeleteDomainOpen}
                                        domainId={domainDeleteId}
                                        deleteFor="Company"
                                        detailsCompanyId={companyId}
                                    ></DeleteDomain> : ""}
                                    {offeringUsedData ? <UpdateOffering
                                        open={open}
                                        setOpen={setOpen}
                                        updateOfferingData={offeringUsedData}
                                        setUpdateOfferingData={setOfferingUsedData}
                                    ></UpdateOffering> : ""}
                                    {<CreateOffering
                                        title="Offering Used"
                                        createModalOpen={createOfferingUsedOpen}
                                        setCreateModalOpen={setCreateOfferingUsedOpen}
                                        createfor="OfferingUsed"
                                        companyId={companyId}
                                    ></CreateOffering>}
                                    {offeringUsedDeleteId ? <DeleteOffering
                                        deleteModalOpen={deleteOfferingUsedOpen}
                                        setDeleteModalOpen={setDeleteOfferingUsedOpen}
                                        offeringId={offeringUsedDeleteId}
                                        deleteFor="OfferingUsed"
                                        detailsCompanyId={companyId}
                                    ></DeleteOffering> : ""}

                                    {offeringProvide ?
                                        <>{offeringProvideData ? <UpdateOffering
                                            open={open}
                                            setOpen={setOpen}
                                            updateOfferingData={offeringProvideData}
                                            setUpdateOfferingData={setOfferingProvideData}
                                        ></UpdateOffering> : ""}
                                            {<CreateOffering
                                                title="Offering Provide"
                                                createModalOpen={createOfferingProvideOpen}
                                                setCreateModalOpen={setCreateOfferingProvideOpen}
                                                createfor="OfferingProvide"
                                                companyId={companyId}
                                            ></CreateOffering>}
                                            {offeringProvideDeleteId?<DeleteOffering
                                                deleteModalOpen={deleteOfferingProvideOpen}
                                                setDeleteModalOpen={setDeleteOfferingProvideOpen}
                                                offeringId={offeringProvideDeleteId}
                                                deleteFor="OfferingProvide"
                                                detailsCompanyId={companyId}
                                            ></DeleteOffering>:""}</> : ""}
                                </Paper>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CompanyDetails