const estimator = {
  currentlyInfected: (reportedCases, number) => reportedCases * number,
  infectionsByRequstedTime: (reportedCases, number, timeToElapse, periodType) => {
    let power;
    let answer;
    if (periodType === 'months') {
      power = 2 ** Math.floor((timeToElapse * 30) / 3);
      answer = estimator.currentlyInfected(reportedCases, number) * power;
    }
    if (periodType === 'weeks') {
      power = 2 ** Math.floor((timeToElapse * 7) / 3);
      answer = estimator.currentlyInfected(reportedCases, number) * power;
    }
    if (periodType === 'days') {
      power = 2 ** Math.floor(timeToElapse / 3);
      answer = estimator.currentlyInfected(reportedCases, number) * power;
    }
    return answer;
  },
  severeCasesByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const tim = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return tim * (15 / 100);
  },
  hospitalBedsByRequestedTime: (reportedCases,
    number, timeToElapse, periodType, totalHospitalBeds) => {
    let an;
    const TP = totalHospitalBeds * (35 / 100);
    const tim = estimator.severeCasesByRequestedTime(reportedCases, number, timeToElapse,
      periodType);
    const answer = TP - tim;
    if (answer < 0) {
      an = -Math.floor(Math.abs(answer));
    } if (answer > 0) {
      an = answer;
    }
    return an;
  },

  casesForICUByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const iB = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return Math.floor(iB * (5 / 100));
  },
  casesForVentilatorsByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const iBR = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return Math.floor(iBR * (2 / 100));
  },
  dollarInFlight: (avgDailyIncomeInUSD, reportedCases, number, timeToElapse, periodType) => {
    const iBR = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    const dIF = (iBR * avgDailyIncomeInUSD * 0.73) / 30;
    return Math.floor(dIF);
  },

};

const covid19ImpactEstimator = (inputs) => {
  const input = {
    region: {
      name: inputs.name,
      avgAge: inputs.avgAge,
      avgDailyIncomeInUSD: inputs.avgDailyIncomeInUSD,
      avgDailyIncomepopulation: inputs.avgDailyIncomepopulation,
    },
    periodType: inputs.periodType,
    timeToElapse: inputs.timeToElapse,
    reportedCases: inputs.reportedCases,
    population: inputs.population,
    totalHospitalBeds: inputs.totalHospitalBeds,
  };

  const estimates = {
    input,
    impact: {
      // challenge one
      currentlyInfected: estimator.currentlyInfected(input.reportedCases, 10),
      infectionsByRequstedTime: estimator.infectionsByRequstedTime(input.reportedCases,
        10, input.timeToElapse, input.periodType),
      // challenge two
      severalCasesByRequestedTime: estimator.severeCasesByRequestedTime(input.reportedCases,
        10, input.timeToElapse, input.periodType),
      hospitalBedsByRequestedTime: estimator.hospitalBedsByRequestedTime(input.reportedCases,
        10, input.timeToElapse, input.periodType, input.totalHospitalBeds),
      // challenge three
      casesForICUByRequestedTime: estimator.casesForICUByRequestedTime(input.reportedCases,
        10, input.timeToElapse, input.periodType),
      casesForVentilatorsByRequestedTime:
          estimator.casesForVentilatorsByRequestedTime(input.reportedCases,
            10, input.timeToElapse, input.periodType),
      dollarInFlight: estimator.dollarInFlight(input.region.avgDailyIncomeInUSD,
        input.reportedCases, 10, input.timeToElapse, input.periodType),

    },
    severeImpact: {
      // challenge one
      currentlyInfected: estimator.currentlyInfected(input.reportedCases, 50),
      infectionsByRequstedTime: estimator.infectionsByRequstedTime(input.reportedCases,
        50, input.timeToElapse, input.periodType),
      // challenge two
      severeCasesByRequestedTime: estimator.severeCasesByRequestedTime(input.reportedCases,
        50, input.timeToElapse, input.periodType),
      hospitalBedsByRequestedTime: estimator.hospitalBedsByRequestedTime(input.reportedCases,
        50, input.timeToElapse, input.periodType, input.totalHospitalBeds),
      // challenge three
      casesForICUByRequestedTime: estimator.casesForICUByRequestedTime(input.reportedCases,
        50, input.timeToElapse, input.periodType),


      casesForVentilatorsByRequestedTime:
         estimator.casesForVentilatorsByRequestedTime(input.reportedCases,
           50, input.timeToElapse, input.periodType),
      dollarInFlight: estimator.dollarInFlight(input.region.avgDailyIncomeInUSD,
        input.reportedCases, 50, input.timeToElapse, input.periodType),
    },
  };
  return estimates;
};

module.exports = covid19ImpactEstimator;
