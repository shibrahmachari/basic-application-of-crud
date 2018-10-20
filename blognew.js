var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var methodOverride=require('method-override');
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
mongoose.connect("mongodb://localhost/restfulblog_app");
var blogSchema=new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default:Date.now}
});
var Blog= mongoose.model("Blog", blogSchema);
Blog.create({
  title: "BASICS OF COMPUTING",
  image:"http://www.icontechnology.in/img/Services/Software/main.jpg",
  body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
});
app.get('/blog',function(req,res){
Blog.find({}, function(err,blogs){
  if(err){console.log(err);}
  else{
    res.render('blogs',{blogs:blogs});
  }
});
});
app.get('/',function (req,res){
  res.render('home');
});
app.get('/blog/new',function(req,res){
  res.render('create1');
});
app.post('/blog',function(req,res){
Blog.create( req.body.blog ,function(err,newblog){
  if(err){console.log(err);}
  else{
    res.redirect('/blog');
  }
});
});
app.get("/blog/:id",function(req,res){
  Blog.findById( req.params.id ,function(err,foundblog){
    if(err){console.log(err);}
    else{
      res.render("show",{blog:foundblog});
    }
  });
});
app.get("/blog/:id/edit",function(req,res){
  Blog.findById( req.params.id ,function(err,foundblog){
    if(err){console.log(err);}
    else{
      res.render("edit",{blog:foundblog});
    }
  });
});
app.put("/blog/:id",function(req,res){
  Blog.findByIdAndUpdate( req.params.id , req.body.blog,function(err,updatedblog){
    if(err){console.log(err);}
    else{
      res.redirect("/blog/", req.params.id);
    }
  });
});
app.post("/blog/:id", function(req,res){
Blog.findByIdAndRemove(req.params.id, function(err){
  if(err){console.log(err);}
  else{res.redirect("/blog");}
});
});
app.listen(8080);
