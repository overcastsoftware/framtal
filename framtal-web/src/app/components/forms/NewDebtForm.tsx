import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_DEBT } from '@/graphql/mutations/debtOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT } from '@/graphql/queries/getUserInfo'
import FormField, { FormValues } from './FormField'

// Interface to match the GraphQL CreateDebtInput schema
interface CreateDebtInput {
  applicationId: number
  nationalId: string
  amount?: number
  description?: string
  descriptionSecondary?: string
  loanType?: string
  lenderId?: string
  loanNumber?: string
  loanDate?: string
  loanLength?: string
  totalCost?: number
  totalPayment?: number
  principalPayment?: number
  deduction?: number
}

type NewDebtFormProps = {
  applicationId: number
  nationalId: string
  familyNumber: string
}

const NewDebtForm: React.FC<NewDebtFormProps> = ({ applicationId, nationalId, familyNumber }) => {
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
      loanType: 'property',
      description: '',
      totalCost: 0,
      lenderId: '',
      loanNumber: '',
      descriptionSecondary: '',
      loanDate: '',
      loanLength: '',
      totalPayment: 0,
      principalPayment: 0,
    },
  })

  const loanType = watch('loanType')

  const [createDebt, { loading }] = useMutation(CREATE_DEBT, {
    onCompleted: () => {
      setMessage('Skráning tókst!')
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
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data) => {
    // Make a copy of the data to avoid modifying the form data directly
    const debtData: CreateDebtInput = {
      applicationId,
      nationalId,
      amount: data.amount,
      description: data.description,
      loanType: data.loanType,
      totalCost: data.totalCost,
      lenderId: data.lenderId,
      loanNumber: data.loanNumber,
      descriptionSecondary: data.description_secondary,
      loanLength: data.loanLength,
      totalPayment: data.totalPayment,
      principalPayment: data.principalPayment,
    }

    // Only include loanDate if it has a valid value
    if (data.loanDate && data.loanDate.trim() !== '') {
      debtData.loanDate = data.loanDate
    }

    // Don't include any ID field to ensure proper auto-increment on the server
    createDebt({
      variables: {
        input: debtData,
      },
    })
  }

  if (!showForm) {
    return (
      <div className="mt-6 flex justify-end">
        <button className="btn-ghost" onClick={() => setShowForm(true)}>
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
          className="btn-link text-red-500 hover:text-red-700 font-bold text-sm"
          title="Hætta við"
          style={{ position: 'absolute', right: '0', top: '0' }}
        >
          Hætta við
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormField<FormValues>
            name="loanType"
            label="Tegund"
            control={control}
            type="select"
            rules={{ required: 'Tegund er nauðsynleg' }}
            error={errors.loanType}
            options={[
              { value: 'property', label: 'Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota' },
              { value: 'other', label: 'Aðrar skuldir og vaxtagjöld' },
            ]}
          />
        </div>

        {loanType === 'other' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField<FormValues>
              name="description"
              label="Lýsing"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description}
            />

            <FormField<FormValues>
              name="totalCost"
              label="Vaxtagjöld"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalCost}
            />

            <FormField<FormValues>
              name="amount"
              label="Eftirstöðvar skulda"
              control={control}
              type="tel"
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
        )}

        {loanType === 'property' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField<FormValues>
              name="description_secondary"
              label="Kaupár"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description_secondary}
            />

            <FormField<FormValues>
              name="description"
              label="Heimilisfang"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description}
            />

            <FormField<FormValues>
              name="lenderId"
              label="Kennitala lánveitanda"
              control={control}
              placeholder="t.d., 5501119999"
              rules={{
                required: 'Kennitala er nauðsynleg',
                pattern: {
                  value: /^\d+$/,
                  message: 'Má eingöngu innihalda tölustafi',
                },
              }}
              error={errors.lenderId}
            />

            <FormField<FormValues>
              name="loanNumber"
              label="Lánanúmer"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.loanNumber}
            />

            <FormField<FormValues>
              name="loanDate"
              label="Lántökudagur"
              control={control}
              rules={{
                required: 'Verður að fylla út',
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'Dagsetning verður að vera á forminu YYYY-MM-DD',
                },
              }}
              error={errors.loanDate}
            />

            <FormField<FormValues>
              name="loanLength"
              label="Lánstími í árum"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.loanLength}
            />

            <FormField<FormValues>
              name="totalPayment"
              label="Heildargreiðslur ársins"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalPayment}
            />

            <FormField<FormValues>
              name="principalPayment"
              label="Afborgun á nafnvirði"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.principalPayment}
            />

            <FormField<FormValues>
              name="totalCost"
              label="Vaxtagjöld"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalCost}
            />

            <FormField<FormValues>
              name="amount"
              label="Eftirstöðvar skulda"
              control={control}
              type="tel"
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
        )}

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

export default NewDebtForm
