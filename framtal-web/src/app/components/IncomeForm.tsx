import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_INCOME, DELETE_INCOME } from '@/graphql/mutations/incomeOperations';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo';

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
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      amount: income.amount,
      incomeType: income.incomeType,
    }
  });

  const [updateIncome] = useMutation(UPDATE_INCOME, {
    onCompleted: () => {
      setSaveMessage('Saved!');
      setTimeout(() => setSaveMessage(''), 2000);
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber }
      }
    ]
  });

  const [deleteIncome] = useMutation(DELETE_INCOME, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber }
      }
    ]
  });

  const onSubmit = (data) => {
    updateIncome({
      variables: {
        input: {
          id: parseInt(income.id),
          ...data
        }
      }
    });
  };

  // Auto-save when a field changes
  const handleFieldChange = () => {
    handleSubmit(onSubmit)();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this income item?')) {
      deleteIncome({
        variables: {
          id: parseInt(income.id)
        }
      });
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{income.payor.name}</h3>
        <div className="flex items-center space-x-2">
          {saveMessage && <span className="text-green-500 text-sm">{saveMessage}</span>}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            title="Eyða þessari línu"
          >
            Eyða
          </button>
        </div>
      </div>

      <form onChange={handleFieldChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upphæð
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Upphæð er nauðsynleg' }}
              render={({ field }) => (
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10));
                  }}
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tegund
            </label>
            <Controller
              name="incomeType"
              control={control}
              rules={{ required: 'Tegund er nauðsynleg' }}
              render={({ field }) => (
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  {...field}
                >
                  <option value="salary">Laun</option>
                  <option value="sports">Líkamsræktarstyrkur</option>
                  <option value="perdiem">Dagpeningar</option>
                  <option value="job_education_grant">Starfs- og menntastyrkir</option>
                </select>
              )}
            />
            {errors.incomeType && (
              <p className="text-red-500 text-sm mt-1">{errors.incomeType.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;