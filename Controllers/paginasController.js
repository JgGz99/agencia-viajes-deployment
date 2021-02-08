import {
    Viaje
} from '../Models/Viaje.js';

import {Testimonial} from '../Models/Testimoniales.js';
 
const paginaInicio = async(req, res) => { //req la peticion y response es la respuesta del servidor
    
    //consultar 3 viajes del modelo viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

  try {
      const resultado = await Promise.all(promiseDB);
    res.render('inicio', {
        pagina: 'Inicio',
        clase:'home',
        viajes:resultado[0],
        testimoniales:resultado[1]
    });
  } catch (error) {
      console.log(error);
  }
};

const paginaNosotros = (req, res) => { //req la peticion y response es la respuesta del servidor   
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { //req la peticion y response es la respuesta del servidor   

    //Consultar la BD
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => { //req la peticion y response es la respuesta del servidor   
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su Slug

const paginaDetalleViaje = async (req, res) => {
    const {
        slug
    } = req.params;


    try {
        const viaje = await Viaje.findOne({
            where: {
              slug
            }
        });

        res.render('viaje',{
            pagina:'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}




export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}