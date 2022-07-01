import React from 'react'

import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import List from '../List'
import {
  Paper,
  Card,
  CardActions,
  Typography,
  // Box,
  CardContent,
} from '@mui/material'
import Heading from '../Heading'

const GET_OFFERING = gql`
  query offeringsPaginateQuery($where: OfferingWhere) {
    offerings(where: $where) {
      id
      name
      description
      domain
      version
      provider
    }
  }
`

/*function TabPanel(props) {
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
}*/

function OfferingDetails() {
  const location = useLocation()
  const { name } = location.state

  /* const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }; */

  /*const [open, setOpen] = React.useState(false);*/
  /* const [offeringData, setOfferingData] = React.useState("") */

  const { loading, data, error } = useQuery(GET_OFFERING, {
    variables: { where: { name: name } },
  })

  /* const onUpdateClick = (n) => {
        setOfferingData(n)
        setOpen(true)
    } */

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
                  <Card className="cardDetail">
                    <Heading
                      title="Offering Details"
                      linkName="Offering List"
                    ></Heading>
                    <React.Fragment>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Name: {n.name}
                        </Typography>
                        <Typography variant="body1">
                          Description: {n.description}
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </React.Fragment>
                  </Card>
                </Paper>

                <Paper className="offeringDetails">
                  <List
                    data={data.offerings[i]}
                    title="Offeing"
                    linkName="Create Offering"
                    loading={loading}
                    error={error}
                  />
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
