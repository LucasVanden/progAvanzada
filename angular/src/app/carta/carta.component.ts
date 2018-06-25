import { Component, OnInit, Input, Output } from "@angular/core";
import { Carta, CartaService } from "./carta.service";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { ActivatedRoute, Router } from "@angular/router";
import{ MascotaComponent } from "../mascota/mascota.component";
import { Mascota, MascotaService } from "../mascota/mascota.service";
import * as esLocale from "date-fns/locale/es";


@Component({
  selector: "app-carta",
  templateUrl: "./carta.component.html"
})
export class CartaComponent implements OnInit {
  carta: Carta;
  mascotas: Mascota [];
  mascota: Mascota;
  // idmascota: string = "1";
  arLocale = esLocale;
  flag: boolean;
  flag2: boolean;

  // @Input( "cuack" ) mas: Mascota[];


constructor(
private cartaService: CartaService,
private route: ActivatedRoute,
private router: Router,
private mascotasService: MascotaService,
      ) {
this.carta = {
  idmascota: "",
  raza: "",
  color: "",
  user: "",
  desparasitacion: [{
    fecha : new Date(2018, 1, 1),
    vacuna : "desparasitacion",
    //  debevolver: new Date(this.carta.desparasitacion[0].fecha.getTime() + (91 * 1000 * 60 * 60 * 24)),
     debevolver: new Date(2018, 1, 1),
  }],
  parvo: [{
    fecha : new Date(2018, 1, 1),
    vacuna : "parvo virus",
    // debevolver: new Date(this.carta.parvo[0].fecha.getTime() + (21 * 1000 * 60 * 60 * 24)),
    debevolver: new Date(2018, 1, 1),
  }],
  antirarabica: [{
    fecha : new Date(2018, 1, 1),
    vacuna : "antirabica",
    debevolver: new Date(2018, 1, ),
    // debevolver: new Date(this.carta.antirarabica[0].fecha.getTime() + (365 * 1000 * 60 * 60 * 24)),
  }],
};
}

ngOnInit() {
  this.mascotasService
    .buscarMascotas()
    .then(mascotas => (this.mascotas = mascotas));
}
// presubitForm() {
//   this.carta.desparasitacion[0].fecha = this.fecha1;
// }
submitForm() {
  this.cartaService
        .guardarcarta(this.carta)
        .then(carta => this.router.navigate(["/carta"]));
    }

BuscarCartaMascota() {
     this.cartaService
        .buscarCarta(this.carta.idmascota)
        // .then(carta => this.router.navigate(["/carta"]));
        .then(carta => (this.carta = carta));
         this.flag2 = true;
         this.flag = false;
    }
    onDelete() {
      // errorHandler.cleanRestValidations(this);
      this.cartaService
        .eliminarCarta(this.carta.idmascota)
        // .then(any => this.router.navigate(["/carta"]))
        ;
        this.flag = false;
        this.flag2 = false;
        this.carta.color = "";
        this.carta.raza = "";
        // this.carta.desparasitacion = undefined;
        // .catch(error => errorHandler.procesarValidacionesRest(this, error));
    }
    editarCarta() {
      this.cartaService
            .editCarta(this.carta.idmascota, this.carta)
            // .then(carta => this.router.navigate(["/carta"]))
            ;
        }

        buscarMascotaID() {
       this.mascotasService.buscarMascota(this.carta.idmascota).then(mascotas => (this.mascota = mascotas));
        }

        edit() {
          this.flag = true;
        }
  }