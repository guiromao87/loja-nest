import { Injectable } from "@nestjs/common";
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
}