const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/academiks";
const JWT_SECRET = process.env.JWT_SECRET || "whothefuckarefuckingyou?";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 36000000000;
module.exports = {
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
