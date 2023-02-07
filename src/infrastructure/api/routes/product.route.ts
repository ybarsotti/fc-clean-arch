import express, {Request, Response} from "express";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
   const usecase = new CreateProductUsecase(new ProductRepository());
   const { body } = req;
   try {
       const productDto = {
           type: body.type,
           name: body.name,
           price: body.price,
       }
       const output = await usecase.execute(productDto)
       res.status(200).send(output)
   } catch (e) {
       res.status(500).send(e);
   }
});


productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUsecase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        console.log(output);
        res.status(200).send(output);
    }catch (e) {
        res.status(500).send(e)
    }
})
