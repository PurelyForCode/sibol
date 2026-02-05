import { EntityId } from "../../../../lib/EntityId.js";
import { Money } from "./Money.js";
import { ProductDescription } from "./ProductDescription.js";
import { ProductName } from "./ProductName.js";
import { ProductRating } from "./ProductRating.js";
import { ProductStock } from "./ProductStock.js";
import { UnitOfMeasurement } from "./UnitOfMeasurement.js";

export class Product {
    public get stock(): ProductStock {
        return this._stock;
    }
    public set stock(value: ProductStock) {
        this._stock = value;
    }
    public get unit(): UnitOfMeasurement {
        return this._unit;
    }
    public set unit(value: UnitOfMeasurement) {
        this._unit = value;
    }
    public get deletedAt(): Date | null {
        return this._deletedAt;
    }
    public set deletedAt(value: Date | null) {
        this._deletedAt = value;
    }
    private constructor(
        private _id: EntityId,
        private _sellerId: EntityId,
        private _name: ProductName,
        private _description: ProductDescription | null,
        private _stock: ProductStock,
        private _unit: UnitOfMeasurement,
        private _pricePerUnit: Money,
        private _rating: ProductRating | null,
        private _deletedAt: Date | null,
    ) { }


    static create(
        id: EntityId,
        sellerId: EntityId,
        name: ProductName,
        description: ProductDescription | null,
        stock: ProductStock,
        unit: UnitOfMeasurement,
        pricePerUnit: Money,
        rating: ProductRating | null,
        deletedAt: Date | null
    ) {
        return new Product(id, sellerId, name, description, stock, unit, pricePerUnit, rating, deletedAt)
    }

    public get rating(): ProductRating | null {
        return this._rating;
    }
    public set rating(value: ProductRating | null) {
        this._rating = value;
    }
    public get pricePerUnit(): Money {
        return this._pricePerUnit;
    }
    public set pricePerUnit(value: Money) {
        this._pricePerUnit = value;
    }
    public get description(): ProductDescription | null {
        return this._description;
    }
    public set description(value: ProductDescription | null) {
        this._description = value;
    }
    public get name(): ProductName {
        return this._name;
    }
    public set name(value: ProductName) {
        this._name = value;
    }
    public get id(): EntityId {
        return this._id;
    }

    public get sellerId(): EntityId {
        return this._sellerId;
    }
    public set sellerId(value: EntityId) {
        this._sellerId = value;
    }
    public set id(value: EntityId) {
        this._id = value;
    }
}
