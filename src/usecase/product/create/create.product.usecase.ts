import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUsecase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {
    }

    async execute({name, price, type}: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(type, name, price);
        await this.productRepository.create(product)
        return {
            id: product.id,
            name, price
        }
    }
}
