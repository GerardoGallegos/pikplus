const data = {
  rootFolder: '_uploads/****/',
  folders: [
    {
      path: 'standard/****_VECTOR/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }, 
        {
          type: '.ai',
          process: '[UPLOAD_FILE]',
          name: '****.ai'
        }, 
        {
          type: '.eps',
          process: '[UPLOAD_FILE]',
          name: '****.eps'
        }, {
          type: '.pdf',
          process: '[CREATE_LICENCE:STANDARD]',
          name: 'LICENCE.pdf'
        }
      ]
    }, 
    {
      path: 'standard/****_PSD/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        },
        {
          type: '.psd',
          process: '[UPLOAD_FILE]',
          name: '****.psd'
        },
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:STANDARD]',
          name: 'LICENCE.pdf'
        },
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }
      ]
    }, 
    {
      path: 'standard/****_2000/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        },
        {
          type: '.png',
          process: '[RESIZE_IMG:2000]',
          name: '****_2000PX.png'
        },
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:STANDARD]',
          name: 'LICENCE.pdf'
        }
      ]
    }, 
    {
      path: 'standard/****_5000PX/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }, 
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:STANDARD]',
          name: 'LICENCE.pdf'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:5000]',
          name: '****_PNG5000.png'
        }
      ]
    }, 

    // PREMIUM

    {
      path: 'premium/****_VECTOR/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }, 
        {
          type: '.ai',
          process: '[UPLOAD_FILE]',
          name: '****.ai'
        }, 
        {
          type: '.eps',
          process: '[UPLOAD_FILE]',
          name: '****.eps'
        }, {
          type: '.pdf',
          process: '[CREATE_LICENCE:PREMIUM]',
          name: 'LICENCE.pdf'
        }
      ]
    }, 
    {
      path: 'premium/****_PSD/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        },
        {
          type: '.psd',
          process: '[UPLOAD_FILE]',
          name: '****.psd'
        },
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:PREMIUM]',
          name: 'LICENCE.pdf'
        },
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }
      ]
    }, 
    {
      path: 'premium/****_2000/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        },
        {
          type: '.png',
          process: '[RESIZE_IMG:2000]',
          name: '****_2000PX.png'
        },
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:PREMIUM]',
          name: 'LICENCE.pdf'
        }
      ]
    }, 
    {
      path: 'premium/****_5000/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }, 
        {
          type: '.pdf',
          process: '[CREATE_LICENCE:PREMIUM]',
          name: 'LICENCE.pdf'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:5000]',
          name: '****_5000PX.png'
        }
      ]
    },


    {
      path: 'public/',
      files: [
        {
          type: '.png',
          process: '[RESIZE_IMG:1000]',
          name: '****_big.png'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:800]',
          name: '****_medium.png'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:300]',
          name: '****_small.png'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:100]',
          name: '****_micro.png'
        }, 
        {
          type: '.png',
          process: '[RESIZE_IMG:60]',
          name: '****_nano.png'
        }
      ]
    }
  ]
}

module.exports = data;