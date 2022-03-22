<?php
function aaah_preprocess_page(&$variables) {
  global $user;

  $variables['suppress_title'] = isset($variables['node']) && $variables['node']->type === 'lawyer_supporters';

  if (!isset($variables['page']['content']['#attached']['css']['fonts'])) {
    // Allow subthemes to set this and for us to not override it (as this
    // function is called after a subtheme's).
    $variables['page']['content']['#attached']['css']['fonts'] = [
      'data' => 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap',
      'type' => 'external',
    ];
  }
  $aaah_path = drupal_get_path('theme', 'aaah');

  $variables['page']['content']['#attached']['css']['aaah_local'] = [
    'data' => $aaah_path . "/css/aaah-local.css",
    'weight' => 1001,
  ];

  // Provide login / user and logout links.
  if ($user->uid > 0) {
    // Logged in.
    $variables['page']['loginout'] = '<li><a href="/user/logout" ><i class="fa fa-sign-out"></i>
      Logout</a></li>';
    $variables['page']['userlink'] = '<li><a href="/user" ><i class="fa fa-user"></i> ' . htmlspecialchars($user->name) .  '</a></li>';
  }
  else {
    $variables['page']['loginout'] = '<li><a href="/user" ><i class="fa fa-user"></i> Login</a></li>';
  }

  // None of this bubbles up to html
  // $variables['x1'] = 1;
  // $variables['#x2'] = 1;
  // $variables['page']['x3'] = 1;
  // $variables['page']['#x4'] = 1;
}
/**
 * This is a wrapper so comes after page
 */
function aaah_preprocess_html(&$variables, $hook) {
  $variables["classes_array"][] = 'aaah-theme';
  if (!empty($GLOBAL['thisPageUsesParagraphs'])) {
    $variables["classes_array"][] = 'paragraphs-page';
  }
  else {
    $variables["classes_array"][] = 'non-paragraphs-page';
  }
}

function aaah_preprocess_node(&$variables) {

  // Why did we include Vue!!
  //$variables['content']['#attached']['js']['https://unpkg.com/vue']  = ['type' => 'external'];

  // When is this used?
  // $variables['content']['#attached']['js'][drupal_get_path('theme', 'aaah') . '/js/vendor/waypoints/lib/noframework.waypoints.min.js'] = [];

  $variables['published'] = (isset($variables['node']->status) ? $variables['node']->status == 1 : TRUE);

  $node = $variables['node'];

  // Add template suggestions based on node type.
  $variables['theme_hook_suggestions'][] = 'node__' . $node->type;
  $variables['theme_hook_suggestions'][] = 'node__' . $node->type . '_' . $variables['view_mode'];

  if (!empty($variables['field_sections'])) {
    // Hide body if we have sections
    $variables["content"]["body"] = $variables["elements"]["body"] = $variables['body'] = [];
    // This is a horrid hack to pass info to preprocess_html
    $GLOBAL['thisPageUsesParagraphs'] = 1;
  }

  /*
  switch ($variables['node']->type) {
  case 'article':
    // Published date.
    $variables['published_date_nice'] = date('j F Y', $variables['node']->created);

    if ($variables['view_mode'] == 'foo') {
      // ...
    }
    break;
  }
   */
}
function aaah_process_node(&$variables, $hook) {
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['node']->type . '__' . $variables['view_mode'];
  // what's this for?
  $variables['path_alias'] = drupal_lookup_path('alias', "node/" . $variables['node']->nid);
}
/**
 * Implements hook_preprocess_HOOK().
 *
 * Used to add certain classes to paragraph items.
 */
