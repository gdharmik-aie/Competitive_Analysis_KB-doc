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
import UpdateCompany from './UpdateCompany'

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false)
    const [companyData, setCompanyData] = React.useState("")

    const { loading, data, error } = useQuery(GET_COMPANY, {
        variables: { where: { id: id } }
    })

    const onUpdateClick = (n) => {
        // console.log("here:", n)
        setCompanyData(n)
        setOpen(true)
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
                                    <Heading title="Company Details" linkName="Company List"></Heading>
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
                                                linkName="Create Company"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateClick}
                                            />

                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <List
                                                data={data.companies[i].offeringsUsed}
                                                title="Offerings Used"
                                                linkName="Create Company"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateClick}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <List
                                                data={data.companies[i].offeringsProvided}
                                                title="Offerings Provide"
                                                linkName="Create Company"
                                                loading={loading}
                                                error={error}
                                                onUpdateClick={onUpdateClick}
                                            />
                                        </TabPanel>
                                    </Box>
                                    {companyData ? <UpdateCompany
                                        open={open}
                                        setOpen={setOpen}
                                        companyData={companyData}
                                    >
                                    </UpdateCompany> : ""}
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