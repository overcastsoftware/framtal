"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo';
import { useQuery } from '@apollo/client';
import IncomeForm from '../../components/IncomeForm';
import NewIncomeForm from '../../components/NewIncomeForm';

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

  // Get income type display name
  const incomeTypeLabels = {
    salary: 'Launatekjur',
    sports: 'Líkamsræktar- og íþróttastyrkir',
    perdiem: 'Dagpeningar',
    job_education_grant: 'Starfs- og menntunar styrkir'
  };

  // Group incomes by their type
  const groupedIncomes = {};
  application.incomes.forEach(income => {
    const type = income.incomeType;
    if (!groupedIncomes[type]) {
      groupedIncomes[type] = [];
    }
    groupedIncomes[type].push(income);
  });

  // Filter to only include the requested type if slug is provided
  const incomeTypesToShow = slug ? [slug] : Object.keys(groupedIncomes);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">
          Tekjur
        </h1>
        <h3 className="mb-7">Launatekjur og starfstengdar greiðslur</h3>

        {incomeTypesToShow.length === 0 ? (
          <p className="mb-6">Engar tekjulínur fundust</p>
        ) : (
          <>
            {incomeTypesToShow.map(type => {
              const incomes = groupedIncomes[type] || [];
              if (incomes.length === 0) return null;
              
              return (
                <div key={type} className="mb-8  border-b border-blue-600 pb-5">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {incomeTypeLabels[type] || type}
                  </h2>
                  
                  <div className="mb-6">
                    {incomes.map((income) => (
                      <div key={income.id}>
                        <IncomeForm 
                          income={income} 
                          applicationId={parseInt(application.id)}
                          nationalId={familyNumber}
                          familyNumber={familyNumber}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <NewIncomeForm 
                      applicationId={parseInt(application.id)}
                      nationalId={familyNumber}
                      familyNumber={familyNumber}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/yfirlit" className="text-blue-600 hover:underline">
          Til baka
        </Link>
      </div>
    </Layout>
  );
}