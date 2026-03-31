const service = require("./employeeAuth.service");

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);

    res.status(200).json({
      success: true,
      message: "Employee login successful",
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};