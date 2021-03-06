import { gql } from "@apollo/client";

export const GET_PHOTO = gql`
  # Needs testing, does photoId need to be changed to _id?
  query photo($photoId: String){
    photo(photoId: $photoId) {
      _id
      title
      description
      likes
      url
      comments {
        comment
      }
      user {
        name
        username
        email
      }
    }
  }
`

export const GET_COMMENTS = gql`
  # psuedo code here, database might need to be completed
  query comments($commentId: String) {
    comments(_id: $commentId) {
      _id
      comment
      photo
      user
    }
  }
`;

export const GET_ME = gql`
query me {
  me {
    username
    photos {
      _id
      title
      description
      hashtags
      likes
      url
      comments {
        comment
        user {
          username
        }
      }
    }
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
