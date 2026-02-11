const CakeSchema = require("./cake.schema");

const getAllCakes = async (page, pageSize) => {
  const cakes = await CakeSchema
    .find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  const totalCakes = await CakeSchema.countDocuments();
  const totalPages = Math.ceil(totalCakes / pageSize);
  return {
    cakes,
    page,
    pageSize,
    totalCakes,
    totalPages,
  };
};
const cakeId= async(id)=>{
  const cake= await CakeSchema.findById(id)
  return cake
}
const createCake= async(body)=>{
  const newCake= new CakeSchema(body)
  return await newCake.save()
}

const modifyCake= async(idCake,body)=>{
  return CakeSchema.findByIdAndUpdate(idCake,body,{new:true})
}

const deleteCake= async(idCake)=>{
  return CakeSchema.findByIdAndDelete(idCake)
}
module.exports = {
  getAllCakes,
  createCake,
  modifyCake,
  deleteCake,
  cakeId
};
