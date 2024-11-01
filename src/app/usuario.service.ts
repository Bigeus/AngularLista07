import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlDatabase: string = 'http://localhost:3000/usuario';
  private usuarioAtual: any = null;

  constructor() {}

  // Define o usuário atual consultando o backend pelo ID
  async setUsuarioAtual(id: number) {
    const response = await fetch(`${this.urlDatabase}`);
    const data = await response.json();
    const usuario = data[0]
    this.usuarioAtual = usuario;
  }
  getUsuario() {
    return this.usuarioAtual;
  }
}
