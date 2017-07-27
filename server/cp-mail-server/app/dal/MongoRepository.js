var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var database = require('../../config/database');

let messagesCollection = 'messages';

exports.addMessage = function (messageData) {
  MongoClient.connect(database.url, function (err, db) {
    if (err) console.log(err);
    else {
      db.collection(messagesCollection).insert(messageData);
    }
  });
};

exports.getMessage = function (user, func) {
  MongoClient.connect(database.url, function (err, db) {
    if (err) console.log(err);
    else {
      db.collection(messagesCollection).find({ 'recepients': user }).toArray(function (err, result) {
        if (err) throw err;
        func(result);
      });
    }
  });
}

exports.updateReadStatus = function (messageId, status) {
  MongoClient.connect(database.url, function (err, db) {
    if (err) console.log(err);
    else {
      db.collection(messagesCollection).update({_id : new ObjectId(messageId)}, {$set : {isRead : status}})
    }
  });
}