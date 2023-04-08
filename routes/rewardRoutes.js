const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const auth = require('../middleware/auth');

// Get all rewards
router.get('/', rewardController.getRewards);

// Get single reward by ID
router.get('/:id', rewardController.getRewardById);

// Create new reward
router.post('/', auth, rewardController.createReward);

// Update existing reward
router.put('/:id', auth, rewardController.updateReward);

// Delete existing reward
router.delete('/:id', auth, rewardController.deleteReward);

module.exports = router;