function aaah_preprocess_entity(&$variables, $hook) {
  if ($variables['entity_type'] == 'paragraphs_item') {
    $pp = $variables['paragraphs_item'];
    $_ = $pp->bundle;

    $variables['classes_array'][] = 'paragraphs-item-id-' . $pp->item_id;

    if ($pp->bundle == 'pp_over_image') { // {{{
      $variables['background_image_url'] = FALSE;
      if (!empty($variables['field_bg_image'][0]['uri'])) {
        // Create background image style, as we have an image.
        $style='1920x';
        $variables['background_image_url'] = image_style_url($style, $variables['field_bg_image'][0]['uri']);
      }

      // How to treat the text?
      $styles = egtheme_get_list_items($pp, 'field_pp_bg_style');
      if (isset($styles['white_text'])) {
        $variables['content_classes'] = 'normal-content-width force-white-text ac-white';
        $variables['classes_array'][] = 'pv5';
      }
      elseif (isset($styles['text_in_box'])) {
        $variables['content_classes'] = 'white-box pv2 pv4-s ph5-s ph2';
        $variables['classes_array'][] = 'pv4';
      }
      else {
        $variables['content_classes'] = 'normal-content-width';
      }


    }//}}}
    elseif ($pp->bundle == 'pp_general') { // {{{
      $sectionStyle = $pp->field_section_style['und'][0]['value'] ?? NULL;
      $imageHeight = ($pp->field_image_height['und'][0]['value'] ?? 'auto') ?: 'auto';
      $alignment = $pp->field_alignment['und'][0]['value'] ?? NULL;
      $layout = $pp->field_layout['und'][0]['value'] ?? NULL;
      $image = $pp->field_image["und"][0] ?? [];
      $variables['imageLink'] = htmlspecialchars($pp->field_image_link["und"][0]['value'] ?? '');
      $variables['imageLinkTarget'] = ($pp->field_image_link_opens_new_tab['und'][0]['value'] ?? FALSE)
        ? 'target="_blank"'
        : '';

      $variables['hasImage'] = !empty($image);

      $text = $pp->field_text["und"][0]["safe_value"] ?? NULL;
      $variables['hasText'] = !empty($text);

      if ($pp->field_caption["und"][0]["safe_value"] ?? NULL && !empty($image)) {
        $variables['classes_array'][] = 'has-caption' ;
      }

      // Get raw html for video
      $video = ($pp->field_video['und'][0]['value'] ?? NULL);
      $variables['video'] = $video;

      $block = (bool) ($pp->field_special['und'][0] ?? NULL);

      $variables['classes_array'][] = $pp->field_space['und'][0]['value'] ?? 'space-space-top-bottom';

      $variables['hasOther'] = (($image || $video || $block) ? 1: 0);
      if ($variables['hasOther'] && $variables['hasText']) {
        $variables['classes_array'][] = "ppgen-2-cols";
      }

      if ($layout) {
        $variables['classes_array'][] = "layout-$layout";
      }
      if ($alignment) {
        $variables['classes_array'][] = "align-$alignment";
      }
      if ($imageHeight) {
        $variables['classes_array'][] = "img-height-$imageHeight";
      }

      $variables['classes_array'][] = $sectionStyle ? "ss-$sectionStyle" : 'ss-none';

      // Choose a theme template.
      //$variables["theme_hook_suggestions"][] = 'xxx';

    } // }}}
    elseif ($pp->bundle == 'image') { // {{{

      $styles = egtheme_get_list_items($pp, 'field_ppimgstyles');
      $size = $pp->field_ppimgstyle['und'][0]['value'];

      $variables['classes_array'][] = implode(' ', $styles);

      switch ($size) {

      case 'size-fill':
        // We have to fill the page width with the image.
        // we restrict the height and crop the image to 30% of vertical viewport.
        $variables['content']['field_image'][0]['#prefix'] = '<div style="height:200px;height:50vh;">';
        $variables['content']['field_image'][0]['#suffix'] = '</div>';
        $variables['content']['field_image'][0]['#item']['attributes']['class'] = 'w100 h100 db fit-cover';
        break;

      case 'size-full':
        $variables['content']['field_image'][0]['#prefix'] = '<div>';
        $variables['content']['field_image'][0]['#suffix'] = '</div>';
        $variables['content']['field_image'][0]['#item']['attributes']['class'] = 'w100 h100 db';
        break;

      case 'size-normal':
        $variables['content']['field_image'][0]['#prefix'] = '<div class="normal-content-width ph5">';
        $variables['content']['field_image'][0]['#suffix'] = '</div>';
        $variables['content']['field_image'][0]['#item']['attributes']['class'] = 'w100 h100 db';
        break;

      case 'size-large':
        $variables['content']['field_image'][0]['#prefix'] = '<div class="normal-content-width">';
        $variables['content']['field_image'][0]['#suffix'] = '</div>';
        $variables['content']['field_image'][0]['#item']['attributes']['class'] = 'w100 h100 db';
        break;
      }
    } // }}}
    elseif ($pp->bundle == 'special_functionality') { // {{{

      $styles = egtheme_get_list_items($pp, 'field_ppblockstyle');
      $variables['classes_array'][] = implode(' ', $styles);
    } // }}}
  }
}

