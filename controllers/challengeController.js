const Challenge = require('../models/challenge');

// Controller function to get all challenges
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({ success: true, data: challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller function to create a new challenge
exports.createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge({
      title: req.body.title,
      description: req.body.description,
      creator: req.user._id,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      maxParticipants: req.body.maxParticipants,
      participants: [],
      rewards: [],
    });

    await challenge.save();

    res.status(201).json({ success: true, data: challenge });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller function to get a single challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('creator', 'name email');
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller function to update a challenge
exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    // Check if the user is the creator of the challenge
    if (challenge.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'You are not authorized to perform this action' });
    }

    challenge.title = req.body.title;
    challenge.description = req.body.description;
    challenge.startTime = req.body.startTime;
    challenge.endTime = req.body.endTime;
    challenge.maxParticipants = req.body.maxParticipants;

    await challenge.save();

    res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller function to delete a challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    // Check if the user is the creator of the challenge
    if (challenge.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'You are not authorized to perform this action' });
    }

    await challenge.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get participants of a challenge
exports.getChallengeParticipants = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const participants = challenge.participants.map((participant) => {
      return { userId: participant.userId, username: participant.username };
    });

    res.json({ participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
