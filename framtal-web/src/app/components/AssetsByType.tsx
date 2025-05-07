import React from 'react'
import DisplayCard from './ui/cards/cards'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

type Asset = {
  __typename: string
  id: string
  description: string
  amount: number
  assetType: string
  assetIdentifier?: string
}

interface AssetsByTypeProps {
  assets: Asset[]
}

interface AssetTypeInfo {
  label: string
  icon?: string
}

const ASSET_TYPES: Record<string, AssetTypeInfo> = {
  domestic_property: {
    label: 'Fasteignir á Íslandi',
    icon: '🏠',
  },
  foreign_property: {
    label: 'Fasteignir erlendis',
    icon: '🏙️',
  },
  vehicle: {
    label: 'Ökutæki',
    icon: '🚗',
  },
  cash: {
    label: 'Handbært fé',
    icon: '💵',
  },
  stocks: {
    label: 'Hlutabréf',
    icon: '📈',
  },
  other: {
    label: 'Aðrar eignir',
    icon: '📦',
  },
}

export const AssetsByType: React.FC<AssetsByTypeProps> = ({ assets }) => {
  // Group assets by type
  const assetsByType: Record<string, Asset[]> = {}
  let totalAmount = 0

  assets.forEach((asset) => {
    const type = asset.assetType || 'other'
    if (!assetsByType[type]) {
      assetsByType[type] = []
    }
    assetsByType[type].push(asset)
    totalAmount += asset.amount || 0
  })

  console.log(assetsByType)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(assetsByType).map(([type, typeAssets]) => {
        const typeInfo = ASSET_TYPES[type] || { label: type, icon: '❓' }
        const typeTotal = typeAssets.reduce((sum, asset) => sum + (asset.amount || 0), 0)

        return (
          <DisplayCard
            key={type}
            title={typeInfo.label}
            parentType={type}
            type="asset"
            amount={typeTotal || 0}
            items={typeAssets.map((asset) => ({
              id: asset.id,
              entity: asset.description,
              description: asset.description,
              amount: asset.amount || 0,
              identifier: asset.assetIdentifier,
            }))}
            className="mb-4"
          />
        )
      })}
    </div>
  )
}
