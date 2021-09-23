const Team = require("../models/Team.model");
const path = require("path");

module.exports.teamsController = {
  addTeam: async (req, res) => {
    try {
      const team = await Team.create({
        name: req.body.name,
        eventId: req.body.eventId,
        image: req.body.image,
      });
      res.json(team);
    } catch (e) {
      res.json("Ошибка при создании команды " + e);
    }
  },
  getTeams: async (req, res) => {
    try {
      const teams = await Team.find();
      res.json(teams);
    } catch (e) {
      res.json("Ошибка при выводе команд " + e);
    }
  },
  getTeamId: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      res.json(team);
    } catch (e) {
      res.json("Ошибка при выводе команды " + e);
    }
  },
  editTeam: async (req, res) => {
    try {
      await Team.findOneAndUpdate(req.params.id, req.body);
      res.json("Команда изменена");
    } catch (e) {
      res.json("ошибка при изменений " + e);
    }
  },
  deleteTeam: async (req, res) => {
    try {
      await Team.findByIdAndRemove(req.params.id);
      res.json("Команда удалена");
    } catch (e) {
      res.json("Ошибка при удалении " + e);
    }
  },
};
