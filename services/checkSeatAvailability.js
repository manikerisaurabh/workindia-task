const db = require("../db/connectToDb.js");
const { checkSeatQuery } = require("../queries/train.queries.js");
const checkSeatAvailabilityService = async (source, destination) => {
  const seats = await db.query(checkSeatQuery, [source, destination]);
  console.log(seats.rows[0].available_seat);
  console.log({ seats });
  return seats.rows[0].available_seat;
};

module.exports = {
  checkSeatAvailabilityService,
};
