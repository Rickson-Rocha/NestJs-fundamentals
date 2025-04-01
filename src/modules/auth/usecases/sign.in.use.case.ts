import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { UserPayload } from "../models/user.payload";
import { JwtService } from "@nestjs/jwt";
interface SignInRequest {
    user: UserEntity
}
@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService) { }
    async execute({ user }: SignInRequest) {
        console.log("use case signin")
        const payload: UserPayload = {
            sub: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt().toJSON()
        }
        const jwtToken = this.jwtService.sign(payload)
        console.log(jwtToken)
        return jwtToken;
    };
}