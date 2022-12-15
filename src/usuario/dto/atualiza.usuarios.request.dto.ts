import { IsNotEmpty, IsEmail, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validator/email-unico.validator";

export class AtualizaUsuarioRequestDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;
    
    @IsEmail(undefined, { message: 'Email inválido'})
    @EmailUnico({message: 'Email já está cadastrado'})
    @IsOptional()
    email: string;

    @MinLength(6, {message: 'Senha precisa ter pelo menos 6 caracteres'})
    @IsOptional()
    senha: string;
}