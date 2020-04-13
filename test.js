const estimator = {
  currentlyInfected: (reportedCases, number, periodType) => {
    let cas;
    if (periodType === 'months') {
      cas = reportedCases * number * 30;
    }
    if (periodType === 'days') {
      cas = reportedCases * number;
    }
    if (periodType === 'weeks') {
      cas = reportedCases * number * 7;
    }
    return cas;
  },
  infectionsByRequstedTime: (reportedCases, number, timeToElapse, periodType) => {
    let power;
    let answer;
    if (periodType === 'months') {
      power = 2 ** Math.floor((timeToElapse * 30) / 3);
      answer = estimator.currentlyInfected(reportedCases, number, periodType) * power;
    }
    if (periodType === 'weeks') {
      power = 2 ** Math.floor((timeToElapse * 7) / 3);
      answer = estimator.currentlyInfected(reportedCases, number, periodType) * power;
    }
    if (periodType === 'days') {
      power = 2 ** Math.floor(timeToElapse / 3);
      answer = estimator.currentlyInfected(reportedCases, number, periodType) * power;
    }
    return answer;
  },
  severeCasesByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const tim = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return tim * (15 / 100);
  },
  hospitalBedsByRequestedTime: (reportedCases,
    number, timeToElapse, periodType, totalHospitalBeds) => {
    let final;
    const TP = totalHospitalBeds * (35 / 100);
    const tim = estimator.severeCasesByRequestedTime(reportedCases, number, timeToElapse,
      periodType);
    const answer = TP - tim;
    if (answer < 0) {
      final = -Math.floor(Math.abs(answer));
    } if (answer > 0) {
      final = answer;
    }
    return final;
  },

  casesForICUByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const iB = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return Math.floor(iB * (5 / 100));
  },
  casesForVentilatorsByRequestedTime: (reportedCases, number, timeToElapse, periodType) => {
    const iBR = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse, periodType);
    return Math.floor(iBR * (2 / 100));
  },
  dollarInFlight: (avgDailyIncomeInUSD, reportedCases, number, timeToElapse, periodType,
    avgDailyIncomepopulation) => {
    const iBR = estimator.infectionsByRequstedTime(reportedCases, number, timeToElapse,
      periodType, timeToElapse);
    const dIF = (iBR * avgDailyIncomeInUSD * avgDailyIncomepopulation) / timeToElapse;
    return Math.floor(dIF);
  },

};

const covid19ImpactEstimator = () => {
  const input = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomepopulation: 0.73,
    },
    periodType: 'days',
    timeToElapse: 38,
    reportedCases: 2747,
    population: 92931687,
    totalHospitalBeds: 678874,
  };

  const estimates = {
    input,
    impact: {
      // challenge one
      currentlyInfected: estimator.currentlyInfected(input.reportedCases, 10, input.periodType),
      infectionsByRequstedTime: estimator.infectionsByRequstedTime(input.reportedCases,
        10, input.timeToElapse, input.periodType),
      // // challenge two
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
        input.reportedCases, 10, input.timeToElapse, input.periodType,
        input.region.avgDailyIncomepopulation, input.timeToElapse),

    },
    severeImpact: {
      // challenge one
      currentlyInfected: estimator.currentlyInfected(input.reportedCases, 50, input.periodType),
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
        input.reportedCases, 50, input.timeToElapse, input.periodType,
        input.region.avgDailyIncomepopulation, input.timeToElapse),
    },
  };
  return estimates;
};
export default covid19ImpactEstimator;


test('covid19ImpactEstimator', () => {
  expect(covid19ImpactEstimator()).toBe(5);
});
