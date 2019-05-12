import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonaService } from './../../../_service/persona.service';
import { Persona } from 'src/app/_model/persona';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  persona: Persona;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.persona = new Persona();

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl(''),
      'apellidos' : new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id' : new FormControl(data.idPersona),
          'nombres' : new FormControl(data.nombres),
          'apellidos' : new FormControl(data.apellidos)
        });
      });
    }
  }

  operar() {
    this.persona.idPersona = this.form.value['id'];
    this.persona.nombres = this.form.value['nombres'];
    this.persona.apellidos = this.form.value['apellidos'];

    if (this.edicion) {
      this.personaService.modificar(this.persona).subscribe(() => {
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se modificó');
        });
      });
    } else {
      this.personaService.registrar(this.persona).subscribe(() => {
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se registró');
        });
      });
    }

    this.router.navigate(['persona']);
  }

}
