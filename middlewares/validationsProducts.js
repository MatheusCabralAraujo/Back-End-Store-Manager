const verifyName = (name) => {
    if (!name) return { status: 400, message: '"name" is required' };
  
    if (name.length < 5) {
      return { status: 422, message: '"name" length must be at least 5 characters long' };
    }
  };

module.exports = {
  verifyName,
};