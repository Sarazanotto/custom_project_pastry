const cakeService = require("./cake.service");

const getCakes = async (req, res, next) => {
  try {
    const { page = 2, pageSize = 20 } = req.query;
    const { totalPages, totalCakes, cakes } = await cakeService.getAllCakes(
      page,
      pageSize,
    );
    if (cakes.length === 0) {
      throw new Error('not cake found');
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

module.exports = {
  getCakes,
  create,
  upload,
  modify,
  deleteOne,
};
