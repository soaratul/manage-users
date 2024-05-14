const fs = require('fs').promises;

async function createFileIfNotExists(filePath) {
  try {
    await fs.access(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]', 'utf8');
    }
  }
}

module.exports = {
  createFileIfNotExists
};
