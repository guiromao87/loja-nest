import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRequestDTO } from "./dto/UsuarioRequest.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";
import { v4 as uuid} from 'uuid';

@Controller('usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post() 
    async cria(@Body() usuarioRequestDTO: UsuarioRequestDTO) {
        const usuario = new Usuario();
        usuario.id = uuid();
        usuario.nome = usuarioRequestDTO.nome;
        usuario.email = usuarioRequestDTO.email;
        usuario.senha = usuarioRequestDTO.senha;    


        this.usuarioRepository.salva(usuario);
        return {id: usuario.id, mensagem: 'Usuario criado com sucesso'};
    }

    @Get()
    async lista() {
        return this.usuarioRepository.lista();
    }
}