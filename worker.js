const {parentPort}=require("worker_threads")


let total=0
for(let i=0;i<1000000000000;i++){
total++
}
parentPort.postMessage(total)