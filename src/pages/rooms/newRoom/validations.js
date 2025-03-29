import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("El nombre es obligatorio"),
  capacity: Yup.number()
    .min(2, "La capacidad debe ser al menos 2")
    .max(100, "Máximo 100 jugadores")
    .required("La capacidad es obligatoria"),
  userIds: Yup.array()
    .min(2, "Debe seleccionar al menos dos usuarios")
    .required("Debe seleccionar usuarios"),
});


