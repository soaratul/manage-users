const {
  APP_PERMISSIONS,
  NotFoundError,
  response: { sendResponse },
  ForbiddenError
} = require('../../utils');
const { BadRequestError, HttpStatusCode } = require('../../utils');
const bcrypt = require('bcrypt');
const {
  readUsersFromFile,
  writeUserToFile,
  getUserByEmail,
  getUserById,
  updateUser
} = require('../../utils/user-utils');
const fs = require('fs').promises;

const getMe = async (req, res, next) => {
  try {
    const user = req.currentUser;

    sendResponse(res, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  const inputData = req.body;
  const { id } = req.params;

  const fieldsToUpdate = {};
  if (inputData.first_name) fieldsToUpdate.first_name = inputData.first_name;
  if (inputData.last_name) fieldsToUpdate.last_name = inputData.last_name;
  if (inputData.email) fieldsToUpdate.email = inputData.email;
  if (inputData.preferd_payment_method)
    fieldsToUpdate.preferd_payment_method = inputData.preferd_payment_method;
  if (inputData.address_line1)
    fieldsToUpdate.address_line1 = inputData.address_line1;
  if (inputData.address_line2)
    fieldsToUpdate.address_line2 = inputData.address_line2;
  if (inputData.state) fieldsToUpdate.state = inputData.state;
  if (inputData.city) fieldsToUpdate.city = inputData.city;

  try {
    if (Object.keys(fieldsToUpdate).length === 0)
      throw new BadRequestError(`Please provide at least one field to update`);

    const user = await getUserById(id);

    if (!user) throw new BadRequestError(`There is no user with the given ID.`);

    Object.keys(fieldsToUpdate).forEach((column_name) => {
      user[column_name] = fieldsToUpdate[column_name];
    });
    await updateUser(id, user);
    sendResponse(res, {}, HttpStatusCode.OK, 'User updated successfully.');
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    let { page, limit, order, orderBy, filter } = req.query;
    page = page ? parseInt(page) : 0;
    limit = limit ? parseInt(limit) : 5;
    if (!order) order = 'ASC';
    if (!orderBy) orderBy = 'first_name';

    const rows = await readUsersFromFile();
    const count = rows.length;

    const pagination = {
      currentPage: page,
      totalPage: Math.ceil(count / limit),
      totalItems: count
    };
    sendResponse(
      res,
      {
        pagination,
        items: rows.map((item) => {
          return {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            payment_method: item.preferd_payment_method,
            address_line1: item.address_line1,
            address_line2: item.address_line2,
            state: item.state,
            city: item.city,
            pin_code: item.pin_code
          };
        })
      },
      HttpStatusCode.OK
    );
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;

    // Find the user based on the provided username
    const user = await models.user_master.findOne({
      where: {
        id: req.currentUser.id
      }
    });

    if (!user) throw new NotFoundError('User not found');

    // Compare the old password with the hashed password stored
    const isCurrentPasswordMatch = await bcrypt.compare(
      current_password,
      user.password
    );

    if (!isCurrentPasswordMatch)
      throw new BadRequestError('Current password is not correct');

    // Compare the new password same as old one
    const isNewasswordIsSameAsOld = await bcrypt.compare(
      new_password,
      user.password
    );

    if (isNewasswordIsSameAsOld)
      throw new BadRequestError(
        'New password cannot be the same as the old password'
      );

    // Update the user's password with the new hashed password
    user.password = new_password;

    await user.save();

    return sendResponse(
      res,
      {},
      HttpStatusCode.OK,
      'Password changed successfully'
    );
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, email } = req.body;
    const currentUser = req.currentUser;

    await models.user_master.update(
      {
        first_name,
        last_name,
        email
      },
      {
        where: {
          id: currentUser.id
        }
      }
    );

    return sendResponse(
      res,
      {},
      HttpStatusCode.OK,
      'Profile updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

const isEmailAlreadyExists = async (data, context) => {
  const { email, type } = data;
  if (type === 'create') {
    const user = await getUserByEmail(email);
    if (user) return false;
  }
  if (type === 'update') {
    // console.log('context.options', context.options.request.params.id);
    const user = await getUserByEmail(email);
    const userId = context.options.request.params.id;
    if (user && user.id !== userId) {
      return false;
    }
  }
  return true;
};

module.exports = {
  updateOne,
  list,
  getMe,
  isEmailAlreadyExists,
  updateProfile
};
