const service = require("./holiday.service");

// 🔹 CREATE
exports.createHoliday = async (req, res) => {
  try {
    console.log("USER:", req.user);

    const companyCode = req.user.company_code; // 🔥 from JWT

    const data = await service.createHoliday(companyCode, req.body);

    res.json({
      success: true,
      message: "Holiday created",
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


// 🔹 GET ALL
exports.getHoliday = async (req, res) => {
  try {
    const companyCode = req.user.company_code;

    const data = await service.getAllHoliday(companyCode);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


// 🔹 DELETE
exports.deleteHoliday = async (req, res) => {
  try {
    const companyCode = req.user.company_code;
    const id = req.params.id;

    await service.deleteHoliday(companyCode, id);

    res.json({
      success: true,
      message: "Holiday deleted"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};