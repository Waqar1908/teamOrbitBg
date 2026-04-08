const service = require("./emp.service");

// 🔹 CREATE
exports.createEmp = async (req, res) => {
  try {
    const companyId = req.user.id;
    const companyCode = req.user.company_code;

    const data = await service.createEmp(companyId, companyCode, req.body);

    res.json({
      success: true,
      message: "Employee created successfully",
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
exports.getEmp = async (req, res) => {
  try {
    const companyId = req.user.id;

    const data = await service.getAllEmp(companyId);

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


// 🔹 GET BY ID
exports.getEmpById = async (req, res) => {
  try {
    const companyId = req.user.id;
    const empId = req.params.id;

    const data = await service.getEmpById(companyId, empId);

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


// 🔹 UPDATE
exports.updateEmp = async (req, res) => {
  try {
    const companyId = req.user.id;
    const empId = req.params.id;

    const data = await service.updateEmp(companyId, empId, req.body);

    res.json({
      success: true,
      message: "Employee updated",
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
exports.deleteEmp = async (req, res) => {
  try {
    const companyId = req.user.id;
    const empId = req.params.id;

    await service.deleteEmp(companyId, empId);

    res.json({
      success: true,
      message: "Employee deleted"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};