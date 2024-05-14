const {
  response: { sendResponse }
} = require('../../utils');
const { HttpStatusCode } = require('../../utils');
const fs = require('fs').promises;

const getAddress = async (req, res, next) => {
  try {
    // Read file asynchronously
    const addressList = await fs.readFile('address.json', 'utf8');

    // Parse JSON data
    const parsedData = JSON.parse(addressList);

    return sendResponse(res, { items: parsedData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddress
};
