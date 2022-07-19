import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './CompanyList.css'
import List from '../List'
import UpdateCompany from './UpdateCompany'
import CreateCompany from './CreateCompany'
import DeleteCompany from './DeleteCompany'

const GET_COMPANY = gql`
  query companiesPaginateQuery {
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



function CompanyList() {
  const [open, setOpen] = React.useState(false)
  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [companyDeleteId, setCompanyDeleteId] = React.useState('')
  const [updateCompanyData, setUpdateCompanyData] = React.useState("")



  const { loading, data, error } = useQuery(GET_COMPANY)


  const onUpdateClick = (n) => {
    //console.log("here:", n)
    setUpdateCompanyData(n)
    setOpen(true)
  }

  const onCreateClick = () => {
    setCreateModalOpen(true)
  }

  const onDeleteClick = (n) => {
    console.log(n.id)
    setCompanyDeleteId(n.id)
    setDeleteModalOpen(true)
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return (
    <div>
      <List
        data={data.companies}
        title="Company"
        linkName="Create Company"
        listType="list"
        loading={loading}
        error={error}
        onUpdateClick={onUpdateClick}
        onCreateClick={onCreateClick}
        onDeleteClick={onDeleteClick}
      />

      {updateCompanyData ? <UpdateCompany
        open={open}
        setOpen={setOpen}
        updateCompanyData={updateCompanyData}
        GET_COMPANY={GET_COMPANY}
        setUpdateCompanyData={setUpdateCompanyData}
      ></UpdateCompany> : ""}

      <CreateCompany
        title="Create Company"
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        GET_COMPANY={GET_COMPANY}
      ></CreateCompany>

      <DeleteCompany
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        companyId={companyDeleteId}
        GET_COMPANY={GET_COMPANY}
      >

      </DeleteCompany>

    </div>
  )

}

export default CompanyList