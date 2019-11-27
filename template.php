<?php

function aaah_preprocess_html(&$variables) {
  if (theme_get_setting('shoreditch_enabled')) {
    $variables['classes'] = 'civicrm-shoreditch';
  }
}
function aaah_preprocess_page(&$variables) {
  if (!isset($variables['page']['content']['#attached']['css']['fonts'])) {
    // Allow subthemes to set this and for us to not override it (as this
    // function is called after a subtheme's).
    $variables['page']['content']['#attached']['css']['fonts'] = [
      'data' => 'https://fonts.googleapis.com/css?family=Lato:400,400i,700&display=swap',
      'type' => 'external',
    ];
  }
  $aaah_path = drupal_get_path('theme', 'aaah');

  if (theme_get_setting('shoreditch_enabled')) {
    $variables['page']['content']['#attached']['css']['aaah_civicrm'] = [
      'data' => $aaah_path . "/css/aaah-civicrm-shoreditch.css",
      'weight' => 1000,
    ];
  }
  else {
    $variables['page']['content']['#attached']['css']['aaah_civicrm'] = [
      'data' => $aaah_path . "/css/aaah-civicrm-no-shoreditch.css",
      'weight' => 1000,
    ];
  }

  $variables['page']['content']['#attached']['css']['aaah_local'] = [
    'data' => $aaah_path . "/css/aaah-local.css",
    'weight' => 1001,
  ];

  $variables['hideSidebar'] = !empty($_COOKIE['hideSidebar']) ? ' sidebar-closed' : '';
}
function aaah_preprocess_node(&$variables) {
  $variables['content']['#attached']['js']['https://unpkg.com/vue']  = ['type' => 'external'];
  $variables['content']['#attached']['js'][drupal_get_path('theme', 'aaah') . '/js/vendor/waypoints/lib/noframework.waypoints.min.js'] = [];
  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);
}
