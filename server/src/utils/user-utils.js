const fs = require('fs').promises;

const readUsersFromFile = async () => {
  try {
    // Read file asynchronously
    const userList = await fs.readFile('data.json', 'utf8');

    return JSON.parse(userList);
  } catch (error) {
    console.error('An error occured in reading user list from file', error);
  }
};

const writeUserToFile = async (user) => {
  try {
    const userList = await readUsersFromFile();
    userList.push(user);
    // Convert JSON data to a string
    const jsonString = JSON.stringify(userList, null, 2); // null and 2 for pretty formatting

    // Write JSON string to a file
    await fs.writeFile('data.json', jsonString, 'utf8');
  } catch (error) {
    console.error('An error occured in reading user list from file', error);
  }
};

const getUserByEmail = async (email) => {
  const userList = await readUsersFromFile();
  const user = userList.find((user) => user.email === email);

  return user;
};

const getUserById = async (id) => {
  const userList = await readUsersFromFile();
  const user = userList.find((user) => user.id === id);

  return user;
};

const updateUser = async (id, userData) => {
  const userList = await readUsersFromFile();
  const user = userList.find((user) => user.id === id);
  const newUserList = userList.filter((user) => user.id !== id);
  newUserList.push({ ...user, ...userData });

  // Convert JSON data to a string
  const jsonString = JSON.stringify(newUserList, null, 2); // null and 2 for pretty formatting

  // Write JSON string to a file
  await fs.writeFile('data.json', jsonString, 'utf8');
};

module.exports = {
  readUsersFromFile,
  writeUserToFile,
  getUserByEmail,
  getUserById,
  updateUser
};
