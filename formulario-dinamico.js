fetch('parámetros.json')
    .then(respuesta => respuesta.json())
    .then(datos => crearFormulario(datos))
    .catch(error => console.error('Error al cargar los datos JSON: ', error));

function crearFormulario(datosFormulario) {
    const contenedorFormulario = document.getElementById('formularioDinamico');
    let htmlFormulario = '<form>';
    datosFormulario.formControls.forEach(control => {
        let etiqueta = `<label for="${control.id}">${control.label}</label>`;
        let htmlControl = '';

        if (control.tagName === 'select') {
            htmlControl += `<select id="${control.id}" class="${control.class}" ${control.required ? 'required' : ''}>`;
            control.options.forEach(option => {
                htmlControl += `<option value="${option}">${option}</option>`;
            });
            htmlControl += `</select>`;
        } else if (control.tagName === 'textarea') {
            htmlControl += `<textarea id="${control.id}" class="${control.class}" ${control.required ? 'required' : ''} rows="${control.rows}"></textarea>`;
        } else {
            htmlControl += `<${control.tagName} id="${control.id}" type="${control.type}" class="${control.class}"`;
            if (control.value) htmlControl += ` value="${control.value}"`;
            if (control.required) htmlControl += ' required';
            htmlControl += `>`;
        }

        htmlFormulario += `<div>${etiqueta}${htmlControl}</div>`;
    });
    htmlFormulario += '</form>';
    contenedorFormulario.innerHTML = htmlFormulario;
}

