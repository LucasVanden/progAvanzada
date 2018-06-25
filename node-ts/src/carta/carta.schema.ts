import * as mongoose from "mongoose";

export interface ICarta extends mongoose.Document {
  updated: Number;
  enabled: Boolean;
  idmascota: mongoose.Schema.Types.ObjectId;
  raza: string;
  color: string;
  user: mongoose.Schema.Types.ObjectId;
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
export let CartaSchema = new mongoose.Schema({
    idmascota: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      trim: true,
    //   required: "Nombre es requerido"
    },
    raza: {
      type: String,
      default: "",
      trim: true
    },
    color: {
        type: String,
        default: "",
        trim: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "Usuario es requerido"
      },
    updated: {
        type: Date,
        default: Date.now()
      },
      enabled: {
        type: Boolean,
        default: true
      },
      desparasitacion: [{
        fecha: "",
        vacuna: "",
        debevolver: "",
      }],
      parvo: [{
        fecha: "",
        vacuna: "",
        debevolver: "",
      }],
      antirarabica: [{
        fecha: "",
        vacuna: "",
        debevolver: "",
      }],
    }, { collection: "cartas" });

    CartaSchema.pre("save", function (this: ICarta, next) {
        this.updated = Date.now();

        next();
      });

      export let Carta = mongoose.model<ICarta>("Carta", CartaSchema);