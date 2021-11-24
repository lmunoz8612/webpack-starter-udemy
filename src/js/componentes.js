//====================================
/*
 * Webpack JS
 */
//====================================

import '../css/componentes.css';
import imgLogo from '../assets/imgs/webpack-logo.png';

export const saludar = (nombre) => {
    console.log('Creando etiqueta H1');
    const H1 = document.createElement('h1');
    H1.innerText = `Hola ${nombre} Vicente`;
    document.body.append(H1);

    const img = document.createElement('img');
    img.src = imgLogo;
    document.body.append(img);
}