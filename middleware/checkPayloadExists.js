const checkPayloadExists = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ status: 'error', message: 'Missing files' });

  next();
};

module.exports = checkPayloadExists;
