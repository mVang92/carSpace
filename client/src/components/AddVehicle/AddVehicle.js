import React, { Component } from "react";

class AddVehicle extends Component {
  constructor() {
    super();
    this.state = {
      newVehicle: {}
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.refs.year.value === "" || this.refs.make.value === "" || this.refs.model.value === "") {
      alert("Please fill in all of the neccessary fields.");
    } else {
      this.setState({
        newVehicle: {
          year: this.refs.year.value,
          make: this.refs.make.value,
          model: this.refs.model.value
        }
      }, function () {
        console.log(this.state);
        // IMPORTANT: This allows this component to pass states up to App.js
        // States pass through LoggedIn component first, then to App.js
        this.props.addVehicle(this.state.newVehicle);
      });
      document.getElementById("field").reset();
    };
  };

  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <p>Hello <span id="userEmail"></span>!</p>
          <hr></hr>
        </div>
        <form id="field">
          <div className="row">
            <div className="col-md-3">
              Add a Vehicle
          </div>
            <div className="col-md-3">
              <div>
                <label><span className="required">*</span>Year</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="year"
                  onChange={this.props.handleChange}
                  value={this.props.year}
                  name="year"
                  placeholder="2010" />
              </div>
            </div>
            <div className="col-md-3" required>
              <div>
                <label><span className="required">*</span>Make</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="make"
                  onChange={this.props.handleChange}
                  value={this.props.make}
                  name="make"
                  placeholder="Lexus" />
              </div>
            </div>
            <div className="col-md-3" required>
              <div>
                <label><span className="required">*</span>Model</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="model"
                  onChange={this.props.handleChange}
                  value={this.props.model}
                  name="model"
                  placeholder="RX 350" />
              </div>
            </div>
          </div>
        </form>
        <br />
        {/* Form and Buttons*/}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col-md-9">
            </div>
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-6">
                  <button type="submit" className="btn-success">Add</button>
                </div>
                <div className="col-md-6">
                  <button type="button" onClick={this.props.handleReset} className="btn-danger">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  };
};
export default AddVehicle;
