function getAllProducts(dbPassword,connectionSpeed){
    const promise = new Promise(
        (resolve,reject)=>{
            setTimeout(
                ()=>{
                    if(connectionSpeed>20){
                        if(dbPassword== "kaviii"){
                            resolve([
                                {
                                    id :1,
                                    name :"Product 1",
                                    price:1000
                                },
                                {
                                    id:2,
                                    name:"Product 2",
                                    price:2000
                                },
                                {
                                    id:3,
                                    name:"product 3",
                                    Price:3000
                                }
                            ])

                        }

                    }else{
                       reject({
                        error :"connection speed is ",
                        speed:connectionSpeed
                       })
                    }
                }
            )
        }
    )

    return promise;
}

getAllProducts("kaviii",23).then(
    (result)=>{
        console.log(result)
        console.log("product fetched successfully")
    }
).catch(
    (err)=>{
        console.log(err)
        console.log("failed to fetched products")
    }
)