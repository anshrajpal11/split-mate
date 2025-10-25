import groupModel from "../models/group.model.js";
import userModel from "../models/user.model.js"

export const createGroup = async (req,res)=>{
  const user = await userModel.findById(req.user.id);
  const {groupName} = req.body;
  const groupOwner = req.user.id;
  const newGroup = new groupModel({
    groupName,
    groupOwner
  })
  user.groups.push(newGroup._id);
  await newGroup.save();
  await user.save();

  const io = req.app.get("io");
  io.emit("groupCreated", newGroup);

   res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: newGroup,
    });
}

export const getGroup = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate("groups");
    return res.json({
      success: true,
      groups: user.groups,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const addMember = async (req, res) => {
  try {
    const { username} = req.body;
    const groupId = req.params.id;

    const user = await userModel.findOne({ username });
    const group = await groupModel.findById(groupId);

    if (!user) return res.status(404).json({ message: "User not found", success: false });
    if (!group) return res.status(404).json({ message: "Group not found", success: false });

    
    if (!user.groups.includes(groupId)) user.groups.push(groupId);
    if (!group.groupMembers.includes(user._id)) group.groupMembers.push(user._id);

    await user.save();
    await group.save();

    return res.json({
      message: "Member added successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};


export const getMembers = async (req, res) => {
  try {
    const groupId = req.params.id;
    
    const group = await groupModel.findById(groupId).populate('groupMembers', 'username email'); 
    
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    return res.json({
      success: true,
      members: group.groupMembers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

