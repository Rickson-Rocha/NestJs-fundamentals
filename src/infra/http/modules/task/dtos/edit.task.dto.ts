import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string
    @IsString()
    @IsOptional()
    description: string
}