const Song = require('../models/Song');
const catchError = require('../utils/catchError');


const getAll = catchError(async (req, res) => {
  const songs = await Song.findAll();
  return res.status(200).json(songs);
});

const create = catchError(async (req, res) => {
  const song = await Song.create(req.body)
  return res.status(201).json(song);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByPk(id);
  if (!song) return res.status(404).json({
    message: `Song ${id} not found 🤔`,
    error: 'First, define an existing song or create a new song.'
  });
  return res.status(200).json(song);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  const song = await Song.destroy({ where: { id } });
  if (!song) return res.status(404).json({
    message: `Song ${id} not found 🤔`,
    error: 'First, define an existing song.'
  });

  return res.status(200).json(`Song ${id} deleted ✅`);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByPk(id);
  if (!song) return res.status(404).json({
    message: `Song ${id} not found 🤔`,
    error: 'First, define an existing song or create a new song.'
  });

  const songUpdate = await song.update(req.body);
  return res.status(200).json(songUpdate);
});

module.exports = {
  getAll,
  create,
  getOne,
  destroy,
  update
}