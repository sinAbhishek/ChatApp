import message from "../model/Message.js";

export const sendmessage = async (req, res) => {
  const newmessage = new message({
    conversationId: req.body.conversationid,
    senderid: req.body.user_id,
    message: req.body.message,
  });
  try {
    const savedmsg = await newmessage.save();
    res.status(200).json(savedmsg);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getmessage = async (req, res) => {
  try {
    const messages = await message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
