import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_ASSET } from '@/graphql/mutations/assetOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS } from '@/graphql/queries/getUserInfo'
import FormField from './FormField'

type NewAssetFormProps = {
  applicationId: number
  nationalId: string
  familyNumber: string
}

const NewAssetForm: React.FC<NewAssetFormProps> = ({ applicationId, nationalId, familyNumber }) => {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 0,
      assetType: 'domestic_property',
      description: '',
      assetIdentifier: '',
    },
  })

  const assetType = watch('assetType')

  const [createAsset, { loading }] = useMutation(CREATE_ASSET, {
    onCompleted: () => {
      setMessage('Eignir skráðar!')
      reset()

      setTimeout(() => {
        setMessage('')
        setShowForm(false)
      }, 2000)
    },
    onError: (error) => {
      console.error('Villa við skráningu:', error)
      setMessage(`Error: ${error.message}`)
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data) => {
    // Make a copy of the data to avoid modifying the form data directly
    const assetData = {
      applicationId,
      nationalId,
      amount: data.amount,
      assetType: data.assetType,
      assetIdentifier: data.assetIdentifier,
      description: data.description,
    }

    // Don't include any ID field to ensure proper auto-increment on the server
    createAsset({
      variables: {
        input: assetData,
      },
    })
  }

  if (!showForm) {
    return (
      <div className="mt-6 flex justify-end">
        <button
          className="px-6 py-3 bg-white font-bold border border-blue-300 rounded-lg hover:bg-blue-200"
          onClick={() => setShowForm(true)}
        >
          Bæta við gögnum +
        </button>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-lg bg-white">
      <div className="flex justify-end mb-2 relative">
        {message && (
          <span
            className={
              message.startsWith('Error')
                ? 'text-sm text-red-500 font-bold'
                : 'text-sm text-green-500 font-bold'
            }
            style={{ position: 'absolute', right: '80px', top: '0' }}
          >
            {message}
          </span>
        )}
        <button
          onClick={() => setShowForm(false)}
          className="text-red-500 hover:text-red-700 font-bold text-sm"
          title="Hætta við"
          style={{ position: 'absolute', right: '0', top: '0' }}
        >
          Hætta við
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormField
            name="assetType"
            label="Tegund"
            control={control}
            rules={{ required: 'Tegund er nauðsynleg' }}
            error={errors.assetType}
            type="select"
            options={[
              { value: 'domestic_property', label: 'Innlendar fasteignir' },
              { value: 'vehicle', label: 'Bifreiðir' },
              { value: 'other', label: 'Aðrar eignir áður ótaldar' }
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="description"
              label={assetType === 'domestic_property'
                ? 'Heimilisfang'
                : assetType === 'vehicle'
                  ? 'Kaupár'
                  : 'Lýsing'}
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description}
            />

            <FormField
              name="assetIdentifier"
              label={assetType === 'domestic_property'
                ? 'Fastanúmer'
                : assetType === 'vehicle'
                  ? 'Númer'
                  : 'Annað'}
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.assetIdentifier}
            />
          </div>

          <FormField
            name="amount"
            label="Fjárhæð"
            type="tel"
            control={control}
            rules={{
              required: 'Upphæð er nauðsynleg',
              min: {
                value: 1,
                message: 'Upphæð verður að vera hærri en 0',
              },
            }}
            error={errors.amount}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Vista...' : 'Vista'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewAssetForm
