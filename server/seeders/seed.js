const connectDB = require("../config/connection.js");
const { User, Photo, Comment } = require("../models");
const UserData = require("./UserData.json");
const PhotoData = require("./PhotoData.json");
const CommentData = require("./CommentData.json");

connectDB.once("open", async () => {
  // clean database
  await User.deleteMany({});
  await Photo.deleteMany({});
  await Comment.deleteMany({});

  // bulk create each model
    const users = await await User.create(UserData);
    const photos = await await Photo.create(PhotoData);
    const comments = await await Comment.create(CommentData);
  
  for (NewComment of comments) {
    // randomly add each user to a comment
    const tempUsers = users[Math.floor(Math.random() * users.length)];
    tempUsers.comments.push(NewComment._id);
    await tempUsers.save();
    
    NewComment.user=tempUsers._id;
    await NewComment.save(); 
  }

    for (NewPhoto of photos) {
      // randomly add each user to a photo
      const tempUsers = users[Math.floor(Math.random() * users.length)];
      tempUsers.photos.push(NewPhoto._id);
      await tempUsers.save();
      
      NewPhoto.user = tempUsers._id;
      await NewPhoto.save();
    }

  console.log("all done!");
  process.exit(0);
});


