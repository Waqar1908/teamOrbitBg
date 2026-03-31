const service = require("./emp.service");

// ✅ create employee
exports.createEmp = async (req, res) => {
  try {
    const companyId = req.user.id; // from company token
    const data = await service.createEmp(companyId, req.body);

    res.json({
      success: true,
      message: "Employee created successfully",
      data
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ get all employees
exports.getEmp = async (req, res) => {
  try {
    const companyId = req.user.id;
    const data = await service.getAllEmp(companyId);

    res.json({
      success: true,
      message: "Employees fetched successfully",
      data
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};