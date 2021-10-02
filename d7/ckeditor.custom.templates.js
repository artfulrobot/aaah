CKEDITOR.addTemplates( 'default',
  {
    imagesPath: CKEDITOR_BASEPATH + '../../themes/boson/ckeditor-tpl/' ,
    templates :
    [
      {
        title: 'Warning Box',
        image: '',
        description: 'Simple warning box',
        html: '<div class="box box--warning"><h1>Question</h1><p></p></div>'
      },
      {
        title: 'Info Box',
        image: '',
        description: 'Simple info box',
        html: '<div class="box box--info"><h1>Info</h1><p></p></div>'
      },
      {
        title: 'Image Container',
        image: '',
        description: 'Presents images nicely.',
        html: '<div class="image-container"><div class="image-caption"><p>Caption</p></div><div class="image-wrapper"><img src="/sites/all/themes/aaah/image-placeholder.svg"/></div></div>'
      }
    ]
  }
);
