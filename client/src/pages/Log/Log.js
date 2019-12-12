import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import AddLog from "../../components/AddLog";
import DeleteOneVehicleModal from "../../components/Modal/DeleteOneVehicleModal";
import AddLogErrorModal from "../../components/Modal/AddLogErrorModal"
import MileageInputErrorModal from "../../components/Modal/MileageInputErrorModal"
import Modal from "react-modal";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: true,
      vehicle: [],
      vehicleId: "",
      make: "",
      model: "",
      date: "",
      mileage: "",
      service: "",
      comment: "",
      vehicleServiceLogs: [],
      showDeleteOneVehicleModal: false,
      showAddLogErrorModal: false,
      showMileageInputErrorModal: false,
    };
  }

  /**
   * Display the service log information for the selected vehicle
   */
  componentWillMount = () => {
    Modal.setAppElement("body");
    this.setState({ vehicleId: this.props.match.params.id });
    this.getOneVehicle();
  };

  /**
   * Get the vehicle information for the selected vehicle
   */
  getOneVehicle = () => {
    API.getOneVehicleForUser(this.props.match.params.id)
      .then(res => {
        this.setState({
          year: res.data[0].vehicles[0].year,
          make: res.data[0].vehicles[0].make,
          model: res.data[0].vehicles[0].model,
          vehicleServiceLogs: res.data[0].vehicles[0].logs
        });
      })
      .catch(err => this.loadServiceLogsFailNotification(err));
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Records a service log for the vehicle
   */
  handleSubmitOneServiceLog = e => {
    e.preventDefault();
    if (isNaN(this.state.mileage)) {
      this.showMileageInputErrorModal();
    } else {
      if (this.state.date === "" || this.state.mileage === "" || this.state.service === "") {
        this.showAddLogErrorModal();
      } else {
        let id = this.state.vehicleId;
        let log = {
          date: this.state.date,
          mileage: this.state.mileage,
          service: this.state.service,
          comment: this.state.comment
        };
        let dateMemory = this.state.date;
        let mileageMemory = this.state.mileage;
        let serviceMemory = this.state.service;
        API.addOneLogForOneVehicle(id, log)
          .then(() => {
            this.addOneServiceLogSuccessNotification(dateMemory, mileageMemory, serviceMemory)
            this.componentWillMount();
          })
          .catch(err => this.addOneServiceLogFailNotification(err));
        this.setState({
          date: "",
          mileage: "",
          service: "",
          comment: ""
        });
      };
    };
  };

  /**
   * Reset the date, mileage, service, and comment input boxes to empty
   */
  handleResetLogVehicleForm = () => {
    this.setState({
      date: "",
      mileage: "",
      service: "",
      comment: ""
    });
    this.resetFieldsNotification();
  };

  /**
   * Deletes one vehicle from record
   */
  handleDeleteOneVehicle = () => {
    API.deleteOneVehicle(this.state.vehicleId)
      .then(() => this.deleteOneVehicleSuccessNotification())
      .catch(err => this.deleteOneVehicleFailNotification(err));
  };

  /**
   * Display the success notification when the user adds a service log
   * 
   * @param date    the date when the service is logged
   * @param mileage the current mileage of the vehicle
   * @param service the service done to the vehicle
   */
  addOneServiceLogSuccessNotification = (date, mileage, service) => {
    toast.success(`Service Logged: ${service} at ${mileage} miles on ${date}.`);
  };

  /**
   * Display the error notification when an error occurs while adding a service log
   * 
   * @param err the error message to display to the user
   */
  addOneServiceLogFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the success notification when the user deletes a vehicle
   */
  deleteOneVehicleSuccessNotification = () => {
    toast.success(`Vehicle Deleted Successfully`);
  };

  /**
   * Display the error notification when an error occurs while deleting a vehicle
   * 
   * @param err the error message to display to the user
   */
  deleteOneVehicleFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the info notification when the user resets the fields to add a service log
   */
  resetFieldsNotification = () => {
    toast.info(`Input Fields Reset`);
  };

  /**
   * Display the error notification when an error occurs while loading service logs
   * 
   * @param err the error message to display to the user
   */
  loadServiceLogsFailNotification = err => {
    toast.error(`Loading Service Log ${err.toString()}`);
  };

  /**
   * Display the modal to notify the user the vehicle has been deleted successfully
   */
  showDeleteOneVehicleModal = () => {
    this.setState({ showDeleteOneVehicleModal: true });
  };

  /**
   * Display the modal to notify the user about bad input while adding a service log
   */
  showAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: true });
  };

  /**
   * Display the modal to notify the user about bad input to the mileage input field
   */
  showMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: true });
  };

  /**
   * Hide the successfully deleted one vehicle modal
   */
  hideDeleteOneVehicleModal = () => {
    this.setState({ showDeleteOneVehicleModal: false });
  };

  /**
   * Hide the successfully added one service log modal
   */
  hideAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: false });
  };

  /**
   * Hide the bad mileage input modal
   */
  hideMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loggedin === true ? (
          <div>
            <Container>
              <div className="box">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <label><h4>{this.state.year} {this.state.make} {this.state.model}</h4></label>
                  </div>
                </div>
                <div className="innerBox">
                  <AddLog
                    date={this.state.date}
                    mileage={this.state.mileage}
                    service={this.state.service}
                    comment={this.state.comment}
                    handleChange={this.handleChange}
                    handleResetLogVehicleForm={this.handleResetLogVehicleForm}
                    handleSubmitOneServiceLog={this.handleSubmitOneServiceLog}
                    showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                  />
                </div>
                <div className="row innerBox">
                  {this.state.vehicleServiceLogs.length === 0 ?
                    (<label className="text-danger"><strong>No Service Logs on Record</strong></label>) : (
                      <React.Fragment>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-3">
                              <label>
                                <strong>Date</strong>
                              </label>
                            </div>
                            <div className="col-md-3">
                              <label>
                                <strong>Mileage</strong>
                              </label>
                            </div>
                            <div className="col-md-3">
                              <label>
                                <strong>Service</strong>
                              </label>
                            </div>
                            <div className="col-md-3">
                              <label>
                                <strong>Comments</strong>
                              </label>
                            </div>
                          </div>
                          {this.state.vehicleServiceLogs.map(({ _id, date, mileage, service, comment }) => {
                            return (
                              <React.Fragment key={_id}>
                                <hr />
                                <div className="row">
                                  <div className="col-md-3 scrollable">{date}</div>
                                  <div className="col-md-3 scrollable">{mileage} miles</div>
                                  <div className="col-md-3 scrollable">{service}</div>
                                  <div className="col-md-3 scrollable">{comment}</div>
                                </div>
                              </React.Fragment>
                            )
                          })
                          }
                        </div>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
              <DeleteOneVehicleModal
                handleDeleteOneVehicle={this.handleDeleteOneVehicle}
                showDeleteOneVehicleModal={this.state.showDeleteOneVehicleModal}
                hideDeleteOneVehicleModal={this.hideDeleteOneVehicleModal}
                state={this.state}
              />
              <AddLogErrorModal
                showAddLogErrorModal={this.state.showAddLogErrorModal}
                hideAddLogErrorModal={this.hideAddLogErrorModal}
                state={this.state}
              />
              <MileageInputErrorModal
                showMileageInputErrorModal={this.state.showMileageInputErrorModal}
                hideMileageInputErrorModal={this.hideMileageInputErrorModal}
                state={this.state}
              />
              <ToastContainer />
            </Container>
          </div>
        ) : (
            <div>
              <div className="text-center text-danger">
                <strong>You are not authorized to view this page.</strong>
              </div>
            </div>
          )
        }
      </React.Fragment>
    );
  };
};
