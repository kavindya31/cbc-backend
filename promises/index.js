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
//const Products = await getAllProducts("kavindya",22)
//console.log(Products)

async function retrieveProducts(){
    try{
    const products = await getAllProducts("kaviii",23)
    console.log(products)
    console.log("product fetch successfully")
}catch{
    console.log(err)
    console.log("product fetch failed")
}}

retrieveProducts()