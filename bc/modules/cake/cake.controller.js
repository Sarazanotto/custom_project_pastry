const cakeService = require("./cake.service");

const getCakes = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { totalPages, totalCakes, cakes } = await cakeService.getAllCakes(
      page,
      pageSize,
    );
    if (cakes.length === 0) {
      throw new Error('There is not cakes');
    }
    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Number(totalPages),
      totalCakes: Number(totalCakes),
      cakes,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newCake = await cakeService.createCake(body);
    res.status(201).send({
      statusCode: 201,
      message: "new cake uploaded successfully",
      newCake,
    });
  } catch (error) {
    next(error);
  }
};

const upload = async (req, res, next) => {
  try {
    const img = req.file.path;
    res.status(200).json({
      img: img,
    });
  } catch (error) {
    next(error);
  }
};

const modify= async(req,res,next)=>{
  try {
    const {cakeId}=req.params
const {body}=req
const cake= await cakeService.modifyCake(cakeId,body)
res.status(200).send({
  statusCode:200,
  message: 'Successfully modified cake',
  cake
})
  } catch (error) {
    next(error)
  }
}

const deleteOne= async(req,res,next)=>{
  try {
    const {cakeId}= req.params
    const cake= await cakeService.deleteCake(cakeId)
    res.status(200).send({
      statusCode:200,
      message:'Cake deleted successfully',
      cake
    })
  } catch (error) {
    next(error)
  }
}

const getCakeId= async (req,res,next)=>{
  try {
    const {id}= req.query
   if(!id){
    return res.status(400).json({
      statusCode:400,message: 'There is not ID'    })
   }
    const cake= await cakeService.cakeId(id)
if(!cake){
  return res.status(404).json({
    statusCode:404, message:'Cake not found'
  })
}

    res.status(200).json({
      cake,
      statusCode: 200,
    });
  } catch (error) {
    next(error)
  }
}
module.exports = {
  getCakes,
  getCakeId,
  create,
  upload,
  modify,
  deleteOne,
};
