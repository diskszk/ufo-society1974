import { OmitType } from "@nestjs/swagger";
import { User } from "./user.entity";

export class CreateUserDTO extends OmitType(User, [] as const) {}

export class UpdateUserDTO extends OmitType(User, [] as const) {}
