import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { EmailUnico } from "../validator/email-unico.validator";

export class UsuarioRequestDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;
    
    @IsEmail(undefined, { message: 'Email inválido'})
    @EmailUnico({message: 'Email já está cadastrado'})
    email: string;

    @MinLength(6, {message: 'Senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}