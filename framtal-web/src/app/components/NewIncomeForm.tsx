import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_INCOME } from '@/graphql/mutations/incomeOperations';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo';

type NewIncomeFormProps = {
  applicationId: number
  nationalId: string
  familyNumber: string
}

const NewIncomeForm: React.FC<NewIncomeFormProps> = ({ applicationId, nationalId, familyNumber }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      amount: 0,
      incomeType: 'salary',
      payorId: ''
    }
  });

  const [createIncome, { loading }] = useMutation(CREATE_INCOME, {
    onCompleted: () => {
      setMessage('Tekjur skráðar!');
      reset();
      setTimeout(() => {
        setMessage('');
        setShowForm(false);
      }, 2000);
    },
    onError: (error) => {
      console.error('Villa við skráningu:', error);
      setMessage(`Error: ${error.message}`);
    },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME,
        variables: { familyNumber }
      }
    ]
  });

  const onSubmit = (data) => {
    // Make a copy of the data to avoid modifying the form data directly
    const incomeData = {
      applicationId,
      nationalId,
      amount: data.amount,
      incomeType: data.incomeType,
      payorId: data.payorId
    };

    // Don't include any ID field to ensure proper auto-increment on the server
    createIncome({
      variables: {
        input: incomeData
      }
    });
  };

  if (!showForm) {
    return (
      <div className="mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          + Bæta við
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Bæta við</h3>
        <div className="flex items-center space-x-2">
          {message && (
            <span className={message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}>
              {message}
            </span>
          )}
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Hætta við
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kennitala greiðanda
            </label>
            <Controller
              name="payorId"
              control={control}
              rules={{ 
                required: 'Kennitala er nauðsynleg',
                pattern: {
                  value: /^\d+$/,
                  message: 'Má eingöngu innihalda tölustafi'
                }
              }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="t.d., 5501119999"
                  className="w-full px-3 py-2 border rounded-md"
                  {...field}
                />
              )}
            />
            {errors.payorId && (
              <p className="text-red-500 text-sm mt-1">{errors.payorId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upphæð
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{ 
                required: 'Upphæð er nauðsynleg',
                min: {
                  value: 1,
                  message: 'Upphæð verður að vera hærri en 0'
                }
              }}
              render={({ field }) => (
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                  <option value="job_education_grant">Starfsmenntunarstyrkur</option>
                </select>
              )}
            />
            {errors.incomeType && (
              <p className="text-red-500 text-sm mt-1">{errors.incomeType.message}</p>
            )}
          </div>
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
  );
};

export default NewIncomeForm;