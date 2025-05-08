'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS } from '@/graphql/queries/getUserInfo'
import { useQuery } from '@apollo/client'
import AssetForm from '../../components/AssetForm'
import NewAssetForm from '../../components/NewAssetForm'
import { sortById } from '../../../lib/utils'

export default function AssetPage() {
  const { slug } = useParams()
  const familyNumber = '1203894569' // In a real app, this should come from user context/auth

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS, {
    variables: { familyNumber },
  })

  // Validate the asset type from URL parameter
  if (!['domestic_property', 'vehicle', 'other'].includes(slug)) {
    return <Layout>Síða fannst ekki</Layout>
  }

  if (loading)
    return (
      <Layout>
        <p className="text-center">Sæki gögn ...</p>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <p className="text-center text-red-500">Villa: {error.message}</p>
      </Layout>
    )

  const application = data?.applicationsByFamilyNumber[0]
  if (!application) {
    return (
      <Layout>
        <p className="text-center">Ekkert framtal fannst</p>
      </Layout>
    )
  }

  console.log('Application:', application)

  // Get asset type display name
  const assetTypeLabels = {
    domestic_property: 'Innlendar fasteignir',
    vehicle: 'Bifreiðir',
    other: 'Aðrar eignir áður ótaldar',
  }

  // Group assets by their type
  const groupedAssets = {}
  application.assets.forEach((asset) => {
    const type = asset.assetType
    if (!groupedAssets[type]) {
      groupedAssets[type] = []
    }
    groupedAssets[type].push(asset)
  })

  console.log('Grouped Assets:', groupedAssets)
  // Filter to only include the requested type if slug is provided
  let assetTypesToShow = slug ? [slug] : Object.keys(groupedAssets)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="py-1 max-w-fit bg-white cursor-pointer duration-100 hover:shadow-[inset_0px_-2px_0px_0px_rgba(0,97,255,1.00)]  shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden">
          <Link
            href="/yfirlit"
            className="justify-end text-primary-blue-600 text-sm font-semibold  leading-none "
          >
            Til baka
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-3">Eignir</h1>
        <h3 className="mb-7">Fasteignir, bifreiðir og aðrar eignir</h3>

        {assetTypesToShow.length === 0 ? (
          <p className="mb-6">Engar eignalínur fundust</p>
        ) : (
          <>
            {assetTypesToShow.map((type, i) => {
              const assets = groupedAssets[type] || []
              if (assets.length === 0) return null

              return (
                <div
                  key={type}
                  className={`mb-8 ${i !== assetTypesToShow.length - 1 ? 'border-b' : ''} border-blue-600 pb-5`}
                >
                  <h2 className="text-xl font-semibold text-blue-600">
                    {assetTypeLabels[type] || type}
                  </h2>

                  <div className="mb-6">
                    {assets.sort(sortById).map((asset) => (
                      <div key={asset.id}>
                        <AssetForm
                          asset={asset}
                          applicationId={parseInt(application.id)}
                          nationalId={familyNumber}
                          familyNumber={familyNumber}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <NewAssetForm
                      applicationId={parseInt(application.id)}
                      nationalId={familyNumber}
                      familyNumber={familyNumber}
                    />
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </Layout>
  )
}
