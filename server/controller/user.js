import userService from "../service/user";

/**
 * Function to create the user in user collection.
 */
exports.create = (req, res, next) => {
  const body = new User(req.body);
  if (!body.username) {
    res.status(400).send("Username is missing");
    return;
  }
  userService.createUser(body, function(error, response) {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  });
};

/**
 * Function to find user from user collection.
 */
exports.find = (req, res) => {
  const params = req.params || {};
  const query = {
    username: params.username
  };
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.findUser(query, function(error, response) {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    if (!response) {
      res.status(204).send("No Data Found");
    }
  });
};

/**
 * Function to update the user data  by their ID.
 */
exports.updateById = (req, res) => {
  const body = req.body;

  if (!body.id) {
    res.status(400).send("Id is missing");
    return;
  }
  const updateData = body.data || {};
  userService.updateUserById(body.id, updateData, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to uodate the user data by filter condition.
 */
exports.update = (req, res) => {
  const body = req.body;
  const query = body.query;
  const data = body.data;
  const options = body.options;
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  userService.updateUser(query, data, options, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to delete the user from collection.
 */
exports.delete = (req, res) => {
  const body = req.body || {};
  const query = body.query;
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.deleteUser(query, function(error, response) {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (response) {
      if (response.n === 1 && response.ok === 1) {
        res.status(202).send(body);
      }
      if (response.n === 0 && response.ok === 1) {
        res.status(204).send({
          message: "No data found"
        });
      }
    }
  });
};
//TODO:
// Model.find()
// Model.findById()

class User {
  constructor(userData) {
    this.username = userData.username || "";
    this.password = userData.password || "";
  }
}
