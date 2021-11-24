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
    filename
    mimetype
    encoding
  }
}
`;
