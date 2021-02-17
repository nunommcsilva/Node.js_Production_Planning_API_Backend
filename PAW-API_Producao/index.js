const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
let router = require('./router');
var app = express();
app.use(router.initialize());
const server = http.Server(app);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// database
const mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/apiproducao', {
		useUnifiedTopology: true,
		useFindAndModify: true,
		useNewUrlParser: true,
		useCreateIndex: true
	});

	const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});
db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});
db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});
process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});


app.get('/',(req,res)=>{
    res.send('Home Page');
})

app.get('/admin',isAdmin,(req,res) =>{
    res.send('Admin Page');
})

function isAdmin(req,res,next){
    User.findOne({name:req.body.name}).then(
        (user)=>{
            if(!user){
                return res.status(401).json({
                    message:'You need to be an admin to go to this page!'
                });
            }else{
                if(user.role.name!=='admin'){
                    return res.status(403).json({
                        message:'Not authorized'
                    });
                }else{
                    next();
                }
            }
        }
    )
}

const User = require('./data/users/user');
const Group = require('./data/bomgroups/bomgroup');
const Item = require('./data/items/item');
const Production = require('./data/productionorders/productionorder');
const Purchase = require('./data/purchaseorders/purchaseorder');
const TraceabilityProduction = require('./data/traceabilityproductions/traceabilityproduction');
const TraceabilityPurchase = require('./data/traceabilitypurchases/traceabilitypurchase');
const {paginatedData,paginatedData2,paginatedData3}=require('./server/pagorder');

//paginate users
app.get('/users/user',paginatedData(User),(req,res)=>{
    res.json(res.paginatedData)
});
//paginate bomgroups
app.get('/bomgroups/bomgroup',paginatedData(Group),(req,res)=>{
    res.json(res.paginatedData)  
});
//paginate item
app.get('/items/item',paginatedData(Item),(req,res)=>{
    res.json(res.paginatedData)
});
//paginate productionorder
app.get('/productionorders/productionorder',paginatedData2(Production),(req,res)=>{
    res.json(res.paginatedData)
});
//paginate purchaseorder
app.get('/purchaseorders/purchaseorder',paginatedData2(Purchase),(req,res)=>{
    res.json(res.paginatedData)
});
//paginate traceabilityproductions
app.get('/traceabilityproductions/traceabilityproduction',paginatedData3(TraceabilityProduction),(req,res)=>{
    res.json(res.paginatedData)
});
//paginate traceabilityproductions
app.get('/traceabilitypurchases/traceabilitypurchase',paginatedData3(TraceabilityPurchase),(req,res)=>{
    res.json(res.paginatedData)
});