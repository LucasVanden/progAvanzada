"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { ICarta, Carta } from "./carta.schema";
import { ObjectId } from "bson";

/**
 * Retorna los datos de la mascota
 */
export interface IReadRequest extends IUserSessionRequest {
  carta: ICarta;
}

  export function read(req: IReadRequest, res: express.Response) {
    if (!req.carta) {
      return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se encuentra la carta.");
    }
    res.json(req.carta);
  }


export interface IUpdateRequest extends IUserSessionRequest {
  carta: ICarta;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.dni) {
    req.check("dni", "Hasta 256 caracteres solamente.").isLength({ max: 256 });
    req.sanitize("dni").escape();
  }
  if (req.body.superdni) {
    req.check("superdni", "Hasta 1024 caracteres solamente.").isLength({ max: 1024 });
    req.sanitize("supredni").escape();
  }

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let carta = req.carta;
  if (!carta) {
    carta = new Carta();
    carta.user = req.user._id;
    // carta.idmascota = req.carta.idmascota;
  }
  if (req.body.idmascota) {
    carta.idmascota = req.body.idmascota;
  }
  if (req.body.desparasitacion) {
    carta.desparasitacion = req.body.desparasitacion;
  }
  if (req.body.parvo) {
    carta.parvo = req.body.parvo;
  }
  if (req.body.antirarabica) {
    carta.antirarabica = req.body.antirarabica;
  }
  if (req.body.color) {
    carta.color = req.body.color;
  }
  if (req.body.raza) {
    carta.raza = req.body.raza;
  }

  carta.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(carta);
  });
}

export function edit(req: IUpdateRequest, res: express.Response) {
  let carta = req.carta;
  if (!carta) {
    carta = new Carta();
    carta.user = req.user._id;
    // carta.idmascota = req.carta.idmascota;
  }
  if (req.body.desparasitacion[0]) {
     carta.desparasitacion.push(req.body.desparasitacion[0]) ;
  }
  if (req.body.parvo) {
    carta.parvo = req.body.parvo;
  }
  if (req.body.antirarabica) {
    carta.antirarabica = req.body.antirarabica;
    //  carta.antirarabica["0"].debevolver.setDate( req.body.antirarabica[0].fecha + 3);
    //  (365 * 1000 * 60 * 60 * 24));
  }
  if (req.body.color) {
    carta.color = req.body.color;
  }
  if (req.body.raza) {
    carta.raza = req.body.raza;
  }
  // const cuack = carta.desparasitacion.push(req.body.desparasitacion[0]) ;
  const find = {
    idmascota : req.params.cartaId,
    enabled: true};
    // const edit = {
    // "desparasitacion": cuack ,
    // };
const edit = {
"raza": carta.raza,
"color": carta.color,
 "desparasitacion": req.body.desparasitacion["0"] ,
// "desparasitacion":  req.body.desparasitacion.push(req.body.desparasitacion["0"]) ,
"parvo": req.body.parvo["0"] ,
"antirarabica": carta.antirarabica["0"] ,
};


  Carta.findOneAndUpdate(find, edit , function(err) {
    if (err) return errorHandler.handleError(res, err);
    return res.json(carta);
  });

  // carta.save(function (err: any) {
  //   if (err) return errorHandler.handleError(res, err);

  //   res.json(carta);
  // });
}
export interface IRemoveRequest extends IUserSessionRequest {
    carta: ICarta;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const carta = <ICarta>req.carta;

  carta.enabled = false;
  carta.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}


export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  Carta.find({
    idmascota: req.user._id,
    enabled: true
  }).exec(function (err, cartas) {
    if (err) return next();
    res.json(cartas);
  });
}


export interface IFindByIdRequest extends express.Request {
    carta: ICarta;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.cartaId;

  Carta.findOne({
    // idmascota: "5b1dbe679eed682330df74e2" ,
    idmascota: id,
    enabled: true
  },
    function (err, carta) {
      if (err || !carta) return next();

      req.carta = carta;
      next();
    });
}

//   Carta.find({
//     // idmascota: "ObjectId('5b1b49f9848db1275c7c7206')",
//     raza: "mugi",
//     enabled: true
//   }).exec(function (err, carta) {
//     if (err) return next();
//     res.json(carta);
//     next;

// } );
// }

/**
 * Autorización, el único que puede modificar el mascota es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
    carta: ICarta;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
   if (!((req.carta.user as any).equals(req.user._id))) {
     return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
   }
  next();
}
