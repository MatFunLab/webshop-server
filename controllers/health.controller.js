var os = require('os');

exports.getAppHealth = (req, res, next) => {
 
    //overall memory usage of a machine on which app is deployed
    overallServerUsage = {
        cpus: os.cpus(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
    }
     //memory usage of a webshop app process
     const processPid = process.pid;
     const processMemoryUsage = process.memoryUsage();

     const memoryUsage = {
         processMemoryUsage, overallServerUsage, processPid
     }
     res.send(memoryUsage);  
  }
  