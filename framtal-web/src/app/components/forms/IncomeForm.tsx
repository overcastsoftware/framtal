import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_INCOME, DELETE_INCOME } from '@/graphql/mutations/incomeOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo'
import FormField from './FormField'

type Entity = {
  __typename?: string
  name: string
  nationalId: string
}

type Income = {
  id: string
  amount: number
  incomeType: string
  payor: Entity
  payorId?: string
  nationalId?: string
  applicationId?: number
}

type IncomeFormProps = {
  income: Income
  familyNumber: string
}

const IncomeForm: React.FC<IncomeFormProps> = ({ income, familyNumber }) => {
  const [saveMessage, setSaveMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: income.amount,
      payorId: income.payorId,
      payorName: income.payor?.name || 'Fannst ekki í Þjóðskrá',
    },
  })

  const [updateIncome] = useMutation(UPDATE_INCOME, {
    onCompleted: () => {
      setSaveMessage('Vistað!')
      setTimeout(() => setSaveMessage(''), 2000)
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber },
      },
    ],
  })

  const [deleteIncome] = useMutation(DELETE_INCOME, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data: { amount: number; payorId: string | undefined; payorName: string }) => {
    // Only include fields that are valid for UpdateIncomeInput
    updateIncome({
      variables: {
        input: {
          id: parseInt(income.id),
          amount: data.amount,
          payorId: data.payorId,
          // payorName is excluded as it's not part of UpdateIncomeInput
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
      deleteIncome({
        variables: {
          id: parseInt(income.id),
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
            name="payorId"
            label="Kennitala greiðanda"
            control={control}
            error={errors.payorId}
            onChange={() => setTimeout(handleFieldChange, 100)}
          />

          <FormField
            name="payorName"
            label="Nafn greiðanda"
            control={control}
            className={income.payor === null ? 'opacity-50' : ''}
            error={errors.payorName}
            placeholder=""
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

export default IncomeForm
