import {Category} from "./Category";
import {BaseModel} from "./BaseModel";

export interface Genre extends BaseModel {
    name: string
    categories: Category[]
}