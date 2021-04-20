(function ($, Drupal, window, document, undefined) {

// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.aaah = {
  attach: function(context, settings) {

    this.$context = $(context);
    if (context === document) {
      // Stuff to init on page load
      $(window).on('resize', this.windowResized.bind(this));
      this.menuBoot();
      this.cardABoot();
    }

  },
  cardABoot: function() {
    this.$context.find('article.card-a').on('click', function(e) {
      window.location.href = $(this).find('h1 a')[0].href;
    }).css({cursor:'pointer'});
  },

  menuBoot: function() {
    var $body = $('body');
    this.$menu_button = $('<a id="header__menu-toggle">Menu</a>').on('click', function() {
      $body.toggleClass('menu--show');
    });
    // The class is on the <body> originally to stop mobile rendering being a mess.
    $('body').removeClass('is-mobile');
    this.topLinks = document.querySelector('ul.top-links');
    this.menuBlock = document.querySelector('#block-menu-menu-main-menu-2021>div.content');
    this.windowResized();
  },
  windowResized: function() {
    var $body = $('body');
    if (window.matchMedia("(max-width: 767px)").matches) {
      if (!$body.hasClass('is-mobile')) {
        // Switch mobile view.
        $body.addClass('is-mobile');
        // Move the top links into the menu thing.
        this.menuBlock.insertAdjacentElement('afterbegin', this.topLinks);
        $('#site-header').append(this.$menu_button);

      }
    }
    else {
      if ($body.hasClass('is-mobile')) {
        // No (longer) mobile.
        $body.removeClass('is-mobile', 'show-menu');
        // Put the top links back.
        document.querySelector('.header-logo-div').insertAdjacentElement('afterend', this.topLinks);
        this.$menu_button.detach();
      }
    }
  },
};


})(jQuery, Drupal, window, window.document);

