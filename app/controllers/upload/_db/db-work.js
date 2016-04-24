'use strict'

const Promise = require('bluebird');


// @params [body] {object} req.body   |  [temp_src] {object}  | [Models] {object} 
module.exports = function (body, Models, temp_src, workData) {
  return new Promise ((done, reject) => {
    
    Models.Work.findOneAndUpdate({ _id : workData._id }, {})
    .update({
      src : {
        public : {
          es : {
            big : temp_src.public.es.big,
            medium : temp_src.public.es.medium,
            small : temp_src.public.es.small,
            micro : temp_src.public.es.micro,
            nano : temp_src.public.es.nano
          },
          en : {
            big : temp_src.public.en.big,
            medium : temp_src.public.en.medium,
            small : temp_src.public.en.small,
            micro : temp_src.public.en.micro,
            nano : temp_src.public.en.nano
          }
        },

        standard : {
          vector : temp_src.standard.vector,
          psd : temp_src.standard.psd,
          2000 : temp_src.standard['2000'],
          5000 : temp_src.standard['5000']
        },
        
        premium : {
          vector : temp_src.premium.vector,
          psd : temp_src.premium.psd,
          2000 : temp_src.premium['2000'],
          5000 : temp_src.premium['5000']
        }
      }
    })
    .exec((err, d) => {
      if(err) reject({ error : err, detail : 'Error al actualizar el Work en DB con el SRC de AWS S3'})
      done(temp_src)
    })
  })
}




