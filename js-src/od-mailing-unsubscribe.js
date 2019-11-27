(($) => $(() => {
  $('.messages.status:contains("Are you sure you want to be removed")').remove();
  const $success = $('.messages.status:contains("has been successfully unsubscribed")');
  if ($success.length) {
    $('body').addClass('od-unsubscribe-successful');
    $('#page-title').text('Unsubscribed.');
  }
}))(jQuery);
