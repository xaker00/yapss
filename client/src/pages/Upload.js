import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Paper, TextField, Box, Button } from "@mui/material";

import { ADD_PHOTO } from "../utils/mutations";

import ReactTagInput from "@pathofdev/react-tag-input";

import "./upload.css";
import "@pathofdev/react-tag-input/build/index.css";

// docs
// https://www.apollographql.com/blog/graphql/file-uploads/with-react-hooks-typescript-amazon-s3-tutorial/

export const Upload = (props) => {
  // keep track of form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: [],
    file: {},
  });

  // expose graphql as a function
  const [savePhoto, { error }] = useMutation(ADD_PHOTO);

  const onTagChangeHandler = (newTags) => {
    setFormData({ ...formData, hashtags: [...newTags] });
  };

  // Handle file upload changes
  const onFileChangeHandler = (file) => {
    console.log(file);
    setFormData({ ...formData, file });
  };

  // handle text input changes
  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // upload the photo
  const submitForm = async () => {
    const response = await savePhoto({ variables: { ...formData } });
    console.log("response", response);

    if (error) {
      throw new Error("something went wrong!");
    }
  };

  return (
    <Paper sx={{ marginTop: 2 }}>
      <div style={{ width: "100%" }}>
        <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
          <TextField
            sx={{ m: 2 }}
            id="title"
            name="title"
            label="Title"
            variant="standard"
            onChange={onInputChangeHandler}
            value={formData.title}
          />
          <TextField
            sx={{ m: 2 }}
            id="description"
            name="description"
            label="Description"
            variant="standard"
            onChange={onInputChangeHandler}
            value={formData.description}
          />
          <Box sx={{ m: 2 }}>
            <ReactTagInput
              tags={formData.hashtags}
              onChange={(newTags) => onTagChangeHandler(newTags)}
              placeholder={'[Tags] Type and press enter'}
            />
          </Box>
        </Box>
      </div>
      <Box sx={{ m: 2 }} className="files color">
        <input
          type="file"
          name="file"
          onChange={({
            target: {
              validity,
              files: [file],
            },
          }) => validity.valid && onFileChangeHandler(file)}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <Button sx={{ m: 2 }} variant="contained" onClick={submitForm}>
          Upload
        </Button>
      </Box>
    </Paper>
  );
};
