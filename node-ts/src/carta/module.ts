"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as carta from "./carta.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/carta")
    // .put(passport.authenticate("jwt", { session: false }), carta.validateUpdate, carta.update);
    .post(passport.authenticate("jwt", { session: false }), carta.update);

    app
    .route("/carta/:cartaId")
    // .get(carta.read)
    .get(passport.authenticate("jwt", { session: false }), carta.findByID, carta.read)
    // .put(passport.authenticate("jwt", { session: false }), carta.findByID, carta.validateOwner, carta.validateUpdate, carta.update)
    .put(passport.authenticate("jwt", { session: false }),  carta.findByID, carta.edit)
    .delete(passport.authenticate("jwt", { session: false }), carta.findByID, carta.validateOwner, carta.remove);
}
