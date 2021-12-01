import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Paper, TextField, Box, Button, Alert } from "@mui/material";

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

  const [feedback, setFeedback] = useState();

  const [uploadEnabled, setUploadEnabled] = useState(false);

  useEffect(() => {
    if (
      formData.title.length > 0 &&
      formData.description.length > 0 &&
      formData.file?.name?.length > 0
    ) {
      if (!uploadEnabled) setUploadEnabled(true);
    } else {
      if (uploadEnabled) setUploadEnabled(false);
    }
  }, [formData]);

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
      console.log(error);
      setFeedback({ severity: "error", message: "Something went wrong" });
    }

    // send user to their photo
    window.location.assign('/singlephoto/' + response.data.addPhoto._id);
  };

  return (
    <Paper sx={{ marginTop: 2 }}>
      <div style={{ width: "100%" }}>
        <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
          {feedback && (
            <Alert severity={feedback.severity}>{feedback.message}</Alert>
          )}
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
              placeholder={"[Tags] Type and press enter"}
            />
          </Box>
        </Box>
      </div>
      <Box sx={{ m: 2 }} className="files color">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={({
            target: {
              validity,
              files: [file],
            },
          }) => validity.valid && onFileChangeHandler(file)}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={submitForm}
          disabled={!uploadEnabled}
        >
          Upload
        </Button>
      </Box>
    </Paper>
  );
};
