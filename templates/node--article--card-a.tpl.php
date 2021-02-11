<?php
/**
 * @file
 * Returns the HTML for a node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
?>
<article class="card-a df bc-wt h100 fd-col node-<?php print $node->nid; ?> <?php print $classes; ?>"
  <?php print $attributes; ?>>

  <div
    class="db fi-0 image-100" >
    <?php print render($content['field_image'][0]); ?>
  </div>

  <div class="db fi-ags ph2 ph3-s pv2">
    <?php print render($title_prefix); ?>
    <h1 class="font-40"><a href="/<?php print $path_alias ?>"><?php print $title; ?></a></h1>
    <?php print render($title_suffix); ?>
    <?php if ($unpublished): ?>
      <mark class="unpublished"><?php print t('Unpublished'); ?></mark>
    <?php endif; ?>
    <p><?php print check_plain($elements['#node']->metatags['und']['description']['value'] ?? '');?></p>
  </div>
  <footer class="fi-0 ph2 ph3-s pv2 font-20">
    Blog.
  </footer>

</article>
