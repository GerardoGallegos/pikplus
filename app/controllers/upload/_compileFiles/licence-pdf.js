'use strict'

const PDFDocument = require('pdfkit'),
      Promise = require('bluebird'),
      fs = require('fs');



module.exports = function (proyectName, savePath, imgSmall) {

//console.log(proyectName, savePath, imgSmall)


return new Promise((done, reject) => {
  
  let doc = new PDFDocument(),
      stream = doc.pipe(fs.createWriteStream(savePath + 'LICENCE.pdf')),
      licenceImg = 'static/licence.png';


  doc.image(licenceImg, 60, 20, {width: 100})

  doc.fontSize(30)
     .fillColor('#393939')
     .text('LICENCIA', 400, 130)

  doc.fontSize(10)
     .fillColor('#393939')
     .text('Estandar | Con atribucion', 400, 160)   


  // and some justified text wrapped into columns
  doc.moveDown()
     .fontSize(12)
     .text('Puedes usar este trabajo \"ver detalles de trabajo\" Para tus trabajos y proyectos, puedes editarlo y usarlo como recurso grafico, tambien pudes distribuirlo tal cual pero deberas incluir la copia de esta licencia, con esta licencia tienes autorizado el uso Personal o Comercial Solo deberas darnos credito, asi en pikplus nos ayudas y podemos ofrecerte imagenes, vectores increibles y diseños nuevos todos los dias con descarga gratuita.', 100, 190, {
       width: 440,
       align: 'justify',
       indent: 30,
       columns: 1,
       height: 400,
       ellipsis: true
     });




  doc.lineJoin('round')
     .rect(150, 290, 350, 120)
     //.dash(5, {space: 10})
     .strokeColor('#BABABA')
     .stroke()
     
  doc.moveDown()
     .fontSize(16)
     .text('En Sitios Web', 160, 300)
     .fontSize(13)
     .text('Agregar este codigo:', 270, 301)


  doc.moveDown()
     .fontSize(10)
     .fillColor('#304F04')
     .text('<a href=”https://pikplus.com”>Diseñado por pikplus</a>', 180, 325);  


  doc.moveDown()
     .fontSize(16)
     .fillColor('#393939')
     .text('En trabajos Impresos', 160, 360)
     .fontSize(13)
     .text('Agregar en agradecimientos:', 315, 361)


  doc.moveDown()
     .fontSize(10)
     .fillColor('#304F04')
     .text(`“Imagen ${proyectName} Diseñada por Pikplus.com”`, 180, 385); 



  doc.moveDown()
     .fontSize(18)
     .fillColor('#000000')
     .text('No quieres darnos Atribucion?', 160, 440);



  doc.moveDown()
     .fontSize(12)
     .fillColor('#393939')
     .text('Claro solo debes adquirir una suscripcion y podras tener acceso a miles de imagenes y vectores con licencia Extendida | sin atribucion, todo por solo $9/Mes', 100, 470, {
       width: 440,
       align: 'justify',
       indent: 30,
       columns: 1,
       height: 400,
       ellipsis: true
     });


  doc.moveDown()
     .fontSize(12)
     .fillColor('#393939')
     .text(`
  Sin dar atribucion/credito a pikplus
  Libre de regalias
  Cancela en cualquier momento
      `, 100, 510, {
       width: 440,
       align: 'right',
      });   

  doc.moveDown()
     .fontSize(12)
     .fillColor('#054A75')
     .text(`Obtener suscripcion con descuento`, 100,610, {
       width: 440,
       align: 'right',
       link : 'http://pikplus.com/premium',
       underline: true
      });   

  doc.moveDown()
     .fontSize(12)
     .fillColor('#393939')
     .text(`
  Detalles de trabajo
  Nombre: ${proyectName}
  ID: 054646554
      `, 120, 630, {
       width: 200,
       align: 'rigth',
      });  

  doc.moveDown()
     .fontSize(12)
     .fillColor('#393939')
     .text(`Si tienes suscripcion puedes descargar la licencia desde aqui`, 200, 630, {
       width: 200,
       align: 'rigth',
      });    


  doc.image(imgSmall, 60, 630, {width: 50})

  /*doc.path('M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064 c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31 c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925 C415.582,102.628,414.103,99.059,411.47,96.426z')
     .stroke()*/

  // end and display the document in the iframe to the right
  doc.end();
  stream.on('error', (err) => {
    console.log(err)
  })
  stream.on('finish', function() {
    console.log('FINISH PDF CRATED SUCCESSFULLY');
    done()
  });


})
}