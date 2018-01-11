<?php

function aaah_preprocess_html(&$variables) {
  $variables['html_attributes'] = '';
}
function aaah_preprocess_page(&$variables) {
  if (!isset($variables['page']['content']['#attached']['css']['fonts'])) {
    // Allow subthemes to set this and for us to not override it (as this
    // function is called after a subtheme's).
    $variables['page']['content']['#attached']['css']['fonts'] = [
      'data' => 'https://fonts.googleapis.com/css?family=Oswald:300',
      'type' => 'external',
    ];
  }
  $variables['hideSidebar'] = !empty($_COOKIE['hideSidebar']) ? ' sidebar-closed' : '';
}
function aaah_preprocess_node(&$variables) {
  $variables['content']['#attached']['js']['https://unpkg.com/vue']  = ['type' => 'external'];
  $variables['content']['#attached']['js'][drupal_get_path('theme', 'aaah') . '/js/vendor/waypoints/lib/noframework.waypoints.min.js'] = [];
  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);
}
