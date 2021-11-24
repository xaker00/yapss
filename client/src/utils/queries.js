import { gql } from '@apollo/client';

export const GET_PHOTO = gql`
  # Needs testing, does photoId need to be changed to _id?
  query photo($photoId: String) {
    photo (_id: $photoId) {
      _id
      title
      description
      hashtag
      likes
      url
      comments
      user
    }
  }
`;