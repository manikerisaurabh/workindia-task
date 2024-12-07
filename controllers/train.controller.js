const db = require("../db/connectToDb.js");

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
  const checkSeatQuery = `
                SELECT t.available_seat
                FROM trains t
                WHERE t.source = $1 AND t.destination = $2
`;
  try {
    const availabeSeats = await db.query(checkSeatQuery, [source, destination]);
    console.log(availabeSeats);

    return res
      .status(200)
      .json({ availabeSeats: availabeSeats.rows[0].available_seat });
  } catch (error) {
    console.log("error in checkSeatAvailabilityController : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addNewtrainController,
  checkSeatAvailabilityController,
};
