import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './CompanyList.css'
import List from '../List'
import UpdateCompany from './UpdateCompany'


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
    }
  }
`



function CompanyList() {
  const [open, setOpen] = React.useState(false)
  const [companyData, setCompanyData] = React.useState("")



  const { loading, data, error } = useQuery(GET_COMPANY)


  const onUpdateClick = (n) => {
    //console.log("here:", n)
    setCompanyData(n)
    setOpen(true)
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
      />

      {companyData ? <UpdateCompany
        open={open}
        setOpen={setOpen}
        companyData={companyData}
      >
      </UpdateCompany> : ""}
    </div>
  )

}

export default CompanyList