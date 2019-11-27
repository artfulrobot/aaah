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

  $variables['page']['content']['#attached']['css']['theme'] = [
    'data' => $aaah_path . "/css/page.css",
    'weight' => 999,
  ];

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

  // oD custom stuff {{{
  $path = request_path();
  if ($path === 'civicrm/mailing/unsubscribe') {
    $variables['page']['content']['#attached']['js'][] =
      drupal_get_path('theme', 'aaah') . '/js/od-mailing-unsubscribe.js';
  }
  elseif ($path === '') {
    // We don't have a homepage, redirect people to the website.
    drupal_goto('https://opendemocracy.net');
  }
  // }}}
}
function aaah_preprocess_node(&$variables) {
  $variables['content']['#attached']['js']['https://unpkg.com/vue']  = ['type' => 'external'];
  $variables['content']['#attached']['js'][drupal_get_path('theme', 'aaah') . '/js/vendor/waypoints/lib/noframework.waypoints.min.js'] = [];
  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);
}
function aaah_css_alter(&$css) {
  $path = request_path();
  if ($path === 'civicrm/mailing/unsubscribe') {

    // Remove all CiviCRM css!
    foreach ($css as $key=>$details) {
      if (preg_match('@/civicrm/css/|/civicrm_extensions/@', $key)) {
        unset($css[$key]);
      }
    }
  }
}
