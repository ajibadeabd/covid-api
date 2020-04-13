const covid19ImpactEstimator = (data) => {
  const OP = {
    data: { ...data }, // the input data you got
    Im: {}, // your best case estimation
    SI: {}, // your severe case estimation
  };

  const getHBRT = (totalHospitalBeds, SCRT) => {
    const useableBedSpace = totalHospitalBeds * 0.35;
    return useableBedSpace - SCRT;
  };
  const normDate = (period, figure) => {
    let result = '';
    if (period === 'days') {
      result = figure;
    }
    if (period === 'weeks') {
      result = figure * 7;
    }
    if (period === 'months') {
      result = figure * 30;
    }
    return result;
  };
  const ADIP = data.region.avgDailyIncomePopulation;
  const ADIU = data.region.avgDailyIncomeInUSD;
  const PT = data.periodType;
  const TE = data.timeToElapse;
  OP.Im.CI = data.reportedCases * 10;
  OP.SI.CI = data.reportedCases * 50;
  OP.Im.IRT = OP.Im.CI * 2 ** Math.trunc(normDate(PT, TE) / 3);
  OP.SI.IRT = OP.SI.CI * 2 ** Math.trunc(normDate(PT, TE) / 3);
  OP.Im.SCRT = Math.trunc(OP.Im.IRT * 0.15);
  OP.SI.SCRT = Math.trunc(OP.SI.IRT * 0.15);
  OP.Im.HBRT = Math.trunc(getHBRT(data.totalHospitalBeds, OP.Im.SCRT));
  OP.SI.HBRT = Math.trunc(getHBRT(data.totalHospitalBeds, OP.SI.SCRT));
  OP.Im.CFIRT = Math.trunc(OP.Im.IRT * 0.05);
  OP.SI.CFIRT = Math.trunc(OP.SI.IRT * 0.05);
  OP.Im.CFVRT = Math.trunc(OP.Im.IRT * 0.02);
  OP.SI.CFVRT = Math.trunc(OP.SI.IRT * 0.02);
  OP.Im.DIF = Math.trunc(
    (OP.Im.IRT * ADIP * ADIU) / Math.trunc(normDate(PT, TE)),
  );
  OP.SI.DIF = Math.trunc(
    (OP.SI.IRT * ADIP * ADIU) / Math.trunc(normDate(PT, TE)),
  );

  // OP object
  return {
    data: { ...data },
    impact: {
      currentlyInfected: OP.Im.CI,
      infectionsByRequestedTime: OP.Im.IRT,
      severeCasesByRequestedTime: OP.Im.SCRT,
      hospitalBedsByRequestedTime: OP.Im.HBRT,
      casesForICUByRequestedTime: OP.Im.CFIRT,
      casesForVentilatorsByRequestedTime: OP.Im.CFVRT,
      dollarsInFlight: OP.Im.DIF,
    },
    severeImpact: {
      currentlyInfected: OP.SI.CI,
      infectionsByRequestedTime: OP.SI.IRT,
      severeCasesByRequestedTime: OP.SI.SCRT,
      hospitalBedsByRequestedTime: OP.SI.HBRT,
      casesForICUByRequestedTime: OP.SI.CFIRT,
      casesForVentilatorsByRequestedTime: OP.SI.CFVRT,
      dollarsInFlight: OP.SI.DIF,
    },
  };
};

module.exports = covid19ImpactEstimator;
