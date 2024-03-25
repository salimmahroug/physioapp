const Quiz=require("../models/quiz.model")
const Player = require("../models/players.model");


async function getPlayer(req, res, next) {
    try {
      const player = await Player.findById(req.params.playerId);
      if (!player) throw new Error('Player not found');
      req.player = player;
      next();
    } catch (err) {
      next(err);
    }
  }

  async function addQuiz(req, res, next) {
    try {
      const { Quality, Stress, Fatigue, Remarque} = req.body;
      const player = req.player;
  
      // Create a new Quiz object
      const quiz = new Quiz({
        Quality: Quality,
        Stress: Stress,
        Fatigue: Fatigue,
        player: player._id,
        Remarque: Remarque
      });
  
      const savedQuiz = await quiz.save();
  
      player.quizzes.push(savedQuiz);
      if (player.quizzes.length > 10) {
        const oldestQuiz = player.quizzes.shift(); // Remove the oldest quiz
        await Quiz.findByIdAndDelete(oldestQuiz._id); // Delete the quiz from the database
      }
      await player.save();
  
      res.status(200).json(savedQuiz);
    } catch (err) {
      next(err);
    }
  }
  
  async function getPlayerQuizzes(req, res, next) {
    try {
      const Quizzes = await Quiz.find().populate('player', "firstname");
      res.json(Quizzes);
    } catch (err) {
      next(err);
    }
  }

  async function getAllQuizzes(req, res, next)  {
    try {
      const Quizzes = await Quiz.find().populate('player', "firstname");
      res.json(Quizzes);
    } catch (err) {
      next(err);
    }
  }

  async function deleteQuiz(req, res, next) {
    try {
      const QuizId = req.params.id;
  
      const QuizToDelete = await Quiz.findById(QuizId);
  
      if (!QuizToDelete) {
        throw new Error("quiz not found");
      }
  
      // Delete the Quiz from the database
      await QuizToDelete.deleteOne();
  
      // Remove the Quiz from the player's list of Quizs
      const player = await Player.findByIdAndUpdate(
        QuizToDelete.player,
        { $pull: { quizzes: QuizId } },
        { new: true }
      );
  
      res.status(200).json(player);
    } catch (err) {
      next(err);
    }
  }
  


  module.exports={addQuiz,getPlayer,
    getPlayerQuizzes,getAllQuizzes,deleteQuiz
}
