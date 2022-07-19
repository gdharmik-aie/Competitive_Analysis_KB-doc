import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'


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
const DELETE_OFFERING_PRIMARY_DOMAIN = gql`
mutation DeleteOfferingPrimaryDomain($where: OfferingWhere, $delete: OfferingDeleteInput) {
  updateOfferings(where: $where, delete: $delete) {
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
const DELETE_COMPANY_PRIMARY_DOMAIN = gql`
mutation DeleteCompanyPrimaryDomain($where: CompanyWhere, $delete: CompanyDeleteInput) {
  updateCompanies(where: $where, delete: $delete) {
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

function DeleteDomain({ deleteModalOpen, setDeleteModalOpen, domainId, GET_DOMAIN, deleteFor, detailsDomainId, detailsOfferingId, detailsCompanyId }) {

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
        },
        onCompleted: (data) => {
            console.log(data);
        }
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
        }
    })

    const [deleteOfferingPrimaryDomain] = useMutation(DELETE_OFFERING_PRIMARY_DOMAIN,
        {
            variables: {

                where: {
                    id: detailsOfferingId
                },
                delete: {
                    primaryDomain: [
                        {
                            where: {
                                id: domainId
                            }
                        }
                    ]
                }

            }
        })

    const [deleteCompanyPrimaryDomain] = useMutation(DELETE_COMPANY_PRIMARY_DOMAIN,
        {
            variables: {
                where: {
                    id: detailsCompanyId
                },
                delete: {
                    primaryDomain: [
                        {
                            where: {
                                id: domainId
                            }
                        }
                    ]
                }
            }
        })


    const onDomainDelete = () => {
        //setDomainId(updateData.domainId)
        if (deleteFor === "Child") {
            console.log("child called")
            deleteChildDomains()
            setDeleteModalOpen(false)
        } else if (deleteFor === "Parent") {
            console.log("parent called")
            deleteParentDomains()
            setDeleteModalOpen(false)
        } else if (deleteFor === "Offering") {
            deleteOfferingPrimaryDomain()
            setDeleteModalOpen(false)
        } else if (deleteFor === "Company") {
            deleteCompanyPrimaryDomain()
            setDeleteModalOpen(false)
        } else if (domainId) {
            // console.log(domainId)
            //console.log("domain delete from list")
            deleteDomain()
            setDeleteModalOpen(false)
        }
    }

    const handleClose = () => {
        setDeleteModalOpen(false)
    };

    const onCancelDelete = () => {
        setDeleteModalOpen(false)
    }

    return (
        <div>
            <Modal
                open={deleteModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper  >
                    <Box className="modalDeleteBox">
                        <Typography id="modal-modal-header" variant='h5' component="h2">
                            <label className='deleteLabel'> Do you want to delete?</label>
                        </Typography>
                        <div className='delete-button-container'>
                            <Button className='cancelButton' variant="outlined" onClick={() => onCancelDelete()}>Cancel</Button>
                            <Button className='deleteButton' variant="outlined" onClick={() => onDomainDelete()}>
                                Delete
                            </Button>

                        </div>
                    </Box>
                </Paper>
            </Modal>
        </div>
    )
}

export default DeleteDomain