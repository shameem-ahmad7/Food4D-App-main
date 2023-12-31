const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://gofood:Khan123@cluster0.9cddff0.mongodb.net/gofood?retryWrites=true&w=majority";

const mongoDB = () => {
  mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connected Successfully");
    const fetched_data = mongoose.connection.db.collection("food_items")
    fetched_data.find({}).toArray()
    .then((data) => {
      const food_category = mongoose.connection.db.collection("food_category")
      food_category.find({}).toArray()
      .then((catData) => {
        global.food_items = data
        global.food_category = catData;
      }).catch((err) => {console.log(err)})   
      // console.log(global.food_items);
    }).catch((err) => {console.log(err)}) 
  }).catch((err) => {console.log(err)})
}

module.exports = mongoDB;

