import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'

const DELETE_OFFERING = gql`
  mutation offeringDeleteMutation($where: OfferingWhere) {
    deleteOfferings(where: $where) {
      nodesDeleted
    }
  }
`
const DELETE_OFFERING_USED = gql`
mutation UpdateOfferingUsedCompanies($where: CompanyWhere, $delete: CompanyDeleteInput) {
  updateCompanies(where: $where, delete: $delete) {
    companies {
      id
      name
      description
      website
      city
      region
      country
       offeringsUsed {
        id
        name
        description
        version
      }
    }
  }
}
`
const DELETE_OFFERING_PROVIDE = gql`
mutation UpdateOfferingProvideCompanies($where: CompanyWhere, $delete: CompanyDeleteInput) {
  updateCompanies(where: $where, delete: $delete) {
    companies {
      id
      name
      description
      website
      city
      region
      country
      offeringsProvided {
        id
        name
        description
        version
      }
    }
  }
}
`

function DeleteOffering({ deleteModalOpen, setDeleteModalOpen, offeringId, GET_OFFERING, deleteFor, detailsCompanyId }) {

    const [deleteOffering] = useMutation(DELETE_OFFERING,
        {
            variables: { where: { id: offeringId } },
            update(cache) {
                const { offerings } = cache.readQuery({ query: GET_OFFERING });

                cache.writeQuery({
                    query: GET_OFFERING,
                    data: {
                        offerings: offerings.filter(offering => offering.id !== offeringId)
                    }
                })
            }
        })

    const [deleteOfferingUsed] = useMutation(DELETE_OFFERING_USED,
        {
            variables: {
                where: {
                    id: detailsCompanyId
                },
                delete: {
                    offeringsUsed: [
                        {
                            where: {
                                id: offeringId
                            }
                        }
                    ]
                }
            }
        })

    const [deleteOfferingProvide] = useMutation(DELETE_OFFERING_PROVIDE,
        {
            variables: {
                where: {
                    id: detailsCompanyId
                },
                delete: {
                    offeringsProvided: [
                        {
                            where: {
                                id: offeringId
                            }
                        }
                    ]
                }
            }
        })

    const onDeleteOffering = () => {

        if (deleteFor === "OfferingUsed") {
            deleteOfferingUsed()
            setDeleteModalOpen(false)
        } if (deleteFor === "OfferingProvide") {
            deleteOfferingProvide()
            setDeleteModalOpen(false)
        } else if (offeringId) {
            deleteOffering()
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
                            <Button className='deleteButton' variant="outlined" onClick={() => onDeleteOffering()}>
                                Delete
                            </Button>

                        </div>
                    </Box>
                </Paper>
            </Modal>
        </div>
    )
}

export default DeleteOffering