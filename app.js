const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.use(bodyParser.json());


app.post('/getResponse', (req, res) => {
    console.log(req.body.question);      //finf the question in gemini
    const genAI = new GoogleGenerativeAI('AIzaSyB8RKh0B8hLWRd7YVjmsk-QP02HTQzb6Qg');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = "Write a story about a magic backpack.";

    model.generateContent(req.body.question).then(result=>{
        console.log(result.response.text());
        const response=result.response.text();

        res.status(200).json({
            response:response
        })

    })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
    
   })

})

app.get('*',(req,res)=>{
    res.status(404).json({
        msg:'bad request'
    })
})



module.exports = app;


//AIzaSyA678al_-N8eovY5wuhzRgczoqKXRyqcSk