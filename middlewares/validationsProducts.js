const verifyName = (name) => {
    if (!name) return res.status(400).json({ message: '"name" is required' });
  
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
  };

module.exports = {
  verifyName,
};