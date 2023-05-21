import Conversation from "../model/Conversation.js";

//create new conversation
export const createConversation = async (req, res) => {
  const Userid = req.body.userid;
  const receiverId = req.body.friendid;

  try {
    const newconversation = new Conversation({
      members: [Userid, receiverId],
    });
    const savedconversation = await newconversation.save();
    res.status(200).json(savedconversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all conversation of a user
export const getallConvo = async (req, res) => {
  try {
    const convos = await Conversation.find({
      members: { $in: [req.body.user_id] },
    });
    res.status(200).json(convos);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const alternateconvo = async (req, res) => {
  try {
    const convo = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(convo);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const IndividualConvo = async (req, res) => {
  try {
    const singleconvo = await Conversation.find({
      members: { $all: [req.params.userId, req.params.friendId] },
    });
    res.status(200).json(singleconvo);
  } catch (err) {
    res.status(500).json(err);
  }
};