/**
 * Implements template_preprocess_field().
 *
 * Add html line breaks to plain text textarea content being presented as html.
 */
function aaah_preprocess_field(&$vars, $hook) {
  // Add line breaks to plain text textareas.
  if (
    // Make sure this is a text_long field type.
    $vars['element']['#field_type'] == 'text_long'
    // Check that the field's format is set to null, which equates to plain_text.
    && $vars['element']['#items'][0]['format'] == null
  ) {
    $vars['items'][0]['#markup'] = "<p>" .
      implode('</p><p>', preg_split('/[\r\n]+/',
        $vars['items'][0]['#markup'])) . "</p>";
  }
}

/**
 * Returns HTML for status and/or error messages, grouped by type.
 */
function aaah_status_messages($variables) {
  $display = $variables['display'];
  $output = '';


  $status_heading = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
  );
  foreach (drupal_get_messages($display) as $type => $messages) {
    $output .= "<div class=\"messages messages--$type\"><div class='normal-content-width pv2'>\n";
    if (!empty($status_heading[$type])) {
      $output .= '<h2 class="vh">' . $status_heading[$type] . "</h2>\n";
    }

    $icon = [
      'error' => 'x-white',
      'warning' => 'warning-white',
    ][$type] ?? 'tick-white';
    $icon = "<i class='sprite $icon'></i> ";

    if (count($messages) > 1) {
      $output .= " <ul class=\"mv0 pv0 ph0\">\n";
      foreach ($messages as $message) {
        $output .= '  <li class=" ls-none">' . $icon . $message . "</li>\n";
      }
      $output .= " </ul>\n";
    }
    else {
      $output .= "$icon " . reset($messages);
    }
    $output .= "</div>\n";
    $output .= "</div>\n";
  }
  return $output;
}

// Menu theming.
/**
 * Returns HTML for primary and secondary local tasks.
 *
 * @ingroup themeable
 */
function aaah_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="vh">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs primary">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="vh">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs secondary tabs--secondary">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Returns HTML for a wrapper for a menu sub-tree.
 *
 * egtheme: we use this to add depth-N to the <ul>s
 *
 * @param $variables
 *   An associative array containing:
 *   - tree: An HTML string containing the tree's items.
 *
 * @see template_preprocess_menu_tree()
 * @ingroup themeable
 */
function aaah_menu_tree__menu_main_menu_2021($variables) {
  $depth = reset($variables['#tree'])['#original_link']['depth'];
  $classes = "depth-$depth";
  return "<ul class='$classes'>" . $variables['tree'] . '</ul>';
}
function aaah_menu_link__menu_main_menu_2021($variables) {
  $element = $variables['element'];
  $element['#attributes']['class'][] = 'ml1';
  $sub_menu = '';
  /*
  switch ($element['#original_link']['depth']) {
  case 1: // Top level menus.
    // li element classes
    $element['#attributes']['class'][] = 'ls-none ml0 ph3 fi-ag';
    // Link classes
    $element['#localized_options']['attributes']['class'] = ['db centre fh2 pv1'];
    break;
  case 2:
    // li element classes
    $element['#attributes']['class'][] = 'ls-none ml0 ph3 ';
    // Link classes
    $element['#localized_options']['attributes']['class'] = ['db fh2 pv1'];
    break;
  }

   */
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '><div class="menu-item-wrapper pos-r">' . $output . $sub_menu . "</div></li>\n";
}

// Utiltity
/**
 * Extract the machine-stored list items into an array keyed by that and with that as values too.
 *
 * (the keys ensure we have unique values)
 * @return array
 */
function egtheme_get_list_items($entity, $field) {
  $styles = [];
  if (!empty($entity->$field)) {
    foreach ($entity->$field['und'] as $_) {
      $styles[$_['value']] = $_['value'];
    }
  }
  return $styles;
}

