import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRequestDTO } from "./dto/usuario.request.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";
import { v4 as uuid} from 'uuid';
import { UsuarioResponseDTO } from "./dto/usuario.response.dto";
import { AtualizaUsuarioRequestDTO } from "./dto/atualiza.usuarios.request.dto";

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
        const usuarios = await this.usuarioRepository.lista();
        const usuariosDTO = usuarios.map(
            usuario => new UsuarioResponseDTO(
                usuario.id,
                usuario.nome
            )
        )

        return usuariosDTO;
    }

    @Put('/:id')
    async atualiza(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioRequestDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
        return new UsuarioResponseDTO(usuarioAtualizado.id, usuarioAtualizado.nome);
    }

    @Delete('/:id')
    async deleta(@Param('id') id: string) {
        const usuarioDeletado = await this.usuarioRepository.deleta(id);
        return {mensagem: 'Usuário deletado', usuario: new UsuarioResponseDTO(usuarioDeletado.id, usuarioDeletado.nome)};
    }
}