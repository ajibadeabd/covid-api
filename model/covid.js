const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  data: {
   region:{
    name: String,
    avgAge: Number,
    avgDailyIncomeInUSD: Number,
    avgDailyIncomePopulation: Number
   },

   periodType:String,
   timeToElapse: Number,
   reportedCases: Number,
   population: Number,
   totalHospitalBeds: Number
  },
  impact: {
    currentlyInfected: Number,
    infectionsByRequestedTime: Number,
    severeCasesByRequestedTime: Number,
    hospitalBedsByRequestedTime: Number,
    casesForICUByRequestedTime: Number,
    casesForVentilatorsByRequestedTime: Number,
    dollarsInFlight: Number,
  },
  severeImpact: {
    currentlyInfected: Number,
    infectionsByRequestedTime: Number,
    severeCasesByRequestedTime: Number,
    hospitalBedsByRequestedTime: Number,
    casesForICUByRequestedTime: Number,
    casesForVentilatorsByRequestedTime: Number,
    dollarsInFlight: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('users', userSchema);
