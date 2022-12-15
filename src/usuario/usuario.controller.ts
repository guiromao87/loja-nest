import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRequestDTO } from "./dto/UsuarioRequest.dto";
import { UsuarioRepository } from "./usuario.repository";

@Controller('usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async cria(@Body() usuarioRequestDTO: UsuarioRequestDTO) {
        this.usuarioRepository.salva(usuarioRequestDTO);
        return 'Usuario criado';
    }

    @Get()
    async lista() {
        return this.usuarioRepository.lista();
    }
}