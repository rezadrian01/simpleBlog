const fs = require("node:fs/promises");
const path = require("path");

exports.deleteFile = async (filePath) => {
  try {
    filePath = path.join(__dirname, "..", filePath);
    const result = await fs.unlink(filePath);
    console.log("Deleted File");
  } catch (err) {
    console.log(err);
  }
};
