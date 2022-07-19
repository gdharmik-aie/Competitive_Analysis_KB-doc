import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateDomain.css'
import {
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Modal,
} from '@mui/material'
/* import Heading from '../Heading' */
import Title from '../Title'



const CREATE_DOMAIN = gql`
 mutation userCreateMutationQuery($input: [DomainCreateInput!]!){
 createDomains(input: $input) {
    domains {
      id
      name
      description
    }
  }
 }
`
const CREATE_CHILD_DOMAIN = gql`
mutation createChildDomains($where: DomainWhere, $create: DomainRelationInput) {
  updateDomains(where: $where, create: $create) {
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
const CREATE_PARENT_DOMAIN = gql`
mutation createParentDomains($where: DomainWhere, $create: DomainRelationInput) {
  updateDomains(where: $where, create: $create) {
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
const CREATE_OFFERING_PRIMARY_DOMAIN = gql`
mutation CreateOfferingPrimaryDomain($where: OfferingWhere, $create: OfferingRelationInput) {
  updateOfferings(where: $where, create: $create) {
    offerings {
      id
      name
      description
      version
      primaryDomain {
        id
        name
        description
      }
    }
  }
}
`
const CREATE_COMPANY_PRIMARY_DOMAIN = gql`
mutation CreateCompanyPrimaryDomain($where: CompanyWhere, $create: CompanyRelationInput) {
  updateCompanies(where: $where, create: $create) {
    companies {
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
    }
  }
}
`


function CreateDomain({ title, createOpen, setCreateOpen, GET_DOMAIN, createfor, domainId, offeringId, companyId }) {

    /*  const [domainId, setDoaminId] = React.useState("") */
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")

    const [domainCreated] = useMutation(CREATE_DOMAIN,
        {

            variables: { input: { name: domainName, description: domainDescription } },
            onCompleted: (data) => {
                console.log(data)
            },
            /*  update(cache, { data: { domainCreated } }) {
                 cache.modify({
                     fields: {
                         createDomains: {
                             domains(existingDomains = []) {
                                 console.log(domainCreated)
                                 const newDomainRef = cache.writeFragment({
                                     data: domainCreated,
                                     fragment: gql`
                                 fragment NewDomains on Domains {
                                     createDomains{
                                        domains  {
                                         id
                                          name
                                          description
                                         }
                                     }
                                       
                                 }
                                 `
                                 });
                                 return [...existingDomains, newDomainRef];
                             }
                         }
                     }
                 });
             } */
            update(cache, { data }) {
                const { domains } = cache.readQuery({ query: GET_DOMAIN });

                cache.writeQuery({
                    query: GET_DOMAIN,
                    data: {
                        domains: [
                            data.createDomains.domains,
                            ...domains
                        ]
                    }
                });
            }
        })

    const [createChildDomain, /* { data: createchildData } */] = useMutation(CREATE_CHILD_DOMAIN,
        {
            variables: {
                where: { id: domainId },
                create: {
                    childDomains: [
                        {
                            name: domainName,
                            description: domainDescription
                        }
                    ]
                },
                onCompleted: (data) => {
                    console.log(data);
                }
            }
        })

    const [createParentDomain, /* { data: createchildData } */] = useMutation(CREATE_PARENT_DOMAIN,
        {
            variables: {
                where: { id: domainId },
                create: {
                    parentDomains: [
                        {
                            name: domainName,
                            description: domainDescription
                        }
                    ]
                },
                onCompleted: (data) => {
                    console.log(data);
                }
            }
        })

    const [createOfferingPrimaryDomain] = useMutation(CREATE_OFFERING_PRIMARY_DOMAIN,
        {
            variables: {
                where: {
                    id: offeringId
                },
                create: {
                    primaryDomain: [
                        {
                            name: domainName,
                            description: domainDescription
                        }
                    ]
                }
            }
        })

    const [createCompanyPrimaryDomain] = useMutation(CREATE_COMPANY_PRIMARY_DOMAIN,
        {
            variables: {
                where: {
                    id: companyId
                },
                create: {
                    primaryDomain: [
                        {
                            name: domainName,
                            description: domainDescription
                        }
                    ]
                }
            }
        })

    const onDomainNameChange = (e) => {
        const domainName = e.target.value
        setDomainName(domainName)
    }

    const onDomainDesChange = (e) => {
        const domainDes = e.target.value
        setDomainDescription(domainDes)
    }


    const handlerSubmit = async (e) => {

        e.preventDefault()
        //console.log(companyId)
        if (domainId) {
            if (createfor === "child") {
                createChildDomain()
                setCreateOpen(false)
            } else if (createfor === "parent") {
                createParentDomain()
                setCreateOpen(false)
            }
            /*  console.log(createchildData) */
        } else if (offeringId) {
            createOfferingPrimaryDomain()
            setCreateOpen(false)
        } else if (companyId) {
            createCompanyPrimaryDomain()
            setCreateOpen(false)
        } else {
            domainCreated()
            setCreateOpen(false)
        }


        /* console.log(mutationData)
        console.log(mutationLoading) */

        setDomainName("")
        setDomainDescription("")



    }

    const handleClose = () => {
        setCreateOpen(false)
    };

    return (
        <div>
            <Modal
                open={createOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper >
                    {/* <Heading title=" Create Domain" listType="list" linkName="Domain List"></Heading> */}
                    <Box className="modalBox">
                        <Typography id="modal-modal-title" variant="h5" component="h2" >
                            <Title>{title}</Title>
                        </Typography>

                        <form onSubmit={handlerSubmit}>
                            <Typography>
                                <TextField className="textField" required label="Domain Name" onChange={onDomainNameChange} value={domainName}>
                                </TextField>
                            </Typography>
                            <Typography>
                                <TextField className="textField" required label="Domain Description" onChange={onDomainDesChange} value={domainDescription}>
                                </TextField>
                            </Typography>
                            <div className='button-container'>
                                <Button className="formButton" type='submit' variant="contained" color='primary'>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Box>
                    {/* <div>
                <p className={domainId ? 'Success-message' : 'hidden-message'}>{`Domain with domainId ${domainId} is created`}</p>
            </div> */}
                </Paper>
            </Modal></div>
    )
}

export default CreateDomain