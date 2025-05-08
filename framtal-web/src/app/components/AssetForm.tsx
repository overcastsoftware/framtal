import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_ASSET, DELETE_ASSET } from '@/graphql/mutations/assetOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS } from '@/graphql/queries/getUserInfo'

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
            className="btn-link text-red-500 hover:text-red-700 font-bold text-sm"
            title="Eyða þessari línu"
            style={{ position: 'absolute', right: '0', top: '0' }}
          >
            Eyða
          </button>
        </div>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">
              {asset.assetType === 'domestic_property'
                ? 'Heimilisfang'
                : asset.assetType === 'vehicle'
                  ? 'Kaupár'
                  : 'Lýsing'}
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="cursor-pointer w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setTimeout(handleFieldChange, 100) // Submit after field updates
                  }}
                  onBlur={(e) => {
                    field.onBlur()
                    handleFieldChange()
                  }}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">
              {asset.assetType === 'domestic_property'
                ? 'Fastanúmer eignar'
                : asset.assetType === 'vehicle'
                  ? 'Númer'
                  : 'Annað'}
            </label>
            <Controller
              name="assetIdentifier"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="cursor-pointer w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    // We don't submit here since assetIdentifier isn't part of the API
                  }}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">Fjárhæð</label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Upphæð er nauðsynleg' }}
              render={({ field }) => (
                <input
                  type="tel"
                  className="cursor-pointer w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10))
                    setTimeout(handleFieldChange, 100) // Submit after field updates
                  }}
                  onBlur={(e) => {
                    field.onBlur()
                    handleFieldChange()
                  }}
                />
              )}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AssetForm
