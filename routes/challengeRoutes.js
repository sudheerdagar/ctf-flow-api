const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const auth = require('../middleware/auth');

//get participants for  a certain cahllenge
router.get('/:challengeId/participants', auth, challengeController.getChallengeParticipants);

// Get all challenges
router.get('/', challengeController.getAllChallenges);

// Get single challenge by ID
router.get('/:id', challengeController.getChallengeById);

// Create new challenge
router.post('/', auth, challengeController.createChallenge);

// Update existing challenge
router.put('/:id', auth, challengeController.updateChallenge);

// Delete existing challenge
router.delete('/:id', auth, challengeController.deleteChallenge);



module.exports = router;
