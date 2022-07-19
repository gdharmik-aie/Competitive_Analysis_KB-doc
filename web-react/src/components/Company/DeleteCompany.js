import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
    Button,
    Box,
    Typography,
    Modal,
    Paper
} from '@mui/material'

const DELETE_COMPANY = gql`
  mutation companyDeleteMutationQuery($where: CompanyWhere) {
    deleteCompanies(where: $where) {
      nodesDeleted
    }
  }
`
const DELETE_PROVIDER_COMPANY = gql`
mutation DeleteProviderOfferings($where: OfferingWhere, $delete: OfferingDeleteInput) {
  updateOfferings(where: $where, delete: $delete) {
    offerings {
      id
      name
      description
      version
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
}
`

function DeleteCompany({ deleteModalOpen, setDeleteModalOpen, companyId, GET_COMPANY, deleteFor, detailsOfferingId }) {

    const [deleteCompanies] = useMutation(DELETE_COMPANY, {
        variables: { where: { id: companyId } },
        update(cache) {
            const { companies } = cache.readQuery({ query: GET_COMPANY });

            cache.writeQuery({
                query: GET_COMPANY,
                data: {
                    companies: companies.filter(company => company.id !== companyId)
                }
            });
        }
    })

    const [deleteProviderCompany] = useMutation(DELETE_PROVIDER_COMPANY, {
        onCompleted: (data) => {
            console.log(data);
        }
    })

    const OnDeleteCompany = () => {
        console.log(`offeringId ${detailsOfferingId}`)
        console.log(`companyId ${companyId}`)

        if (deleteFor === "Offering") {
            deleteProviderCompany({
                variables: {
                    where: {
                        id: detailsOfferingId
                    },
                    delete: {
                        provider: [
                            {
                                where: {
                                    id: companyId
                                }
                            }
                        ]
                    }
                }
            })
            setDeleteModalOpen(false)
        } else if (companyId) {
            deleteCompanies()
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
        <div> <Modal
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
                        <Button className='deleteButton' variant="outlined" onClick={() => OnDeleteCompany()}>
                            Delete
                        </Button>

                    </div>
                </Box>
            </Paper>
        </Modal></div>
    )
}

export default DeleteCompany