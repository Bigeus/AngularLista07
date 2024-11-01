import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  usuarioAtual: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.setUsuarioAtual(1).then(() => {
      this.usuarioAtual = this.usuarioService.getUsuario();
    });
  }
}
