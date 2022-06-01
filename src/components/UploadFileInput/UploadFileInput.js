import React, { useState, useRef } from "react";

import classes from "./UploadFileInput.module.scss";

import Button from "../Button/Button";

const UploadFileInput = (props) => {
  const [status, setStatus] = useState("");

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
    let status = []; // Status output
    const fileObj = evt.target.files[0]; // We've not allowed multiple files.
    // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader();

    // Defining the function here gives it access to the fileObj constant.
    let fileloaded = (e) => {
      // e.target.result is the file's content as text
      // Don't trust the fileContents!
      // Test any assumptions about its contents!
      const fileContents = e.target.result;
      status.push(
        `File name: "${fileObj.name}". ` +
          `Length: ${fileContents.length} bytes.`
      );
      // Show first 80 characters of the file
      const first80char = fileContents.substring(0, 80);
      status.push(`First 80 characters of the file:\n${first80char}`);
      // Show the status messages
      setStatus(status.join("\n"));
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

      <pre className="status">{status}</pre>
    </div>
  );
};

export default UploadFileInput;
