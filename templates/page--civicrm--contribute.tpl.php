<?php
/**
 * @file
 * Minimally implement KONP theme for public pages.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>
<div id="page">
  <div id="main">
    <header class="header" id="header" role="banner">
      <div class="konp-logo-container">
        <img src="https://keepournhspublic.com/wp-content/uploads/2017/07/newkonplogo-smaller.png"
          class="konp-logo"
          alt="NHS not for sale - Keep Our NHS Public (logo)"
        />
      </div>
    </header>

    <div id="content" class="column" role="main">
      <?php print render($title_prefix); ?>
      <?php if (empty($suppress_title)): ?>
        <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php unset($page['header']['#theme_wrappers']); print render($page['header']); ?>
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

  </div>

  <?php print render($page['footer']); ?>
  <footer class="mh-footer" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
  <div class="mh-container mh-container-inner mh-footer-widgets mh-row mh-clearfix">
  <div class="mh-col-1-2 mh-widget-col-2 mh-footer-2-cols  mh-footer-area mh-footer-3">
  <div id="text-2" class="mh-footer-widget widget_text"><h6 class="mh-widget-title mh-footer-widget-title"><span class="mh-widget-title-inner mh-footer-widget-title-inner">Keep Our NHS Public © 2015 – 2020</span></h6>			<div class="textwidget"><div class="custom-contact">
  <p class="cust-abdy">Unit 12-13, Springfield House<br>
  5 Tyssen Street<br>
  London E8 2LY</p>
  </div>
  <div class="custom-contact"><span class="cust-abdy">Telephone&nbsp;</span><br>
  <span class="cust-abdy">Email</span>&nbsp;<a class="custom-a" title="Email us.." href="mailto:nationaladmin@keepournhspublic.com">nationaladmin@keepournhspublic.com</a><br>
  <span class="cust-abdy">Press / Media </span><a class="custom-a" href="https://keepournhspublic.com/about-us/press">visit our Press page</a></div>
  </div>
      </div></div>
  <div class="mh-col-1-2 mh-widget-col-2 mh-footer-2-cols  mh-footer-area mh-footer-4">
  <div id="text-3" class="mh-footer-widget widget_text"><h6 class="mh-widget-title mh-footer-widget-title"><span class="mh-widget-title-inner mh-footer-widget-title-inner">Further information</span></h6>			<div class="textwidget"><p><a href="https://keepournhspublic.com/about-us/hct/">Health Campaigns Together</a><br>
  <a href="https://keepournhspublic.com/about-us/privacy-policy/">Privacy &amp; Data Handling</a><br>
  <a href="https://keepournhspublic.com/about-us/terms-and-conditions/">Terms and Conditions</a><br>
  <a href="https://keepournhspublic.com/about-us/related-organisations/">Related Organisations</a><br>
  <a href="https://keepournhspublic.com/about-us/volunteer-values/">Volunteer values</a></p>
  <p><span class="cust-abdy">Social Media</span>&nbsp;<a class="custom-a" title="Visit our Twitter page..." href="https://twitter.com/keepnhspublic" target="_blank" rel="noopener noreferrer"><img src="https://keepournhspublic.com/wp-content/plugins/konp-extra/img/twitter.png" alt="Twitter">keepnhspublic</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="custom-a" title="Visit our Facebook page..." href="https://facebook.com/keepournhspublic" target="_blank" rel="noopener noreferrer"><img src="https://keepournhspublic.com/wp-content/plugins/konp-extra/img/facebook.png" alt="Facebook">keepournhspublic</a><br>
  <span class="cust-abdy">RSS Feed</span>&nbsp;<a class="custom-a" title="Subscribe to our RSS Feed..." href="https://keepournhspublic.com/rss/" target="_blank" rel="noopener noreferrer"><img src="https://keepournhspublic.com/wp-content/plugins/konp-extra/img/rss.png" alt="RSS"></a></p>
  </div>
      </div></div>
  </div>
  </footer>

</div>
<?php print render($page['bottom']); ?>
