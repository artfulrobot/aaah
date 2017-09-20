<?php

function aaah_preprocess_html(&$variables) {
  $variables['html_attributes'] = '';
}
function aaah_preprocess_page(&$variables) {
  drupal_add_js('https://unpkg.com/vue', ['type' => 'external']);
  drupal_add_js(drupal_get_path('theme', 'aaah') . '/js/vendor/waypoints/lib/noframework.waypoints.min.js');
}
function aaah_preprocess_node(&$variables) {
  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);
}
