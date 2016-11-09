// import mongoose, { Schema } from 'mongoose';
const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
