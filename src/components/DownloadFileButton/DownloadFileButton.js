import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import classes from "./DownloadFileButton.module.scss";

import Button from "../Button/Button";

const DownloadFileButton = (props) => {
  let today = new Date();
  let date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  let time =
    today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  const dateTime = date + " - " + time;

  const fileName = `${"DQ-Adventure - " + dateTime + ".json"}`;
  const [fileDownloadUrl, setFileDownloadUrl] = useState(null);

  // prettier-ignore
  let doFileDownload = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //https://dev.to/carlosrafael22/using-refs-in-react-functional-components-part-1-useref-callback-ref-2j5i
    if (fileDownloadUrl !== null) {
      doFileDownload.click();
      URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
      setFileDownloadUrl(null);
    }
  }, [fileDownloadUrl, doFileDownload]);

  const downloadFileHandler = (event) => {
    event.preventDefault();
    // Prepare the file
    let output = JSON.stringify(
      [
        props.adventure,
        props.chapters,
        props.npcs,
        props.monsters,
        props.locations
      ],
      null,
      4
    );

    // Download it
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);

    setFileDownloadUrl(fileDownloadUrl);
  };
  // -----------------------

  return (
    <div className={classes.DownloadFileButton}>
      <Button
        clicked={downloadFileHandler}
        size="small"
        priority="primary"
        iconPlacement="left"
      >
        <i className="far fa-save"></i>Download data
      </Button>
      <a
        className={classes.Hidden}
        download={fileName}
        href={fileDownloadUrl}
        ref={(node) => (doFileDownload = node)}
      >
        download it
      </a>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adventure: state.contentData.adventure,
    chapters: state.contentData.chapters,
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations
  };
};

export default connect(mapStateToProps)(DownloadFileButton);
