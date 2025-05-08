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
      payorId: income.payorId,
      payorName: income.payor?.name || 'Fannst ekki í Þjóðskrá',
    }
  });

  const [updateIncome] = useMutation(UPDATE_INCOME, {
    onCompleted: () => {
      setSaveMessage('Vistað!');
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
    // Only include fields that are valid for UpdateIncomeInput
    updateIncome({
      variables: {
        input: {
          id: parseInt(income.id),
          amount: data.amount,
          payorId: data.payorId
          // payorName is excluded as it's not part of UpdateIncomeInput
        }
      }
    });
  };

  // Auto-save when a field changes
  const handleFieldChange = () => {
    handleSubmit(onSubmit)();
  };

  const handleDelete = () => {
    if (confirm('Ertu viss um að þú viljir eyða þessari línu?')) {
      deleteIncome({
        variables: {
          id: parseInt(income.id)
        }
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-end mb-2">
        <div className="flex items-center space-x-2 relative">
          {saveMessage && <span className="text-green-500 text-sm font-bold"  style={{ position: 'absolute', right: '40px', top: '0' }}>{saveMessage}</span>}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">
              Kennitala greiðanda
            </label>
            <Controller
              name="payorId"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setTimeout(handleFieldChange, 100); // Submit after field updates
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldChange();
                  }}
                />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">
              Nafn greiðanda
            </label>
            <Controller
              name="payorName"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  disabled={income.payor === null}
                  className="w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // We don't submit here since payorName isn't part of the API
                  }}
                />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-blue-600 mb-1">
              Fjárhæð
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Upphæð er nauðsynleg' }}
              render={({ field }) => (
                <input
                  type="tel"
                  className="w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10));
                    setTimeout(handleFieldChange, 100); // Submit after field updates
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldChange();
                  }}
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;