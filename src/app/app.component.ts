import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente-service.service';
import { UsuarioService } from './usuario.service';

interface Cliente {
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestão de Clientes';
  clientes: any[] = [];
  usuarioAtual: any;

  constructor(
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit() {
    await this.carregarClientes();
    await this.usuarioService.setUsuarioAtual(1);
    this.usuarioAtual = this.usuarioService.getUsuario();
  }

  async carregarClientes() {
    this.clientes = await this.clienteService.getClientes();
  }

  async consultarCliente(id: number) {
    const cliente = await this.clienteService.getCliente(id);
    console.log('Cliente consultado:', cliente);
  }

  async adicionarCliente() {
    try {
      // Get all input values
      const nome = (document.getElementById('formName') as HTMLInputElement).value;
      const email = (document.getElementById('formEmail') as HTMLInputElement).value;
      const cpf = (document.getElementById('formCpf') as HTMLInputElement).value;
      const rg = (document.getElementById('formRg') as HTMLInputElement).value;
      const telefone = (document.getElementById('formTel') as HTMLInputElement).value;

      // Validate if all fields are filled
      if (!nome || !email || !cpf || !rg || !telefone) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      // Create new client object
      const novoCliente: Cliente = {
        nome,
        email,
        cpf,
        rg,
        telefone
      };

      // Send to service
      const result = await this.clienteService.setCliente(novoCliente);
      console.log('Cliente adicionado:', result);

      // Clear form
      this.limparFormulario();

      // Reload client list
      await this.carregarClientes();

      // Show success message
      alert('Cliente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Erro ao adicionar cliente. Por favor, tente novamente.');
    }
  }

  private limparFormulario() {
    (document.getElementById('formName') as HTMLInputElement).value = '';
    (document.getElementById('formEmail') as HTMLInputElement).value = '';
    (document.getElementById('formCpf') as HTMLInputElement).value = '';
    (document.getElementById('formRg') as HTMLInputElement).value = '';
    (document.getElementById('formTel') as HTMLInputElement).value = '';
  }

  async atualizarCliente(id: number) {
    const clienteAtualizado = { 
      id, 
      nome: 'Cliente Atualizado', 
      rg: '987654321', 
      cpf: '10987654321', 
      email: 'cliente@atualizado.com', 
      telefone: '888888888' 
    };
    const result = await this.clienteService.atualizaCliente(clienteAtualizado);
    console.log('Cliente atualizado:', result);
  }

  async excluirCliente(id: number) {
    try {
      const result = await this.clienteService.excluiCliente(id);
      console.log('Cliente excluído:', result);
      await this.carregarClientes();
      alert('Cliente excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente. Por favor, tente novamente.');
    }
  }
}