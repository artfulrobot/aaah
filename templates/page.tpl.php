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
  <header id="site-header" role="banner">
    <div class="normal-content-width" id="header__content">
      <div class="df fjc-sb fai-top">
        <div class="fi-a pr4 header-logo-div">
            <!--@todo reset this link.-->
            <a href="/homepage-new"><img src="/sites/default/themes/aaah/images/dcn-logo.svg" alt="<?php print $site_name; ?>" class="db" id="header-logo" /></a>
        </div>
        <ul class="fi-a top-links" role="navigation" >
          <li><a class="cart" href="/cart" title="View your shopping cart">
            <i class="fa fa-shopping-cart"></i>
            Basket</a></li>
          <?php print $variables["page"]["userlink"] ?? ''; ?>
          <?php print $variables["page"]["loginout"] ?? ''; ?>
        </ul>
      </div>
      <?php print render($page['header']['menu_menu-main-menu-2021']); ?>
    </div><?php /* end of header content */ ?>
  </header>

  <?php // Render the sidebars to see if there's anything in them.
    $sidebar= render($page['sidebar']);
  ?>

  <div id="main" class="<?php print $sidebar ? 'has-sidebar' : 'no-sidebar'; ?><?php print $hideSidebar ?? ''; ?>">

    <div id="content" class="column" role="main">

      <?php // Only show the header with the h1 if it's NOT a paragraphs page.
      if (empty($node->field_sections["und"])):
      ?>
      <header id="page-header" class="normal-content-width">
          <?php print render($title_prefix); ?>
          <?php if (empty($suppress_title)): ?>
            <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
          <?php endif; ?>
        <?php unset($page['header']['#theme_wrappers']); print render($page['header']); ?>
      </header>
      <?php endif; ?>

      <?php print render($page['highlighted']); ?>
      <a id="main-content"></a>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <div class="normal-content-width"><?php print render($tabs); ?></div>
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
      <div id='sidebar-toggle'>Toggle sidebar</div>
    <?php endif; ?>

  </div>

  <footer id="site-footer">
    <div class="normal-content-width">
      <?php print render($page['footer']); ?>
      <div class="copyright">© <?php echo date('Y');?> Donor Conception Network - All Rights Reserved.
        <a class="ar-link" href="https://artfulrobot.uk" title="Artful Robot - stitches together websites, databases and open source cunning to help you change the world." target="_blank">Website by 
          <span class="ar-a">A</span><span class="ar-r">r</span><span class="ar-t">t</span><span class="ar-f">f</span><span class="ar-u">u</span><span class="ar-l">l</span> <span class="ar-r2">R</span><span class="ar-o">o</span><span class="ar-b">b</span><span class="ar-o2">o</span><span class="ar-t2">t</span></a>
      </div>
    </div>
  </footer>

</div>

<?php print render($page['bottom']); ?>
