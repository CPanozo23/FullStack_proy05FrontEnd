export const inputForm_patient = [
    {
      general: [
        { name: 'RUN', type: 'text', description: 'RUN', placeholder: '12345678K', required: true,},
        { name: 'name', type: 'text', description: 'Nombre', placeholder: 'Ingrese Nombre', required: true,},
        { name: 'lastName', type: 'text', description: 'Apellido', placeholder: 'Ingrese Apellido', required: true, },
        { name: 'birthday', type: 'date', description: 'Fecha de nacimiento', placeholder: 'DD-MM-AAAA', required: true, },
        { name: 'email', type: 'email', description: 'E-mail', placeholder: 'sucorrero@correo.com', required: true, },
        { name: 'phone', type: 'phone', description: 'Teléfono', placeholder: '91234567', required: true, },

      ],
      address: [
        { name: 'street', type: 'text', description: 'Calle', placeholder: 'Ingrese nombre de calle', required: true, },
        { name: 'number_st', type: 'number', description: 'Número', placeholder: '12345', required: true, },
        { name: 'department', type: 'text', description: 'Depto/Block', placeholder: '123-A', required: false, },
      ]
    },
  ]