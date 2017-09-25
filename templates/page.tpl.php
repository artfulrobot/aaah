<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div id="page">
  <?php // Render the sidebars to see if there's anything in them.
    $sidebar= render($page['sidebar']);
  ?>

    <div id="main" class="<?php print $sidebar ? 'has-sidebar' : 'no-sidebar' ?>">

    <div id="content" class="column" role="main">
      <header class="header" id="header" role="banner">
          <?php print render($title_prefix); ?>
          <?php if (empty($suppress_title)): ?>
            <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
          <?php endif; ?>
        <?php unset($page['header']['#theme_wrappers']); print render($page['header']); ?>
      </header>
      <?php print render($page['highlighted']); ?>
      <a id="main-content"></a>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php print render($tabs); ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
    </div>

    <div id="navigation">
      <?php print render($page['navigation']); ?>
    </div>

    <?php if ($sidebar): ?>
      <aside class="sidebar">
        <?php print $sidebar; ?>
      </aside>
    <?php endif; ?>

  </div>

  <?php print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>
