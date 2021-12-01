import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_USER = gql``;

/**
 * upload a photo
 */
export const ADD_PHOTO = gql`
  mutation addPhoto($file: Upload!, $title: String!, $description:String!, $hashtags: [String]!){
  addPhoto(file: $file, title: $title, description: $description,hashtags: $hashtags){
    _id
  }
}
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      token
      user {
        _id
      }
    }
  }
`;