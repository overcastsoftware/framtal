"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT } from '@/graphql/queries/getUserInfo';
import { useQuery } from '@apollo/client'

export default function BlogPost() {
  
  const { slug } = useParams();

  if (![
    "property",
    "other",
  ].includes(slug)) {
      return (<Layout>Síða fannst ekki</Layout>)
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT, {
    variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
  })

  if (loading) return <Layout><p className="text-center">Sæki gögn ...</p></Layout>
  if (error) return <Layout><p className="text-center text-red-500">Villa: {error.message}</p></Layout>

  const debts = data?.applicationsByFamilyNumber[0].debts.filter((debt) => debt.loanType === slug);
    
  if (!debts || debts.length === 0) { 
    return (
      <Layout>
        <p className="text-center">Engar skuldir fundust</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {debts && debts.map((debt) =>
         <div key={debt.id}>
          {debt.id}
          {debt.amount}
          {debt.lender && debt.lender.name}
          {debt.loanType}
        </div>
      )}
    </Layout>
  )

}