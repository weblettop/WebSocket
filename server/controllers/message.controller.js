const { Message } = require('./../models');

module.exports.getMessages = async (req, res, next) => {
  const { limit = 20 } = req.query;

  try {
    const foundMessages = await Message.find()
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).send({ data: foundMessages });
  } catch (err) {
    console.log('err :>> ', err);
    next(err);
  }
};
