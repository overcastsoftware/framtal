import { gql } from '@apollo/client';

export const CREATE_ASSET = gql`
  mutation CreateAsset($input: CreateAssetInput!) {
    createAsset(createAssetInput: $input) {
      id
      nationalId
      amount
      assetType
      description
      assetIdentifier
    }
  }
`;

export const UPDATE_ASSET = gql`
  mutation UpdateAsset($input: UpdateAssetInput!) {
    updateAsset(updateAssetInput: $input) {
      id
      amount
      assetType
      description
      assetIdentifier
    }
  }
`;

export const DELETE_ASSET = gql`
  mutation DeleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`;
