import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import AddLog from "../../components/AddLog";
import DeleteOneVehicleModal from "../../components/Modal/DeleteOneVehicleModal";
import AddLogErrorModal from "../../components/Modal/AddLogErrorModal"
import MileageInputErrorModal from "../../components/Modal/MileageInputErrorModal"
import Modal from "react-modal";

class Log extends Component {
  state = {
    vehicle: [],
    vehicleId: "",
    make: "",
    model: "",
    date: "",
    mileage: "",
    service: "",
    comment: "",
    logArray: [],
    showDeleteOneVehicleModal: false,
    showAddLogErrorModal: false,
    showMileageInputErrorModal: false
  };

  // When this component mounts, grab the vehicle with the _id of this.props.match.params.id
  // e.g. localhost:3000/vehicle/599dcb67f0f16317844583fc
  componentWillMount = () => {
    Modal.setAppElement("body");
    this.setState({
      vehicleId: this.props.match.params.id
    });
    API.getOneVehicleForUser(this.props.match.params.id)
      .then(res => {
        //console.log(res.data)
        this.setState({
          vehicle: res.data,
          // vehicleId: res.data.creator,
          // logArray: res.data.logs
        })
        // .catch(err => console.log(err))
      });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(name, value);
  };

  handleSubmitOneServiceLog = e => {
    e.preventDefault();
    if (isNaN(this.state.mileage)) {
      this.showMileageInputErrorModal();
    } else {
      if (this.state.date === "" || this.state.mileage === "" || this.state.service === "") {
        this.showAddLogErrorModal();
      } else {
        console.log("date: " + this.state.date)
        console.log("mileage: " + this.state.mileage)
        console.log("service: " + this.state.service)
        console.log("comment: " + this.state.comment)
        let id = this.state.vehicleId;
        let log = {
          date: this.state.date,
          mileage: this.state.mileage,
          service: this.state.service,
          comment: this.state.comment
        };
        console.log("id: " + id)
        console.log(log)
        API.addOneLogForOneVehicle(id, log)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err));
        this.setState({
          date: "",
          mileage: "",
          service: "",
          comment: ""
        });
      };
    };
  };

  handleResetLogVehicleForm = () => {
    this.setState({
      date: "",
      mileage: "",
      service: "",
      comment: ""
    });
  };

  handleDeleteOneVehicle = () => {
    API.deleteOneVehicle(this.state.vehicleId)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
  };

  showDeleteOneVehicleModal = () => {
    this.setState({ showDeleteOneVehicleModal: true });
  };

  showAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: true });
  };

  showMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: true });
  };

  hideDeleteOneVehicleModal = () => {
    this.setState({ showDeleteOneVehicleModal: false });
  };

  hideAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: false });
  };

  hideMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: false });
  };

  render() {
    return (
      <Container>
        <div className="box">
          <div className="row">
            <div className="col-md-12 text-center">
              {/* <label>Viewing logs for your {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}</label> */}
            </div>
          </div>
          <hr />
          <div className="row innerBox">
            <div className="col-md-3">
              <label><strong>Date</strong></label>
              {/* {this.state.logArray.map(({ date }) => {
                return (
                  <div>
                    <div>{date}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Mileage</strong></label>
              {/* {this.state.logArray.map(({ mileage }) => {
                return (
                  <div>
                    <div>{mileage}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Service</strong></label>
              {/* {this.state.logArray.map(({ service }) => {
                return (
                  <div>
                    <div>{service}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Comments</strong></label>
              {/* {this.state.logArray.map(({ comment }) => {
                return (
                  <div>
                    <div>{comment}</div>
                  </div>
                );
              })} */}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><strong>Enter new service log</strong></label>
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
        </div>
        <DeleteOneVehicleModal
          handleDeleteOneVehicle={this.handleDeleteOneVehicle}
          showDeleteOneVehicleModal={this.state.showDeleteOneVehicleModal}
          hideDeleteOneVehicleModal={this.hideDeleteOneVehicleModal}
          state={this.state}
        />
        <AddLogErrorModal
          handleDeleteOneVehicle={this.handleDeleteOneVehicle}
          showAddLogErrorModal={this.state.showAddLogErrorModal}
          hideAddLogErrorModal={this.hideAddLogErrorModal}
          state={this.state}
        />
        <MileageInputErrorModal
          showMileageInputErrorModal={this.state.showMileageInputErrorModal}
          hideMileageInputErrorModal={this.hideMileageInputErrorModal}
          state={this.state}
        />
      </Container>
    );
  };
};

export default Log;
