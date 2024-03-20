const SituacionImpositiva = {
    RESPONSABLE_INSCRIPTO: { valor: 1, descripcion: "Responsable Inscripto" },
    MONOTRIBUTO: { valor: 2, descripcion: "Monotributo" },
    EXENTO: { valor: 3, descripcion: "Exento" },
    NO_RESPONSABLE: { valor: 4, descripcion: "No Responsable" },
    CONSUMIDOR_FINAL: { valor: 5, descripcion: "Consumidor Final" },
    OTRO: { valor: 6, descripcion: "Otro", activo: false },
    IVASUJETOEXENTO: { valor: 7, descripcion: "Iva Sujeto Exento" },
    SUJETONOCATEGORIZADO: { valor: 8, descripcion: "Sujeto No Categorizado" },
    PROVEEDORDELEXTERIOR: { valor: 9, descripcion: "Proveedor del Exterior" },
    CLIENTEDELEXTERIOR: { valor: 10, descripcion: "Cliente del Exterior" },
    IVANOALCANZADO: { valor: 11, descripcion: "Iva No Alcanzado" },
    IVALIBERADO: { valor: 12, descripcion: "Iva Liberado - Ley Nº 19.640" },
    MONOTRIBUTOSOCIAL: { valor: 13, descripcion: "Monotributo Social" },
    MONOTRIBUTOTRABAJADORINDEPENDIENTE: { valor: 14, descripcion: "Monotributo Trabajador Independiente Promovido" }
  };
  
  export default SituacionImpositiva;