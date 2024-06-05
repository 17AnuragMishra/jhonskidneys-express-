const express = require('express')
const app = express();

const user = [{
    name: "Rohan",
    kidneys: [{
        healthy: false
    }]
}]
app.use(express.json());
app.get('/', function (req, res){
    const RohanKidneys = user[0].kidneys;
    let healthyKidneys = 0;
    const numberOfKidneys = RohanKidneys.length
    for(let i=0;i<numberOfKidneys;i++){
        if(RohanKidneys[i].healthy){
            healthyKidneys+=1
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - healthyKidneys
    res.json({
        numberOfKidneys,
        numberOfUnhealthyKidneys,
        healthyKidneys
    })
})
app.post('/', function (req, res){
    const isHealthy = req.body.healthy;
    user[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done"
    })
})
app.put('/', function (req,res){
    for (let i =0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy = true;
    }
    res.json({});
})

function isThereAtLeastOneHealthyKidney(){

}
app.delete('/', function (req,res){
        if(isThereAtLeastOneUnhealthyKidney()) {
            const newKidneys = [];
            for (let i = 0; i < user[0].kidneys.length; i++) {
                if (user[0].kidneys[i].healthy) {
                    newKidneys.push({
                        healthy: true
                    })
                }
            }
            user[0].kidneys = newKidneys;
            res.json({msg: "done"})
        }else{
            res.status(411).json({
                msg: "You don't have any unhealthy kidney"
            });
        }
})
function isThereAtLeastOneUnhealthyKidney(){
        let atLeastOneUnhealthyKidney = false;
        for(let i=0;i<user[0].kidneys.length;i++){
            if(!user[0].kidneys[i].healthy){
                atLeastOneUnhealthyKidney = true;
            }
        }
        return atLeastOneUnhealthyKidney
}

app.listen(5000);
