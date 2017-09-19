<?php

function aaah_preprocess_html(&$variables) {
  $variables['html_attributes'] = '';
}
function aaah_preprocess_page(&$variables) {
  drupal_add_js('https://unpkg.com/vue', ['type' => 'external']);
}
function aaah_preprocess_node(&$variables) {
  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);
}
