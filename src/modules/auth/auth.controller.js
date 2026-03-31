const service = require("./auth.service");

exports.signup = async (req, res) => {
  try {
    const data = await service.signup(req.body);

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};