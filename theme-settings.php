<?php

function aaah_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['theme_settings']['shoreditch_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Shoreditch theme is enabled'),
    '#default_value' => theme_get_setting('shoreditch_enabled'),
  );
}
