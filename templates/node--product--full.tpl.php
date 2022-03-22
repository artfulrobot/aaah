<?php
/**
 * @file
 * Returns the HTML for a node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
?>
<div class="normal-content-width">
<article class="dcn-product -content-width node-<?php print $node->nid; ?> <?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="dcn-product__main" >
    <?php if (!$published): ?>
      <mark class="unpublished"><?php print t('Unpublished'); ?></mark>
    <?php endif; ?>
    <?php print render($content['body']); ?>

    <?php print render($content['sell_price']); ?>
    <?php print render($content['add_to_cart']); ?>
  </div>

  <div class="dcn-product__side" >
    <?php print render($content['uc_product_image']); ?>
    <?php print render($content['taxonomy_catalog']); ?>
  </div>
</article>
<?php
/*
"uc_product_image"
"links"
"comments"
"cost"
"list_price"
"sell_price"
"body"
"taxonomy_catalog"
"add_to_cart"
"display_price"
"model"
"weight"
"dimensions"]
 */
?>
</div>
