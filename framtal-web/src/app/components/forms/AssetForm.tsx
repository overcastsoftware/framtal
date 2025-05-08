import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_ASSET, DELETE_ASSET } from '@/graphql/mutations/assetOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS } from '@/graphql/queries/getUserInfo'
import FormField from './FormField'

type Asset = {
  id: string
  amount: number
  description: string
  assetType: string
  assetIdentifier: string
  nationalId?: string
  applicationId?: number
}

type AssetFormProps = {
  asset: Asset
  familyNumber: string
}

const AssetForm: React.FC<AssetFormProps> = ({ asset, familyNumber }) => {
  const [saveMessage, setSaveMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: asset.amount,
      description: asset.description,
      assetIdentifier: asset.assetIdentifier,
    },
  })

  const [updateAsset] = useMutation(UPDATE_ASSET, {
    onCompleted: () => {
      setSaveMessage('Vistað!')
      setTimeout(() => setSaveMessage(''), 2000)
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS,
        variables: { familyNumber },
      },
    ],
  })

  const [deleteAsset] = useMutation(DELETE_ASSET, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data: { amount: number; description: string; assetIdentifier: string }) => {
    // Only include fields that are valid for UpdateAssetInput
    updateAsset({
      variables: {
        input: {
          id: parseInt(asset.id),
          amount: data.amount,
          description: data.description,
          assetIdentifier: data.assetIdentifier,
        },
      },
    })
  }

  // Auto-save when a field changes
  const handleFieldChange = () => {
    handleSubmit(onSubmit)()
  }

  const handleDelete = () => {
    if (confirm('Ertu viss um að þú viljir eyða þessari línu?')) {
      deleteAsset({
        variables: {
          id: parseInt(asset.id),
        },
      })
    }
  }

  return (
    <div className="mb-4">
      <div className="flex justify-end mb-2">
        <div className="flex items-center space-x-2 relative">
          {saveMessage && (
            <span
              className="text-green-500 text-sm font-bold"
              style={{ position: 'absolute', right: '40px', top: '0' }}
            >
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleDelete}
            className="btn-link text-primary-red-600 hover:text-secondary-rose-400 font-bold text-sm"
            title="Eyða þessari línu"
            style={{ position: 'absolute', right: '0', top: '0' }}
          >
            Eyða
          </button>
        </div>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormField
            name="description"
            label={
              asset.assetType === 'domestic_property'
                ? 'Heimilisfang'
                : asset.assetType === 'vehicle'
                  ? 'Kaupár'
                  : 'Lýsing'
            }
            control={control}
            error={errors.description}
            onChange={() => setTimeout(handleFieldChange, 100)}
          />

          <FormField
            name="assetIdentifier"
            label={
              asset.assetType === 'domestic_property'
                ? 'Fastanúmer eignar'
                : asset.assetType === 'vehicle'
                  ? 'Númer'
                  : 'Annað'
            }
            control={control}
            error={errors.assetIdentifier}
          />

          <FormField
            name="amount"
            label="Fjárhæð"
            type="tel"
            control={control}
            rules={{ required: 'Upphæð er nauðsynleg' }}
            error={errors.amount}
            onChange={() => setTimeout(handleFieldChange, 100)}
          />
        </div>
      </form>
    </div>
  )
}

export default AssetForm
