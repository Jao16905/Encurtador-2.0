const linkSchema = require("../models/linkModel");
const jwt = require("jsonwebtoken");

const redirect = async (req,res) =>{

    let params = req.params.args

    try{

    let doc= await linkSchema.findOne({title: params});
    
        if(!doc){
            doc = await linkSchema.findOne({_id: params});
        }
 
        if(doc){
            if(doc.limit != 0){
                if(!doc.used){
                    await doc.updateOne({$inc : {count: 1}});
                    doc.used = doc.count == doc.limit ? true : false
                    await doc.save();
                    res.redirect(doc.URL);
                }
                else{
                    res.status(400).send("Link inválido");
                }
            }else{
                res.redirect(doc.URL)
            }
        }
    }catch(error){
        console.log(error)
    }

}

const createLink = async (req,res) =>{
    try{
    let allLinks = await linkSchema.find({title: req.body.title});

    const userID = req.body.token ? jwt.verify(req.body.token, process.env.TOKEN_SECRET).payload.id : "";

    try{
        new URL(req.body.URL);
    }catch(e){
      return res.status(400).send("URL inválida")
    }

    if(!(allLinks.length > 0)){
        
        let link = new linkSchema({title: req.body.title, URL: req.body.URL, limit: req.body.limit, creator: userID});

        link.newURL = (req.body.title != "" ? `${process.env.DEFAULT_URL}/${req.body.title}` : `${process.env.DEFAULT_URL}/${link._id}`)

        await link.save();

        console.log(link)

        return res.status(200).send(link.newURL);

    }else{
        return res.status(400).send("Link já existe")
    }}catch(error){
        res.send(error)
    }

}

const updateLink = async (req,res) =>{

    const updateData = {
        URL: req.body.URL 
      };
      
      if (req.body.title !== "") {
        updateData.title = req.body.title;
      }else if(req.body.URL !== ""){
        updateData.URL = req.body.URL;
      }else if(req.body.limit !== 0){
        updateData.limit = req.body.limit;
      }
      try{
      let allLinks = await linkSchema.find({title: req.body.title});
    if(!(allLinks > 0)){
        
        let link = linkSchema.findByIdAndUpdate(res.body.id, updateData)

        link.newURL = (req.body.title != "" ? `${process.env.DEFAULT_LINK}/${req.body.title}` : `${process.env.DEFAULT_LINK}/${link._id}`)

        await link.save();
        res.status(200).send(link.newURL);

    }else{
        res.status(400).send("Link já existe")
    }}catch(error){
        res.send(error)
    }

}

const getAllLinks = async (req,res) =>{

    const userID = jwt.verify(req.body.token, process.env.TOKEN_SECRET).payload.id; 

    try{

    let allLinks = await linkSchema.find({creator: userID});
      
    
    if(allLinks > 0){
        res.status(200).send(allLinks)
    }
    }catch(e){
        res.status(400).send(e)
    }

}

const deleteLink = async (req,res) =>{

    try{
        let ID = req.body.id;

        await linkSchema.findByIdAndDelete(ID);

    }catch(error){
        console.log(error)
    }

}

module.exports = {createLink, updateLink, redirect, deleteLink, getAllLinks}