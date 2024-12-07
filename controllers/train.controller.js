const db = require("../db/connectToDb.js");
const { checkSeatQuery } = require("../queries/train.queries.js");
const {
  checkSeatAvailabilityService,
} = require("../services/checkSeatAvailability.js");

const addNewtrainController = async (req, res) => {
  const { name, source, destination, seats, roll } = req.body;

  const checkTrainQuery = `SELECT  t.* 
                            FROM trains t
                            WHERE t.name = $1`;

  const addNewTrainQuery = `INSERT INTO trains (name, source, destination, seats, available_seats)
                                VALUES ($1, $2, $3, $4)`;
  try {
    if (roll !== "admin") {
      return res.status(401).json({ message: "Only admin can add new train " });
    }

    const isAlreadyAdded = await db.query(checkTrainQuery, [name]);

    if (isAlreadyAdded.rowCount > 0) {
      return res.status(409).json({ message: "this train already added" });
    }
    const values = [name, source, destination, seats, seats];
    const newTrain = await db.query(addNewTrainQuery, values);

    res.status(200).json({ message: "New train added successfully" });

    return res.json(newTrain.rows[0]);
  } catch (error) {
    console.log("error in addNewtrainController : ", error);
    return res.status(500).json({ message: "Internal server errir" });
  }
};

const checkSeatAvailabilityController = async (req, res) => {
  const { source, destination } = req.body;

  try {
    const availabeSeats = await checkSeatAvailabilityService(
      source,
      destination
    );
    console.log(availabeSeats);

    return res.status(200).json({ availabeSeats });
  } catch (error) {
    console.log("error in checkSeatAvailabilityController : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const bookNewTrainController = async (req, res) => {
  const { source, destination, seatCount, user_id } = req.body;

  const updateTrainSeatsQuery = `
      UPDATE trains
      SET available_seat = available_seat - $1
      WHERE source = $2 AND destination = $3
      RETURNING id, available_seat;
    `;

  const insertBookingQuery = `
    INSERT INTO bookings (train_id, user_id, seat_count, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, train_id, user_id, seat_count, created_at;
  `;
  try {
    const availabeSeats = await checkSeatAvailabilityService(
      source,
      destination
    );

    if (availabeSeats == 0) {
      return res
        .status(401)
        .json({ message: "No seat is availabe for this route" });
    }

    if (seatCount > availabeSeats) {
      res
        .status(401)
        .json({ message: "available seats are less than requirements" });
    }

    const result = await db.query(updateTrainSeatsQuery, [
      seatCount,
      source,
      destination,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Failed to book seat" });
    }

    const train = result.rows[0];
    const newBooking = await db.query(insertBookingQuery, [
      train.id,
      user_id,
      seatCount,
    ]);

    return res.status(201).json({
      message: "Booking successful",
      booking: newBooking.rows[0],
      availableSeats: train.available_seat,
    });
  } catch (error) {
    console.log("error in bookNewTrainController : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addNewtrainController,
  checkSeatAvailabilityController,
  bookNewTrainController,
};
