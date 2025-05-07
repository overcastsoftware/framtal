"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo';
import { useQuery } from '@apollo/client';
import IncomeForm from '../../components/IncomeForm';
import NewIncomeForm from '../../components/NewIncomeForm';

const sortById = (a, b) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

export default function IncomePage() {
  
  const { slug } = useParams();
  const familyNumber = '1203894569'; // In a real app, this should come from user context/auth

  // Validate the income type from URL parameter
  if (![
    "salary",
    "sports",
    "perdiem",
    "job_education_grant",
  ].includes(slug)) {
      return (<Layout>Síða fannst ekki</Layout>)
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME, {
    variables: { familyNumber },
  });

  if (loading) return <Layout><p className="text-center">Sæki gögn ...</p></Layout>
  if (error) return <Layout><p className="text-center text-red-500">Villa: {error.message}</p></Layout>

  const application = data?.applicationsByFamilyNumber[0];
  if (!application) {
    return <Layout><p className="text-center">No application found</p></Layout>;
  }

  // Filter incomes based on the income type from the URL
  const incomes = application.incomes.filter((income) => income.incomeType === slug);
    
  if (!incomes || incomes.length === 0) { 
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Engar línur fundust.</h1>
          <p className="mb-6">Það eru engar línur af þessari tegund ennþá.</p>
          
          <NewIncomeForm 
            applicationId={parseInt(application.id)} 
            nationalId={familyNumber} 
            familyNumber={familyNumber}
          />
        </div>
      </Layout>
    );
  }

  // Get income type display name
  const incomeTypeLabels = {
    salary: 'Launatekjur',
    sports: 'Líkamsræktar- og íþróttastyrkir',
    perdiem: 'Dagpeningar',
    job_education_grant: 'Starfs- og menntunar styrkir'
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {incomeTypeLabels[slug] || 'Launatekjur og starfstengdar greiðslur'}
        </h1>
        
        <div className="mb-6">
          {incomes.sort(sortById).map((income) => (
            <div key={income.id} className="bg-white shadow rounded-lg p-6 mb-4">
              <IncomeForm 
                income={income} 
                applicationId={parseInt(application.id)}
                nationalId={familyNumber}
                familyNumber={familyNumber}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t pt-6">
          <NewIncomeForm 
            applicationId={parseInt(application.id)}
            nationalId={familyNumber}
            familyNumber={familyNumber}
          />
        </div>
      </div>
    </Layout>
  );
}