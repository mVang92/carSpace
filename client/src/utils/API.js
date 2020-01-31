import axios from "axios";

export default {
  // Get one vehicle for the signed in user
  getOneVehicleForUser: (creatorId, vehicleId) => {
    return axios.get(`/api/vehicles/findOneVehicleForUser/${creatorId}/${vehicleId}`)
  },
  // Get all vehicles for the signed in user
  getAllVehiclesForUser: id => {
    return axios.get(`/api/vehicles/${id}`)
  },
  // Upon signing up for new account, create this data for the new user
  createUserSchema: id => {
    return (
      axios.post("/api/vehicles", {
        creator: id,
        admin: false,
        vehicleName: [{}]
      })
    );
  },
  // Add a new vehicle
  addOneVehicle: (id, data) => {
    return axios.put(`/api/vehicles/${id}`, data);
  },
  // Add a service log for one vehicle
  addOneLogForOneVehicle: (creatorId, vehicleId, log) => {
    return axios.put(`/api/vehicles/addOneServiceLog/${creatorId}/${vehicleId}`, log);
  },
  // Update a the name for one vehicle
  updateVehicleNameForOneVehicle: (vehicleId, updatedVehicleName) => {
    return axios.put(`/api/vehicles/updateOneVehicleName/${vehicleId}`, updatedVehicleName);
  },
  // Update a service log for one vehicle
  updateOneLogForOneVehicle: (vehicleId, serviceLogId, updatedServiceLog) => {
    return axios.put(`/api/vehicles/updateOneServiceLog/${vehicleId}/${serviceLogId}`, updatedServiceLog);
  },
  // Delete one vehicle
  deleteOneVehicle: vehicleId => {
    return axios.delete(`/api/vehicles/deleteVehicle/${vehicleId}`);
  },
  // Delete one service log
  deleteOneServiceLog: (vehicleId, serviceLogId) => {
    return axios.delete(`/api/vehicles/deleteServiceLog/${vehicleId}/${serviceLogId}`);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: id => {
    return axios.delete(`/api/vehicles/${id}`);
  }
};
