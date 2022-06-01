import React, { useRef } from "react";
import { connect } from "react-redux";

import classes from "./UploadFileInput.module.scss";

import Button from "../Button/Button";

import * as actions from "../../store/actions/actionsIndex";

const UploadFileInput = (props) => {
  // prettier-ignore
  let doFileUpload = useRef<HTMLInputElement>(null);

  const uploadfilehandler = (event) => {
    event.preventDefault();
    doFileUpload.click();
  };

  /**
   * Process the file within the React app. We're NOT uploading it to the server!
   */
  const openFile = (evt) => {
    const fileObj = evt.target.files[0]; // We've not allowed multiple files.
    // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader();

    // Defining the function here gives it access to the fileObj constant.
    let fileloaded = (e) => {
      // e.target.result is the file's content as text
      // Don't trust the fileContents!
      // Test any assumptions about its contents!
      const fileContents = e.target.result;
      const newContentData = JSON.parse(fileContents);
      props.overwriteContentHandler(newContentData);
    };

    // Mainline of the method
    fileloaded = fileloaded.bind(this);
    // The fileloaded event handler is triggered when the read completes
    reader.onload = fileloaded;
    reader.readAsText(fileObj); // read the file
  };

  return (
    <div className={classes.UploadFileInput}>
      <p>
        <Button
          clicked={uploadfilehandler}
          size="small"
          priority="secondary"
          iconPlacement="left"
        >
          Upload a JSON file
        </Button>
      </p>

      <input
        type="file"
        className={classes.Hidden}
        multiple={false}
        accept=".json,application/json"
        onChange={(evt) => openFile(evt)}
        ref={(node) => (doFileUpload = node)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    overwriteContentHandler: (newData) =>
      dispatch(actions.overwriteContent(newData))
  };
};

export default connect(null, mapDispatchToProps)(UploadFileInput);
