"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS } from '@/graphql/queries/getUserInfo';
import { useQuery } from '@apollo/client'

export default function BlogPost() {
  
  const { slug } = useParams();

  if (![
    "domestic_property",
    "vehicle",
  ].includes(slug)) {
      return (<Layout>Síða fannst ekki</Layout>)
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS, {
    variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
  })

  if (loading) return <Layout><p className="text-center">Sæki gögn ...</p></Layout>
  if (error) return <Layout><p className="text-center text-red-500">Villa: {error.message}</p></Layout>

  const assets = data?.applicationsByFamilyNumber[0].assets.filter((asset) => asset.assetType === slug);
    
  if (!assets || assets.length === 0) { 
    return (
      <Layout>
        <p className="text-center">Engar skuldir fundust</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {assets && assets.map((asset) =>
         <div key={asset.id}>
          {asset.id}
          {asset.amount}
          {asset.assetIdentifier}
          {asset.description}
        </div>
      )}
    </Layout>
  )

}