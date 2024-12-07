const checkSeatQuery = `
                SELECT t.*
                FROM trains t
                WHERE t.source = $1 AND t.destination = $2
`;

module.exports = {
  checkSeatQuery,
};
