// import { useQuery } from '@apollo/client'
// import { GET_APPLICATIONS_BY_FAMILY_NUMBER } from '../../graphql/queries/getUserInfo'

// export default function Cards() {
//   // Using the useQuery hook to execute the GET_HELLO query
//   const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER, {
//     variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
//   })

//   console.debug(data)

//   if (loading) return <p className="text-center">Loading...</p>
//   if (error) return <p className="text-center text-red-500">Error: {error.message}</p>

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
//       <h2 className="text-xl font-bold mb-2">
//         Velkominn {data.applicationsByFamilyNumber[0].familyNumber}
//       </h2>
//       <p className="text-gray-700 dark:text-gray-300 mb-4">
//         Þú getur ferið yfir, bætt við breytt og staðfest þegar þú ert tilbúinn
//       </p>
//       <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-auto">
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   )
// }
