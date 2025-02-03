import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    email: string

    @MinLength(6, { message: 'Minimum password length is 6 symbols' })
    password: string
}
