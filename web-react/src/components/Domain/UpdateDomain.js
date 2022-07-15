import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import './DomainList.css'

import {
    TextField,
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'
import Title from '../Title'



const UPDATE_DOMAIN = gql`
  mutation domainUpdateMutationQuery(
   $where: DomainWhere, $update: DomainUpdateInput
  ){
    updateDomains(where: $where, update: $update){
       domains {
         id
         name
         description
        }
    }
  }
`
const DETETE_DOMAINS = gql`
  mutation domainDeleteMutationQuery($where: DomainWhere) {
  deleteDomains(where: $where) {
     nodesDeleted
  }
} 
`
const DELETE_CHILD_DOMAINS = gql`
mutation updateChildDomains($where: DomainWhere, $delete: DomainDeleteInput) {
  updateDomains(where: $where, delete: $delete) {
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
}
`
const DELETE_PARENT_DOMAINS = gql`
mutation UpdateParentDomains($where: DomainWhere, $delete: DomainDeleteInput) {
  updateDomains(where: $where, delete: $delete) {
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
}
`

export default function UpdateDomain({ open, setOpen, updateDomainData, GET_DOMAIN, setUpdateDomainData, deleteFor, detailsDomainId }) {

    const [domainId, setDomainId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")
    //const [domainData, setDomianData] = React.useState({})


    useEffect(() => {
        function setData() {
            setDomainId(updateDomainData.id)
            setDomainName(updateDomainData.name)
            setDomainDescription(updateDomainData.description)
            console.log(updateDomainData)

            console.log(detailsDomainId)
        }

        setData()
    }, [updateDomainData])
    console.log(domainId)

    const [updateDomain, { error: mutationError }] = useMutation(UPDATE_DOMAIN,
        {
            variables: { where: { id: domainId }, update: { name: domainName, description: domainDescription } },
            onCompleted: (data) => {
                console.log(data);

            }
        })

    const [deleteDomain] = useMutation(DETETE_DOMAINS,
        {
            variables: { where: { id: domainId, } },
            onCompleted: (data) => {
                console.log(data);
            },
            update(cache) {
                const { domains } = cache.readQuery({ query: GET_DOMAIN });

                cache.writeQuery({
                    query: GET_DOMAIN,
                    data: {
                        domains: domains.filter(domain => domain.id !== domainId)
                    }
                });
            }
        })

    const [deleteChildDomains] = useMutation(DELETE_CHILD_DOMAINS, {
        variables: {
            where: {
                id: detailsDomainId
            },
            delete: {
                childDomains: [
                    {
                        where: {
                            id: domainId
                        }
                    }
                ]
            }
        }, onCompleted: (data) => {
            console.log(data);
        },
        /*   update(cache, { data }) {
              const { domains } = cache.readQuery({ query: GET_SINGLE_DOMAIN });
              console.log(domains, data)
                cache.writeQuery({
                   query: GET_SINGLE_DOMAIN,
                   data: {
                       domains: domains[0].childDomains.filter(domain => domain.id !== data.domains[0].childDomains.id)
                   }
               });
          } */

    })

    const [deleteParentDomains] = useMutation(DELETE_PARENT_DOMAINS, {
        variables: {
            where: {
                id: detailsDomainId
            },
            delete: {
                parentDomains: [
                    {
                        where: {
                            id: domainId
                        }
                    }
                ]
            }
        }, onCompleted: (data) => {
            console.log(data);
        },
        /*     update(cache) {
                const { domains } = cache.readQuery({ query: GET_SINGLE_DOMAIN });
                console.log(domains)
                  cache.writeQuery({
                     query: GET_SINGLE_DOMAIN,
                     data: {
                         domains: domains[1].parentDomains.filter(domain => domain.id !== data.domains[1].parentDomains.id)
                     }
                 }); 
            } */

    })

    const onDomainNameChange = (e) => {
        //const name = e.target.value
        setDomainName(e.target.value)
    }
    const onDomainDesChange = (e) => {
        //const domainDes = e.target.value
        setDomainDescription(e.target.value)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        updateDomain()
        console.log(mutationError)
        if (!mutationError) {
            setOpen(false)
        }
    }

    const OnDeleteDomain = () => {
        //setDomainId(updateData.domainId)
        if (deleteFor === "Child") {
            console.log("child called")
            deleteChildDomains()
            setOpen(false)
        } else if (deleteFor === "Parent") {
            console.log("parent called")
            deleteParentDomains()
            setOpen(false)
        }
        else if (domainId) {
            console.log("domain delete from list")
            deleteDomain()
            setOpen(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setUpdateDomainData("")
    };



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper  >
                    <Box className="modalBox">
                        <Typography id="modal-modal-title" variant="h5" component="h2" >
                            <Title>
                                Update Domain
                            </Title>
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
                </Paper>
            </Modal>
            </div>
    )
}
