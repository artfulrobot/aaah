<?php

function aaah_preprocess_page(&$variables) {
  // Commented for oD:
  // if (!isset($variables['page']['content']['#attached']['css']['fonts'])) {
  //   // Allow subthemes to set this and for us to not override it (as this
  //   // function is called after a subtheme's).
  //   $variables['page']['content']['#attached']['css']['fonts'] = [
  //     'data' => 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap',
  //     'type' => 'external',
  //   ];
  // }
  $aaah_path = drupal_get_path('theme', 'aaah');

  $variables['page']['content']['#attached']['css']['theme'] = [
    'data' => $aaah_path . "/css/page.css",
    'weight' => 999,
  ];
  $variables['page']['content']['#attached']['css']['aaah_local'] = [
    'data' => $aaah_path . "/css/aaah-local.css",
    'weight' => 1001,
  ];

  $variables['hideSidebar'] = !empty($_COOKIE['hideSidebar']) ? ' sidebar-closed' : '';

}
