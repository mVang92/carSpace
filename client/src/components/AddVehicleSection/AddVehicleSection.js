import React, { Component } from "react";
import { defaults } from "../../assets/Defaults";
import AddVehicleErrorModal from "../Modal/AddVehicleErrorModal";

class AddVehicleSection extends Component {
  constructor() {
    super();
    this.state = {
      showAddVehicleErrorModal: false,
      defaultProfilePicture: defaults.defaultProfilePicture
    };
  };

  /**
   * Check if the user input value is blank
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Check if the vehicle inputs are blank
   */
  checkIfVehicleInputsAreBlank = e => {
    e.preventDefault();
    if (
      this.checkIfStringIsBlank(this.refs.year.value) ||
      this.checkIfStringIsBlank(this.refs.make.value) ||
      this.checkIfStringIsBlank(this.refs.model.value)
    ) {
      this.showAddVehicleErrorModal();
    } else {
      const vehiclePayload = {
        vehicleName: null,
        year: this.refs.year.value,
        make: this.refs.make.value,
        model: this.refs.model.value
      }
      this.props.checkIfVehicleYearIsValid(vehiclePayload);
    }
  };

  /**
   * Show the error modal while adding a vehicle
   */
  showAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: true });
  };

  /**
   * Hide the error modal while adding a vehicle
   */
  hideAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <form id="addVehicleInputForm" onSubmit={this.checkIfVehicleInputsAreBlank.bind(this)}>
          <div className="text-center row">
            {
              this.props.userProfilePicture ?
                (
                  <div className="col-md-6 wrapword">
                    <img id="mainPageProfilePicture" src={this.props.userProfilePicture} alt="You"/>
                    <label><strong><span id="displayName"></span></strong></label>
                  </div>
                ) :
                (
                  <div className="col-md-6 wrapword">
                    <img id="mainPageProfilePicture" src={this.state.defaultProfilePicture} alt="You"/>
                    <label><strong><span id="displayName"></span></strong></label>
                  </div>
                )
            }
            <div className="col-md-6"></div>
          </div>
          <hr className={this.props.currentTheme.hr}></hr>
          <div>
            <div className="row">
              <div className="col-md-12 smallBottomMargin text-center">
                <label><strong>Add a Vehicle</strong></label>
              </div>
            </div>
            <div className="row innerBox">
              <div className="col-md-3">
                <div>
                  <label><span className="required">*</span>Year</label>
                </div>
                <div>
                  <input
                    id="vehicleYearInput"
                    type="text"
                    ref="year"
                    value={this.props.year}
                    name="year"
                    maxLength="4"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label><span className="required">*</span>Make</label>
                </div>
                <div>
                  <input
                    id="vehicleMakeInput"
                    type="text"
                    ref="make"
                    value={this.props.make}
                    name="make"
                    maxLength="25"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label><span className="required">*</span>Model</label>
                </div>
                <div>
                  <input
                    id="vehicleModelInput"
                    type="text"
                    ref="model"
                    value={this.props.model}
                    name="model"
                    maxLength="25"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="col-md-12 text-center">
                  <button
                    id="addVehicleButton"
                    title="Add Vehicle"
                    type="submit"
                    className="addBtn"
                    disabled={this.props.disableAddVehicleButton}>
                    Add Vehicle
                  </button>
                </div>
                <br />
                <div className="col-md-12 text-center">
                  <button
                    id="resetVehicleInputFieldsButton"
                    title="Reset Input Fields"
                    type="reset"
                    className="resetButton"
                    onClick={this.props.handleResetAddVehicleFields}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <AddVehicleErrorModal
          showAddVehicleErrorModal={this.state.showAddVehicleErrorModal}
          hideAddVehicleErrorModal={this.hideAddVehicleErrorModal}
          currentTheme={this.props.currentTheme}
        />
      </React.Fragment>
    );
  };
};

export default AddVehicleSection;