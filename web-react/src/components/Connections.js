import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import { gql, useQuery, useMutation } from '@apollo/client'
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {
  TextField,
  Button,
  Paper,
} from '@mui/material'
import Title from './Title';


const GET_DOMAIN = gql`
  query domainsPaginateQuery {
    domains {
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

const GET_ONE_DOMAIN = gql`
query getOneDomainQuery($where: DomainWhere) {
  domains (where: $where) {
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

const UPDATE_DOMAIN = gql`
mutation updateDomainQuery($where: DomainWhere, $connect: DomainConnectInput, $disconnect: DomainDisconnectInput) {
  updateDomains(where: $where, connect: $connect, disconnect: $disconnect) {
    domains {
      id
      name
      description
       parentDomains {
        id
        name
        description
      }
      childDomains {
        id
        name
        description
      }
     
    }
  }
}
`

function Connections() {

  const [parentChecked, setParentChecked] = React.useState(false)
  const [childChecked, setChildChecked] = React.useState(false)

  const [parentDoaminCheckbox, setParentDoaminCheckbox] = React.useState(false)
  const [childDomainCheckbox, setChildDomainCheckbox] = React.useState(false)

  const [parentDomainChecked, setParentDomainChecked] = React.useState(false)
  const [childDomainChecked, setChildDomainChecked] = React.useState(false)

  const [parentCheckboxDisbale, setParentCheckboxDisbale] = React.useState(false)
  const [childCheckboxDisable, setChildCheckboxDisable] = React.useState(false)


  const [selectedDomain, setSelectedDomain] = React.useState("")
  const [selectedDisconnectDomain, setSelectedDisconnectDomain] = React.useState("")

  const [selectedParentDomain, setSelectedParentDomain] = React.useState("")
  const [selectedChildDomain, setSelectedChildDomain] = React.useState("")

  const [selectedDisconnectParentDomain, setSelectedDisconnectParentDomain] = React.useState("")
  const [selectedDisconnectChildDomain, setSelectedDisconnectChildDomain] = React.useState("")

  /*  const [parentDomain, setParentDomain] = React.useState("")
   const [childDomain, setChildDomain] = React.useState("") */

  const { loading, data, error } = useQuery(GET_DOMAIN)


  const { loading: oneDomainLoading, data: oneDomainData, error: oneDomainError } = useQuery(GET_ONE_DOMAIN, { variables: { where: { id: selectedDisconnectDomain } } })

  /*   if (selectedDisconnectDomain !== "") {
      console.log(`domains ${oneDomainData}`)
      setChildDomain(oneDomainData.domains[0].childDomain)
      setParentDomain(oneDomainData.domains[1].parentDomains)
    } */





  /*   */

  const [updateDomain, { error: mutationError }] = useMutation(UPDATE_DOMAIN,
    {
      variables: {
        where: {
          id: selectedDomain
        },
        connect: {
          parentDomains: [
            {
              where: {
                id: selectedParentDomain
              }
            }
          ],
          childDomains: [
            {
              where: {
                id: selectedChildDomain
              }
            }
          ]
        },
        disconnect: {
          childDomains: [
            {
              where: {
                id: null
              }
            }
          ],
          parentDomains: [
            {
              where: {
                id: null
              }
            }
          ]
        }
      }
    })

  const onParentCheckedChange = (event) => {
    let checked = event.target.checked
    setParentChecked(checked)
    if (checked) {
      setChildDomainCheckbox(true)
    } else {
      setChildDomainCheckbox(false)
      setSelectedDomain("")
      setSelectedParentDomain("")
      setSelectedChildDomain("")
    }

  }

  const onChildCheckedChange = (event) => {
    let checked = event.target.checked
    setChildChecked(checked)
    if (checked) {
      setParentDoaminCheckbox(true)
    } else {
      setParentDoaminCheckbox(false)
      setSelectedDomain("")
    }
  }

  const onParentDomainCheckedChange = (event) => {
    let checked = event.target.checked
    setParentDomainChecked(checked)
    if (checked) {
      setChildCheckboxDisable(true)
    } else {
      setChildCheckboxDisable(false)
      setSelectedDisconnectDomain("")
      setSelectedDisconnectParentDomain("")
      setSelectedDisconnectChildDomain("")
    }

  }

  const onChildDomainCheckedChange = (event) => {
    let checked = event.target.checked
    setChildDomainChecked(checked)
    if (checked) {
      setParentCheckboxDisbale(true)
    } else {
      setParentCheckboxDisbale(false)
      setSelectedDisconnectDomain("")
      setSelectedDisconnectParentDomain("")
      setSelectedDisconnectChildDomain("")
    }
  }

  const handleChange = (event) => {
    // console.log(event.target.value)
    setSelectedDomain(event.target.value)
  }

  const disconnectDomainChange = (event) => {
    // console.log(event.target.value)
    setSelectedDisconnectDomain(event.target.value)
     
  }

  const onParentDomainChange = (event) => {
    // console.log(`Parent domain: ${event.target.value}`)
    setSelectedParentDomain(event.target.value)
  }

  const onChildDomainChange = (event) => {
    //console.log(`Child domain: ${event.target.value}`)
    setSelectedChildDomain(event.target.value)
  }

  const onParentDomainDisconnect = (event) => {
    //console.log(`Disconnect Parent domain: ${event.target.value}`)
    setSelectedDisconnectParentDomain(event.target.value)
  }

  const onChildDomainDisconnect = (event) => {
    //console.log(`Disconnect Child domain: ${event.target.value}`)
    setSelectedDisconnectChildDomain(event.target.value)
  }

  const onUpdateDomainConnection = () => {
    if (!mutationError) {
      updateDomain
    }
  }

  const onDisconnectDomainConnection = () => {
    if (!mutationError) {
      updateDomain()
      setSelectedDisconnectDomain("")
      setSelectedDisconnectParentDomain("")
      setSelectedDisconnectChildDomain("")
    }
  }

  if (loading) return "Loading...";
  if (oneDomainLoading) return "Loading...";
  if (oneDomainError) return <pre>{error.message}</pre>
  if (error) return <pre>{error.message}</pre>
  return (
    <div className='container'>
      <Paper className='root'>
        <Title>
          Connect Domain
        </Title>
        <FormGroup>
          <FormLabel >Select which domain you want to connect with parent or child</FormLabel>
          <div className='container'>
            <FormControlLabel disabled={parentDoaminCheckbox} control={<Checkbox checked={parentChecked} onChange={onParentCheckedChange} />} label="ParentDomain" />
            <FormControlLabel disabled={childDomainCheckbox} control={<Checkbox checked={childChecked} onChange={onChildCheckedChange} />} label="ChildDomain" />
          </div>
          <TextField
            className="textField"
            select
            label="Select Domain"
            defaultValue="Select"
            value={selectedDomain}
            onChange={handleChange}
            helperText="Please select domain"
          >
            {data.domains.map((value, i) => (
              <MenuItem key={i} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>

          {parentChecked ? <TextField
            className="textField"
            select
            label="Select Parent Domain"
            defaultValue="Select"
            value={selectedParentDomain}
            onChange={onParentDomainChange}
            helperText="Please select Parent domain"
          >
            {data.domains.map((value, i) => (selectedDomain !== value.id ?
              <MenuItem key={i} value={value.id}>
                {value.name}
              </MenuItem> : ""
            ))}
          </TextField> :
            <TextField
              className="textField"
              select
              label="Select Child  Domain"
              defaultValue="Select"
              value={selectedChildDomain}
              onChange={onChildDomainChange}
              helperText="Please select Child domain"
            >
              {data.domains.map((value, i) => (selectedDomain !== value.id ?
                <MenuItem key={i} value={value.id} >
                  {value.name}
                </MenuItem> : ""
              ))}
            </TextField>}
          <Button variant="contained" type="submit" onClick={onUpdateDomainConnection}>
            connect
          </Button>
        </FormGroup>
      </Paper>
      <Paper className='root'>
        <Title>
          Disconnect Domain
        </Title>
        <FormGroup>
          <FormLabel >Select which domain you want to disconnect with parent or child</FormLabel>
          <div className='container'>
            <FormControlLabel disabled={parentCheckboxDisbale} control={<Checkbox checked={parentDomainChecked} onChange={onParentDomainCheckedChange} />} label="ParentDomain" />
            <FormControlLabel disabled={childCheckboxDisable} control={<Checkbox checked={childDomainChecked} onChange={onChildDomainCheckedChange} />} label="ChildDomain" />
          </div>
          <TextField
            className="textField"
            select
            label="Select Domain"
            defaultValue="Select"
            value={selectedDisconnectDomain}
            onChange={disconnectDomainChange}
            helperText="Please select domain"
          >
            {data.domains.map((value, i) => (
              <MenuItem key={i} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>

          {parentDomainChecked ?
            <TextField
              className="textField"
              select
              label="Select Parent Domain"
              defaultValue="Select"
              value={selectedDisconnectParentDomain}
              onChange={onParentDomainDisconnect}
              helperText="Please select Parent domain"
            >
              {/*  {selectedDisconnectParentDomain !== "" ?
                oneDomainData.domains[1].parentDomains ? oneDomainData.domains[1].parentDomains.map((value, i) => (
                  <MenuItem key={i} value={value.id}>
                    {value.name}
                  </MenuItem>
                )) : <MenuItem value="null">None</MenuItem>
                : ""} */}
              <MenuItem value="null">None</MenuItem>
              {console.log(oneDomainData)}
            </TextField> :
            <TextField
              className="textField"
              select
              label="Select Child  Domain"
              defaultValue="Select"
              value={selectedDisconnectChildDomain}
              onChange={onChildDomainDisconnect}
              helperText="Please select Child domain"
            >
              {(selectedDisconnectChildDomain !== "" || oneDomainData !== "") ? <MenuItem value="null">None</MenuItem> : oneDomainData.domains[0].childDomain.map((value, i) => (
                <MenuItem key={i} value={value.id} >
                  {value.name}
                </MenuItem>
              ))
              }


              {console.log(oneDomainData)}
            </TextField>}
          <Button variant="contained" type="submit" onClick={onDisconnectDomainConnection}>
            Disconnect
          </Button>
        </FormGroup>
      </Paper>
    </div>
  )
}

export default Connections