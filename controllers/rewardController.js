const Reward = require('../models/reward');

// Create a new reward
exports.createReward = async (req, res) => {
  try {
    const reward = new Reward(req.body);
    await reward.save();
    res.status(201).json({ success: true, reward });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all rewards
exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.status(200).json({ success: true, rewards });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get a reward by id
exports.getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      res.status(404).json({ success: false, error: 'Reward not found' });
    }
    res.status(200).json({ success: true, reward });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Update a reward
exports.updateReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!reward) {
      res.status(404).json({ success: false, error: 'Reward not found' });
    }
    res.status(200).json({ success: true, reward });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a reward
exports.deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);
    if (!reward) {
      res.status(404).json({ success: false, error: 'Reward not found' });
    }
    res.status(200).json({ success: true, message: 'Reward deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
