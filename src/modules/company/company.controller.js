const service = require("./company.service");

// 🔹 Get Profile
exports.getProfile = async (req, res) => {
  try {
    const companyId = req.user.id;

    const data = await service.getProfile(companyId);

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


// 🔹 Update Profile with logo
exports.updateProfile = async (req, res) => {
  try {
    const companyId = req.user.id;

    console.log("FILE:", req.file);

    const logo = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const data = await service.updateProfile(
      companyId,
      req.body,
      logo
    );

    res.json({
      success: true,
      message: "Company updated successfully",
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};