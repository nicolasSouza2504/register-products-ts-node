import CategoryEnum, {Categories} from "../enums/category-enum.js";

class ProductDto {

    private _id: number;
    private _code: string;
    private _brand: string;
    private _model: string;
    private _capacity: number;
    private _price: number;
    private _category: CategoryEnum;

    constructor(id: number, code: string, brand: string, model: string, capacity: number, price: number, category: Categories) {
        this._id = id;
        this._code = code;
        this._brand = brand;
        this._model = model;
        this._capacity = capacity;
        this._price = price;
        this._category = category;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }

    get brand(): string {
        return this._brand;
    }

    set brand(value: string) {
        this._brand = value;
    }

    get model(): string {
        return this._model;
    }

    set model(value: string) {
        this._model = value;
    }

    get capacity(): number {
        return this._capacity;
    }

    set capacity(value: number) {
        this._capacity = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get category(): Categories {
        return this._category;
    }

    set category(value: Categories) {
        this._category = value;
    }
}

export default ProductDto;
