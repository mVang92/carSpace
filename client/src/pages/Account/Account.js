import React, { Component } from "react";
import Modal from "react-modal";
import Container from "../../components/Container";
import { firebase } from "../../firebase";
import API from "../../utils/API";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      user: "",
      userEmail: "",
      userId: "",
      userDisplayName: "",
      newDisplayName: "",
      newPassword: "",
      confirmNewPassword: "",
      vehicleData: "",
      vehicleCount: "Loading...",
      loadingError: "",
      userAccountCreationTime: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true
    };
  };

  /**
   * Grab the passed in states and set them to state, then get vehicle data
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loggedin: true
        })
        this.setState({
          userEmail: this.props.location.state[0],
          userAccountCreationTime: this.props.location.state[1],
          userDisplayName: this.props.location.state[2],
          userId: this.props.match.params.id
        });
        this.getVehicleData();
      };
    })
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Get the vehicle data from the API
   */
  getVehicleData = () => {
    if (this.state.userId) {
      API.getAllVehiclesForUser(this.state.userId)
        .then(res =>
          this.setState({ vehicleCount: res.data.vehicles.length })
        )
        .catch(err =>
          this.setState({ loadingError: err },
            this.loadVehiclesFailNotification(err)));
    } else (
      setTimeout(() => {
        this.getVehicleData();
      }, 10)
    );
  };

  /**
   * UYpdate the display name for the user
   */
  updateDisplayName = e => {
    e.preventDefault();
    if (this.state.loggedin) {
      this.state.user.updateProfile({
        displayName: this.state.newDisplayName
      }).then(() => {
        if (this.state.newDisplayName !== "") {
          this.updateDisplayNameWithNameSuccessNotification(this.state.newDisplayName);
        } else {
          this.updateDisplayNameWithNoNameSuccessNotification();
        }

        this.setState({ newDisplayName: "" })
      }).catch(error => {
        this.updateDisplayNameErrorNotification(error);
      });
    };
  };

  /**
   * Update the password to the user
   */
  updatePassword = e => {
    e.preventDefault();
    if (this.state.loggedin) {
      if (this.state.newPassword === this.state.confirmNewPassword) {
        this.state.user.updatePassword(this.state.confirmNewPassword)
          .then(() => {
            this.updatePasswordSuccessNotification();
            this.setState({
              newPassword: "",
              confirmNewPassword: ""
            })
          }).catch(error => {
            this.updatePasswordErrorNotification(error);
            this.setState({
              newPassword: "",
              confirmNewPassword: ""
            });
          });
      } else {
        this.setState({
          newPassword: "",
          confirmNewPassword: ""
        });
        this.passwordsDoNotMatchErrorNotification();
      };
    };
  };

  /**
   * Set the state of the unique id to true
   */
  showUniqueUserId = () => {
    this.setState({
      showUniqueUserId: true,
      showMaskUniqueUserId: false
    });
  };

  /**
   * Set the state of the unique id to false
   */
  hideUniqueUserId = () => {
    this.setState({
      showUniqueUserId: false,
      showMaskUniqueUserId: true
    });
  };

  /**
   * Display the success notification when the password is updated successfully
   */
  updatePasswordSuccessNotification = () => {
    toast.success(`Password Updated Successfully.`);
  };

  /**
   * Display the success notification when the display name is updated successfully
   */
  updateDisplayNameWithNameSuccessNotification = updateDisplayName => {
    toast.success(`Display name updated to ${updateDisplayName}. Please redirect to this page to take effect.`);
  };

  /**
   * Display the error notification when the new password and confirm passwords do not match
   */
  passwordsDoNotMatchErrorNotification = () => {
    toast.warn(`Passwords do not match. Try again.`);
  };

  /**
   * Display the error notification when an error occurs while loading vehicles
   * 
   * @param err the error message to display to the user
   */
  loadVehiclesFailNotification = err => {
    toast.error(`Loading Vehicles ${err.toString()}`);
  };

  /**
   * Display the error notification when an error occurs while updating password
   * 
   * @param err the error message to display to the user
   */
  updatePasswordErrorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the success notification when the display name is updated successfully to no value
   */
  updateDisplayNameWithNoNameSuccessNotification = () => {
    toast.success(`Display name updated. Please redirect to this page to take effect.`);
  };

  /**
   * Display the error notification when an error occurs while updating password
   * 
   * @param err the error message to display to the user
   */
  updateDisplayNameErrorNotification = err => {
    toast.error(err.toString());
  };

  render() {
    let uniqueUserId = this.state.showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
    let uniqueUserIdMask = this.state.showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";
    return (
      <Container>
        {
          this.state.loggedin ? (
            <div id="accountPage" className="mt-3 box">
              <div className="row">
                <div className="col-md-12 text-center"><label><strong>My Account</strong></label></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-4"><label><strong>Email:</strong></label></div>
                <div className="col-md-4">{this.state.userEmail}</div>
                <div className="col-md-4"></div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4"><label><strong>Display Name:</strong></label></div>
                <div className="col-md-4">{this.state.userDisplayName}</div>
                <div className="col-md-4"></div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4"><label><strong>Unique User Id:</strong></label></div>
                <div className="col-md-4">
                  <span id={uniqueUserIdMask}>*****************************************</span>
                  <span id={uniqueUserId}>{this.state.userId}</span>
                </div>
                <div className="col-md-4">
                  {
                    this.state.showUniqueUserId ? (
                      <button
                        id="hideUniqueIdButton"
                        title="Hide Unique Id"
                        type="button"
                        className="cancelBtn"
                        onClick={this.hideUniqueUserId}
                      >
                        Hide
                  </button>
                    ) : (
                        <button
                          id="showUniqueIdButton"
                          title="Show Unique Id"
                          type="button"
                          className="cancelBtn"
                          onClick={this.showUniqueUserId}
                        >
                          Show
                    </button>
                      )
                  }
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4"><label><strong>Vehicles On Record:</strong></label></div>
                <div className="col-md-4">
                  {
                    this.state.loadingError ? (
                      <span className="text-danger">Error Loading Vehicle Count</span>
                    ) : (
                        <span>{this.state.vehicleCount}</span>
                      )
                  }
                </div>
                <div className="col-md-4"></div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4"><label><strong>Account Creation Date:</strong></label></div>
                <div className="col-md-4">{this.state.userAccountCreationTime}</div>
                <div className="col-md-4"></div>
              </div>
              <hr />
              <form onSubmit={this.updateDisplayName}>
                <div className="row">
                  <div className="col-md-4"><label><strong>Update Display Name:</strong></label></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          ref="newDisplayName"
                          onChange={this.handleChange}
                          value={this.state.newDisplayName}
                          name="newDisplayName"
                          maxLength="50"
                        />
                      </div>
                    </div>
                  </div>
                  <br /><br />
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          id="submitNewDisplayNameButton"
                          type="submit"
                          onClick={this.updateDisplayName}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <br />
              <form onSubmit={this.updatePassword}>
                <div className="row">
                  <div className="col-md-4"><label><strong>Update Password:</strong></label></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="password"
                          ref="newPassword"
                          onChange={this.handleChange}
                          value={this.state.newPassword}
                          name="newPassword"
                          maxLength="50"
                          placeholder="New Password"
                        />
                      </div>
                      <br /><br />
                      <div className="col-md-12">
                        <input
                          type="password"
                          ref="confirmNewPassword"
                          onChange={this.handleChange}
                          value={this.state.confirmNewPassword}
                          name="confirmNewPassword"
                          maxLength="50"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12"></div>
                      <br /><br />
                      <div className="col-md-12">
                        <button
                          id="submitNewPasswordButton"
                          type="submit"
                          onClick={this.updatePassword}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <hr />
              <a href="/"><button className="backHomeBtn">Back Home</button></a>
              <br />
            </div>
          ) : (
              <div className="text-danger text-center">
                <br /><br />
                <label><h4>You do not have permission to view this page.</h4></label>
              </div>
            )
        }

        <ToastContainer />
      </Container>
    );
  };
};
