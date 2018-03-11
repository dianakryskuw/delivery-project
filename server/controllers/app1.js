var ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://Anna2:Aa12345@ds247078.mlab.com:47078/delivery';
var cron = require('node-cron');
var CronJob = require('cron').CronJob;
var mongoose = require("mongoose");
var mongooseSchema = require('./schema');
var Promise = require('promise');


module.exports = (app) => {
  app.get('/data', function(req, res) {

  MongoClient.connect(MONGO_URL, (err, db) => {  
 mongoose.connect(MONGO_URL);

var Order = mongoose.model("Order",mongooseSchema.orderScheme,"order");
var Cars = mongoose.model("Cars", mongooseSchema.carScheme);


//add new car
/*
var car = new Cars({
});
car.save(function(err){
     
  mongoose.disconnect();
  if(err) return console.log(err);
   
  console.log("Saved", car);
});
      if (err) {
        return console.log(err);
      }
 */     
/*
Cars.update({"status": true}, { "status":false}, { multi: true })
.then(console.log("Done"));
*/
/*
Order.update({"status":  "delivered"}, { "status": 'in the store'}, { multi: true })
.then(console.log("Done"));
*/

function send_a_car(order_id_,time_){
Cars.findOneAndUpdate({status:false},{ $set: { order_id: order_id_,status:true,finish_time:new Date(Date.now()+time_) } },{new:true},function(err, result) { 
  console.log("in the method");
  if(result!=null){
  var inThreeMinutes = new Date(Date.now()+time_);
  console.log("start");
  Order.update({"_id":  order_id_}, { "status": 'on the way'}, { multi: true }, function callback (err, numAffected) {
    console.log("order on the way");
  });
  var job = new CronJob(inThreeMinutes, function() {
    console.log(result.order_id);
    console.log('running a task');
   
    Order.findOneAndUpdate({"_id":  order_id_}, { $set:{ "status": 'delivered'}},{new:true}, function callback (err, numAffected) {
      console.log("order delivered");
    });
    Cars.findOneAndUpdate({"_id": result._id}, { $set:{ order_id: null,status:false,finish_time:null}},{new:true}, function callback (err, numAffected) {
      console.log(result._id);
      console.log("car is free");
    });
    
    });
  job.start();
  }
  });
}

// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
//   Cars.find({status:false}).exec(function(err, carsResult) {
//     var carCount = carsResult.length;
//     console.log(carCount);
//     Order.find({"status": 'in the store'}).sort({date: 1}).limit(carCount).exec(function(err, orderResult) {  
//       if(!orderResult)
//         return;
//         console.log("count of orders:");
//         console.log(orderResult.length);
//         orderResult.forEach(order => {
//             console.log("/////////");              
//              console.log(order);
//             send_a_car(order._id,order.time);       
//       });      
//   });
//   });
// });


function calculateEstimatedTime(){
  var orderResult; 
  var counterForOrder=0;
  var counterForCars=0;
  var estimatedTime=[];    
  var counter=0;
  var orderCount=0;
  return Order.find({'status':'in the store'})
    .sort({date: 1})
    .then(data => {
      if(!data)
       return;
      orderCount=data.length;
      orderResult = data;
      return Cars.find({'status':true});    
    })
    .then(cars =>{
      if(!cars)
       return;
      cars.forEach(car=>{
        estimatedTime[counter]=car.finish_time;
        counter++;
      }) 
    })
    .then(()=>{
      return Cars.find({'status':false});
    })
    .then(cars => {
      var carsCount;
       carsCount = cars.length;
       orderResult.forEach(order => {
         if(counterForCars!=carsCount){
          estimatedTime[counter] = new Date(+Date.now()+order.time.value*1000);
          Order.findOneAndUpdate({"_id":  order._id}, { $set:{ "arrivalDate":  estimatedTime[counterForOrder]}},{new:true}).exec();
          counter++;
          counterForCars++;
          counterForOrder++;
         }
       })
       return estimatedTime;
    })
    .then((estTime)=>{
      while(counterForOrder!=orderCount){
        estTime.sort((a, b) => a - b);
        estTime[0] =new Date(+new Date(estTime[0])+orderResult[counterForOrder].time.value*1000);
        Order.findOneAndUpdate({"_id":  orderResult[counterForOrder]._id}, { $set:{ "arrivalDate":  estTime[0]}},{new:true}).exec();
       counterForOrder++; 
      }
    })
}

//calculateEstimatedTime();

//   function calculateEstimatedTime(){
//   console.log("1");
//   var carCount;
//   var counter=0;
//   var allEstimatedTimes=[];
//   return Cars.count({})
//   .then(data => {
//     carCount = data;
//     console.log("2");
//     console.log("cars: ",carCount);


//     return Order.find({ $or:[ {'status':'in the store'}, {'status':'on the way'} ]})
//     .sort({date: 1});
//   })
//   .then(orderResult => {
//     if(!orderResult)
//     return; 
//     console.log("3");
//     var orderCount=orderResult.length;
//     var promiseArray = [];

//     var estimatedTime=[];
//     for(var j=0;j<carCount;j++){
//        estimatedTime[j]=0;
//     }
//     var i=0;
//     orderResult.forEach(order => {
//        if(counter==orderCount)
//         return;
//        estimatedTime[i]+=order.time;
//        promiseArray.push(Order.findOneAndUpdate({"_id":  order._id}, { $set:{ "arrivalDate": Date.now()+estimatedTime[i]}},{new:true}));           
//        allEstimatedTimes[counter] = estimatedTime[i];
//        counter++; 
//        i++;
//        if(i==carCount)
//         i=0; 
//     });   
//     console.log("end method");    
//     return Promise.all(promiseArray)           
//   })
//   .catch(console.log)
// }


function getArrivalTime(){
 calculateEstimatedTime().then(()=>{
    return Order.find({ $or:[ {'status':'in the store'}, {'status':'on the way'} ]})
  })
  .then(data => {
    data.forEach(order => {
      console.log('/////////');
      console.log("for chosen odrer id: ", order._id, "arrival date is ",order.arrivalDate);
   
    });
  })
}


function getArrivalTimeForOneOrder(orderId){
  calculateEstimatedTime().then(()=>{
    return Order.findOne({"_id":  orderId});
  })
  .then(order => {
    console.log("for chosen one odrer id: ", order._id, "arrival date is ",order.arrivalDate);
  })
}

getArrivalTime();
getArrivalTimeForOneOrder("5aa30848fb6eff639cf3430c");

db.close();
  });
  });
}