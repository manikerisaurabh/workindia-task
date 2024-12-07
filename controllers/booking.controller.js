const db = require("../db/connectToDb.js");

const getBookingDetailsController = async (req, res) => {
  const { bookingId } = req.params;

  const getBookingDetailsQuery = `
        SELECT b.id AS booking_id, b.seat_count, u.email, t.source, t.destination
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN trains t ON b.train_id = t.id
        WHERE b.id = $1;
    `;

  try {
    const bookingDetails = await db.query(getBookingDetailsQuery, [bookingId]);

    if (bookingDetails.rowCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      booking_id: bookingDetails.rows[0].booking_id,
      seat_count: bookingDetails.rows[0].seat_count,
      email: bookingDetails.rows[0].email,
      source: bookingDetails.rows[0].source,
      destination: bookingDetails.rows[0].destination,
    });
  } catch (error) {
    console.log("Error in getBookingDetailsController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getBookingDetailsController,
};
