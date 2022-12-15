import { Injectable } from "@nestjs/common";
import { AtualizaUsuarioRequestDTO } from "./dto/atualiza.usuarios.request.dto";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    
    private usuarios: Usuario[] = [];

    async salva(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    async lista() {
        return this.usuarios;
    }

    async verifica(email) {
        const usuarioCadastrado = this.usuarios.find(
            usuario => usuario.email === email
        );
        
        return usuarioCadastrado !== undefined;
    }

    async atualiza(id: string, dadosParciais: Partial<Usuario>) {
        const possivelUsuario = this.buscaPor(id);

        Object.entries(dadosParciais).forEach(([chave, valor]) => {
            if(chave === 'id') return;

            possivelUsuario[chave] = valor;
        })

        return possivelUsuario;
    }

    async deleta(id: string) {
        const possivelUsuario = this.buscaPor(id);
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        
        return possivelUsuario;
    }

    private buscaPor(id) {
        const possivelUsuario = this.usuarios.find(usuarioSalvo => usuarioSalvo.id === id)

        if(!possivelUsuario) 
            throw new Error('Usuário não existe');

        return possivelUsuario;
    }
}