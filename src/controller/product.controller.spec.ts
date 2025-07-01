import ProductController from '../controller/product.controller.js';
import Product from '../model/product.js';

jest.mock('../model/product.js');

describe('Product Controller', () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('updateProduct', () => {
        it('should return 404 if product not found', async () => {
            (Product.findByPk as jest.Mock).mockResolvedValue(null);

            await ProductController.updateProduct({
                category: "FREEZER",
                brand: "BRASTEMP",
                model: "Testes",
                capacity: "123",
                price: "123",
                id: 5
            } as any, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
        });

        it('should return 200 if updated successfully', async () => {
            const mockProduct = {
                save: jest.fn().mockResolvedValue('updatedProduct')
            };
            (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

            const dto = {
                id: 1, brand: 'Test', model: 'T1', capacity: 256, price: 99.99, category: 'SSD'
            };

            await ProductController.updateProduct(dto as any, res);

            expect(mockProduct.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('updatedProduct');
        });
    });

    describe('deleteProduct', () => {
        it('should return 404 if product not found', async () => {
            (Product.findByPk as jest.Mock).mockResolvedValue(null);

            await ProductController.deleteProduct({ id: 1 }, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
        });

        it('should return 200 if deleted successfully', async () => {
            const mockProduct = {
                destroy: jest.fn().mockResolvedValue(undefined)
            };

            (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

            await ProductController.deleteProduct({ id: 1 }, res);

            expect(mockProduct.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product has been deleted!' });
        });
    });
});
