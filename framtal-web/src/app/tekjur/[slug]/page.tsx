"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo';
import { useQuery } from '@apollo/client'

export default function BlogPost() {
  
  const { slug } = useParams();

  if (![
    "salary",
    "sports",
    "perdiem",
    "job_education_grant",
  ].includes(slug)) {
      return (<Layout>Síða fannst ekki</Layout>)
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME, {
    variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
  })

  if (loading) return <Layout><p className="text-center">Sæki gögn ...</p></Layout>
  if (error) return <Layout><p className="text-center text-red-500">Villa: {error.message}</p></Layout>

  const incomes = data?.applicationsByFamilyNumber[0].incomes.filter((income) => income.incomeType === slug);
    
  if (!incomes || incomes.length === 0) { 
    return (
      <Layout>
        <p className="text-center">Engar tekjur fundust</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {incomes && incomes.map((income) =>
         <div key={income.id}>
          {income.id}
          {income.amount}
          {income.incomeType}
          {income.payor.name}
        </div>
      )}
    </Layout>
  )

}