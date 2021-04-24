import {BaseModel} from "./BaseModel";
import {CastMemberType} from "../enums/CastMemberType";

export interface CastMember extends BaseModel {
    name: string
    type: CastMemberType
}