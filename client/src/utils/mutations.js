import { gql } from "@apollo/client";

// export const LOGIN_USER = gql``;

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
