import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlDatabase: string = 'http://localhost:3000/cliente';

  constructor() {}

  // a. Mostra todos os clientes do banco de dados
  async getClientes() {
    return await fetch(this.urlDatabase).then(res => res.json());
  }

  // b. Retorna o cliente pelo ID
  async getCliente(id: number) {
    return await fetch(`${this.urlDatabase}/${id}`).then(res => res.json());
  }

  // c. Grava um novo cliente no banco de dados
  async setCliente(cliente: any) {
    return await fetch(this.urlDatabase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    }).then(res => res.json());
  }

  // d. Atualiza um cliente existente
  async atualizaCliente(cliente: any) {
    return await fetch(`${this.urlDatabase}/${cliente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    }).then(res => res.json());
  }

  // e. Exclui um cliente pelo ID
  async excluiCliente(id: number) {
    return await fetch(`${this.urlDatabase}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
  }
}
