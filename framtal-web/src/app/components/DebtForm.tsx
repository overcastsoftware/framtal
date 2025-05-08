import React, { useState } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_DEBT, DELETE_DEBT } from '@/graphql/mutations/debtOperations'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT } from '@/graphql/queries/getUserInfo'
import FormField, { FormValues } from './FormField'

// Interface to match the GraphQL UpdateDebtInput schema
interface UpdateDebtInput {
  id: number
  amount?: number
  description?: string
  totalCost?: number
  loanType?: string
  lenderId?: string
  loanNumber?: string
  descriptionSecondary?: string
  loanLength?: string
  loanDate?: string
  totalPayment?: number
  principalPayment?: number
  deduction?: number
}

type Debt = {
  id: string
  amount: number
  description: string
  loanType: string
  totalCost: number
  nationalId?: string
  applicationId?: number
  lenderId?: string
  loanNumber?: string
  descriptionSecondary?: string
  loanDate?: string
  loanLength?: string
  totalPayment?: number
  principalPayment?: number
}

type DebtFormProps = {
  debt: Debt
  familyNumber: string
}

const DebtForm: React.FC<DebtFormProps> = ({ debt, familyNumber }) => {
  const [saveMessage, setSaveMessage] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      amount: debt.amount,
      description: debt.description,
      totalCost: debt.totalCost || 0,
      loanType: debt.loanType || 'other',
      lenderId: debt.lenderId || '',
      loanNumber: debt.loanNumber || '',
      descriptionSecondary: debt.descriptionSecondary || '',
      loanDate: debt.loanDate?.split('T')[0] || '',
      loanLength: debt.loanLength || '',
      totalPayment: debt.totalPayment || 0,
      principalPayment: debt.principalPayment || 0,
    },
  })

  const [updateDebt] = useMutation(UPDATE_DEBT, {
    onCompleted: () => {
      setSaveMessage('Vistað!')
      setTimeout(() => setSaveMessage(''), 2000)
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT,
        variables: { familyNumber },
      },
    ],
  })

  const [deleteDebt] = useMutation(DELETE_DEBT, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT,
        variables: { familyNumber },
      },
    ],
  })

  const onSubmit = (data: FormValues) => {
    // Create the base update input
    const updateInput: UpdateDebtInput = {
      id: parseInt(debt.id),
      amount: data.amount,
      description: data.description,
      totalCost: data.totalCost,
      loanType: data.loanType,
      lenderId: data.lenderId,
      loanNumber: data.loanNumber,
      descriptionSecondary: data.descriptionSecondary,
      loanLength: data.loanLength,
      totalPayment: data.totalPayment,
      principalPayment: data.principalPayment,
    }

    // Only include loanDate if it has a valid value
    if (data.loanDate && data.loanDate.trim() !== '') {
      updateInput.loanDate = data.loanDate;
    }

    // Update the debt record
    updateDebt({
      variables: {
        input: updateInput,
      },
    })
  }

  // Auto-save when a field changes
  const handleFieldChange = () => {
    handleSubmit(onSubmit)()
  }

  const handleDelete = () => {
    if (confirm('Ertu viss um að þú viljir eyða þessari línu?')) {
      deleteDebt({
        variables: {
          id: parseInt(debt.id),
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
            className="text-red-500 hover:text-red-700 font-bold text-sm"
            title="Eyða þessari línu"
            style={{ position: 'absolute', right: '0', top: '0' }}
          >
            Eyða
          </button>
        </div>
      </div>

      <form>
        {debt.loanType === 'other' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField<FormValues>
              name="description"
              label="Lýsing"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="totalCost"
              label="Vaxtagjöld"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalCost as FieldError | undefined}
              onChange={handleFieldChange}
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
              error={errors.amount as FieldError | undefined}
              onChange={handleFieldChange}
            />
          </div>
        )}

        {debt.loanType === 'property' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField<FormValues>
              name="descriptionSecondary"
              label="Kaupár"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.descriptionSecondary as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="description"
              label="Heimilisfang"
              control={control}
              rules={{ required: 'Nauðsynlegt að fylla út' }}
              error={errors.description as FieldError | undefined}
              onChange={handleFieldChange}
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
              error={errors.lenderId as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="loanNumber"
              label="Lánanúmer"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.loanNumber as FieldError | undefined}
              onChange={handleFieldChange}
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
              error={errors.loanDate as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="loanLength"
              label="Lánstími í árum"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.loanLength as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="totalPayment"
              label="Heildargreiðslur ársins"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalPayment as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="principalPayment"
              label="Afborgun á nafnvirði"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.principalPayment as FieldError | undefined}
              onChange={handleFieldChange}
            />

            <FormField<FormValues>
              name="totalCost"
              label="Vaxtagjöld"
              type="tel"
              control={control}
              rules={{ required: 'Verður að fylla út' }}
              error={errors.totalCost as FieldError | undefined}
              onChange={handleFieldChange}
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
              error={errors.amount as FieldError | undefined}
              onChange={handleFieldChange}
            />
          </div>
        )}
      </form>
    </div>
  )
}

export default DebtForm
