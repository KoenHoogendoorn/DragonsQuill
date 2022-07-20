import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./AdventureNameEditModal.module.scss";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import CardItemEditorWarning from "../CardItem/CardItemEditor/CardItemEditorWarning/CardItemEditorWarning";
import Inputbar from "../Inputbar/Inputbar";

import * as actions from "../../store/actions/actionsIndex";

const AdventureNameEditModal = (props) => {
  const [adventureNameState, setAdventureNameState] = useState("");
  const [cardItemEditorWarning, setCardItemEditorWarning] = useState(false);

  useEffect(() => {
    setAdventureNameState(props.adventure[0].value);
  }, [props.adventure]);

  const closeAdventureNameModalHandler = () => {
    setCardItemEditorWarning(false);
    props.setOpenAdventureNameModal(false);
  };

  const saveAdventureNameHandler = (e) => {
    const value = adventureNameState;

    if (value.trim() === "") {
      // create error that input can't be empty when savedd
      setCardItemEditorWarning(true);
      return;
    }

    //remove old copied item (currently there is only one id)
    props.removeCardHandler("ad0");
    props.addCardHandler({
      id: "ad0",
      value: value
    });
    closeAdventureNameModalHandler();
    //custom functions if passed on through props
    if (props.addToSaveHandler) {
      props.addToSaveHandler();
    }
  };
  let modalTitle = props.modalTitle ? props.modalTitle : "Edit adventure name";

  return (
    <Modal
      show={props.openAdventureNameModal}
      modalClosed={() => closeAdventureNameModalHandler()}
    >
      <div className={classes.editAdventureNameModalContent}>
        <h4>{modalTitle}</h4>
        <Inputbar
          id="adventureName"
          type="text"
          val={adventureNameState}
          changed={(e) => setAdventureNameState(e.target.value)}
        />

        <div className={classes.DeleteItemModalButtons}>
          <Button
            size="medium"
            priority="secondary"
            iconPlacement="left"
            clicked={() => closeAdventureNameModalHandler()}
          >
            <i className="fas fa-ban"></i>
            Cancel
          </Button>
          <Button
            size="medium"
            priority="primary"
            iconPlacement="left"
            clicked={() => saveAdventureNameHandler()}
          >
            <i className="far fa-trash-alt"></i>
            Save
          </Button>
        </div>
        {cardItemEditorWarning ? (
          <CardItemEditorWarning adventureName={true} />
        ) : null}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    adventure: state.contentData.adventure
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCardHandler: (id) => dispatch(actions.removeCard(id)),
    addCardHandler: (itemData) => dispatch(actions.addCard(itemData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdventureNameEditModal);
