import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository {
    private usuarios = [];

    async salva(usuario) {
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
}