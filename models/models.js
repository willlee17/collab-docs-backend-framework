var mongoose = require('mongoose');

var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

var userSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

var documentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    { type: Schema.Types.ObjectId, ref: 'User' }
  },
  collaborators: {
    [  { type: Schema.Types.ObjectId, ref: 'User' } ]
  }
})

// Step 2: Create all of your models here, as properties.
var models = {
  User: mongoose.model('User', userSchema),
  Document: mongoose.model('Document', documentSchema)
};

// Step 3: Export your models object
module.exports = models;
