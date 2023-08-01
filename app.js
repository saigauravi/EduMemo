//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose=require("mongoose");
const date = require(__dirname + "/date.js");
mongoose.connect("mongodb://localhost:27017/blogdb",{useNewUrlParser: true});


const blogSchema={
  title: String,
  content:String
}

const post=mongoose.model("post",blogSchema);

const userSchema = {
  email: String,
  password: String
};
const User = mongoose.model("User", userSchema);
app.get("/login", function (req, res) {
  res.render("login")
});
app.get("/register", function (req, res) {
  res.render("register")
});

app.post("/register", function (req, res) {
  const newuser = new User({
      email: req.body.username,
      password: req.body.password

  });
  newuser.save().then(() => {
      res.render("secrets");
  }).catch((err) => {
      console.log(err);
  })
});
app.post("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email:username})
  .then((foundUser) => {
      if(foundUser){
          if(foundUser.password === password){
              res.render("home");
          }
      }
 })
 .catch((error) => {
    

console.log(err);
     
 });


})




const  todoschema={
  name: String
};

const Item=mongoose.model("Item",todoschema);

const item1= new Item({
  name: "Welcome to our todolist"
});
const item2= new Item({
  name: "click to add new item"
});
const item3= new Item({
  name: "click to delete this item"
});
const defaultItems=[item1,item2,item3];






// const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

  Item.find({}).then(function(foundItems){
    // mongoose.connection.close();

if(foundItems===0 ){
Item.insertMany(defaultItems).then(function () {
  console.log("Successfully saved defult items to DB");
}).catch(function (err) {
  console.log(err);
});
res.redirect("/");
}
else

    res.render("list", {listTitle: "today", newListItems:foundItems});
}).catch(function(err){
    console.log(err);
});


  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
const item= new Item({
  name: itemName
});
 item.save();
 res.redirect("/"); 
});

app.post("/delete",function(req,res){
  const checkboxId= req.body.checkbox;
  

Item.deleteMany({_id:checkboxId}).then(function () {
    console.log("Successfully deleted");
res.redirect("/");
  }).catch(function (err) {
    console.log(err);
  });

  });





app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});









const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  post.find({}).then(function(posts){
    res.render("home",
    {start: homeStartingContent,
      posts :posts });
  });
  
 
});

app.get("/about" ,function(req,res){
  res.render("about",{ab :aboutContent});
});
 app.get("/contact",function(req,res){
  res.render("contact",{con : contactContent});
 });

app.get("/compose",function(req,res){
  res.render("compose");
 

});

app.post("/compose",function(req,res){
const post1= new post({
  title: req.body.inputName,
  content:req.body.Text1
});
post1.save(function(err){
  if(!err)
  {
    res.redirect("/");
  }
});

});

app.get("/posts/:postId",function(req,res){
  const requestedPostId =req.params.postId;
  post.findOne({_id:requestedPostId}).then(function(post){
res.render("post", {
  title: post.title,
  content: post.content
});
  });
});


//payment
var http = require('http').Server(app);

const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);

//calculator
app.get("/calculator",function(req,res){
  res.sendFile(__dirname +"/calculator.html");
  });
  
  
  app.post("/calculator",function(req,res){
  var n1=Number(req.body.num1);
  var  n2=Number(req.body.num2);
  var add=n1 +n2;
  res.send("the sum is "+ add);
  
  });
  app.use(express.static('./assets'));

  app.get('/alarm',function(req,res){
    return res.render('alarm');
});


app.listen(8080, function() {
  console.log("Server started on port 8080");
});
