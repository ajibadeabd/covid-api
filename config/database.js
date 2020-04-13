if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURL:
        'mongodb+srv://jumiacart:jumiacart@cluster0-oh9lt.mongodb.net/test?retryWrites=true&w=majority',
  };
} else {
  module.exports = {
    mongoURL:
        'mongodb://localhost/myCovidEstimatorApi',
  };
}
