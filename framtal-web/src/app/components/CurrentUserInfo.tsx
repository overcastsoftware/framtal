import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries/getUserInfo';

export default function CurrentUserInfo() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p className="text-center">Loading user information...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!data || !data.currentUser) return <p className="text-center">No user information available.</p>;

  const { currentUser } = data;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Current User Information</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">Name:</span> {currentUser.name}</p>
        <p><span className="font-semibold">ID:</span> {currentUser.nationalId}</p>
        <p><span className="font-semibold">Email:</span> {currentUser.email}</p>
        <p><span className="font-semibold">Phone:</span> {currentUser.phone}</p>
        <p><span className="font-semibold">Address:</span> {currentUser.address}</p>
        <p><span className="font-semibold">Postal Code:</span> {currentUser.postalCode}</p>
        <p><span className="font-semibold">Family Number:</span> {currentUser.familyNumber}</p>
      </div>
    </div>
  );
}