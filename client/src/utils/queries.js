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
export const GET_ALL_PHOTOS = gql`
  {
    photos{
    _id
    title
    description
    likes
    url
      comments {
        comment
          user {
            name
            username
            email
          }
      }
      user {
        name
        username
        email
      }
    }
  }
`;