import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";



@Injectable()
export class CartaService extends RestBaseService {
  private url = "/carta";
  constructor(private http: Http) {
    super(); }

guardarcarta(value: Carta): Promise<Carta> {
    return this.http
      .post(
        CartaService.serverUrl + this.url,
        JSON.stringify(value),
        this.getRestHeader()
      ) .toPromise()
      .then(response => {
        return response.json() as Carta;
      })
      .catch(this.handleError);
  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  editCarta(id: string, value: Carta): Promise<Carta> {
    return this.http
      .put(
        (CartaService.serverUrl + this.url + "/" + id),
        JSON.stringify(value),
        this.getRestHeader()
      ) .toPromise()
      .then(response => {
        return response.json() as Carta;
      })
      .catch(this.handleError);
  }

  buscarCarta(id: string): Promise<Carta> {
    return this.http
      .get(CartaService.serverUrl + this.url + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Carta;
      })
      .catch(this.handleError);
  }

  eliminarCarta(id: string): Promise<any> {
    if (id) {
      return this.http
        .delete(
          CartaService.serverUrl + this.url + "/" + id,
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return "";
        })
        .catch(this.handleError);
    }
  }
}

export interface Carta {
  idmascota: string;
  raza: string;
  color: string;
  user: string;
  desparasitacion: [{
    fecha: Date;
    vacuna: string;
    debevolver: Date;
  }];
  parvo: [{
    fecha: Date;
    vacuna: string;
    debevolver: Date;
  }];
  antirarabica: [{
    fecha: Date;
    vacuna: string;
    debevolver: Date;
  }];
 }