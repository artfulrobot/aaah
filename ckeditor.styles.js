// This does not seem to get loaded.
/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
console.warning("XXXX aaah/ckeditor.styles.js loading");
if(typeof(CKEDITOR) !== 'undefined') {
  CKEDITOR.addStylesSet( 'drupal',
    [
      { name : 'Paragraph'		, element : 'p' },
      { name : 'Heading 1'		, element : 'h1' },
      { name : 'Heading 2'		, element : 'h2' },
      { name : 'Heading 3'		, element : 'h3' },
      { name : 'Heading 4'		, element : 'h4' },
      { name : 'Heading 5'		, element : 'h5' },
      { name : 'Heading 6'		, element : 'h6' },
      { name : 'Preformatted Text', element : 'pre' },
      { name : 'Info Box'     , element: 'div', attributes: { 'class': 'box box--info'} },
      { name : 'Warning Box'  , element: 'div', attributes: { 'class': 'box box--warning'} },
      { name : 'Computer Code'	, element : 'code' }
  ]);
}
