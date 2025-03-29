import { UserEntity } from "src/modules/user/entities/user.entity";

export class UserViewModel{
    static toHttpResponse(user: UserEntity){
        return{
            id: user.getId(),
            email: user.getEmail(),
            name: user.getName(),
        }
    }
}