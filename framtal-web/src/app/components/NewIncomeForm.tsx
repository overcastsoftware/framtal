import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_INCOME } from '@/graphql/mutations/incomeOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo'
import FormField from './FormField'

type NewIncomeFormProps = {
  applicationId: number
  nationalId: string
  familyNumber: string
}

const NewIncomeForm: React.FC<NewIncomeFormProps> = ({
  applicationId,
  nationalId,
  familyNumber,
}) => {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 0,
      incomeType: 'salary',
      payorId: '',
    },
  })

  const [createIncome, { loading }] = useMutation(CREATE_INCOME, {
    onCompleted: () => {
      setMessage('Tekjur skráðar!')
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
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data) => {
    // Make a copy of the data to avoid modifying the form data directly
    const incomeData = {
      applicationId,
      nationalId,
      amount: data.amount,
      incomeType: data.incomeType,
      payorId: data.payorId,
    }

    // Don't include any ID field to ensure proper auto-increment on the server
    createIncome({
      variables: {
        input: incomeData,
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
            name="payorId"
            label="Kennitala greiðanda"
            control={control}
            rules={{
              required: 'Kennitala er nauðsynleg',
              pattern: {
                value: /^\d+$/,
                message: 'Má eingöngu innihalda tölustafi',
              },
            }}
            error={errors.payorId}
            placeholder="t.d., 5501119999"
          />

          <FormField
            name="incomeType"
            label="Tegund"
            control={control}
            rules={{ required: 'Tegund er nauðsynleg' }}
            error={errors.incomeType}
            type="select"
            options={[
              { value: 'salary', label: 'Laun' },
              { value: 'sports', label: 'Líkamsræktarstyrkur' },
              { value: 'perdiem', label: 'Dagpeningar' },
              { value: 'job_education_grant', label: 'Starfsmenntunarstyrkur' },
            ]}
          />

          <FormField
            name="amount"
            label="Upphæð"
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

export default NewIncomeForm
