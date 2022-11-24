import express from "express";
import path from "path";

const app = express();
const port = 8080;

app.use(express.static(path.resolve("public")));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/pencarian/graf',(req,res)=>{
    res.render('PencarianGraf');
});

app.get('/pencarian/grafik',(req,res)=>{
    res.render('PencarianGrafikBar');
});

app.get('/pencarian/nama',(req,res)=>{
    res.render('PencarianNama');
});
app.listen(port,()=>{
    console.log('listening');
});