/*setTimeout(
    ()=>{
        console.log("value saved in the databases")
    },
    1000
)
console.log("upload completed")*/

const isNetworkOkay = true;

const promiseOne = new Promise(
    (resolve , reject)=>{
        setTimeout(
            ()=>{
               if(isNetworkOkay){
                //success
                console.log("data saved in database")
                resolve("kaviii")
               }else{
                //unsuccessfull
                console.log("data not saved in databases")
                reject("network issue")
               }
            },5000
        )
    }
)

promiseOne.then(
    (result)=>{
        console.log(result)
        console.log("upload complete")
    }
).catch(
    (err)=>{
        console.log(err)
        console.log("upload failed")
    }
)