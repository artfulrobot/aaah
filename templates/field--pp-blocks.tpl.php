<?php // Really minimal markup.
foreach ($items as $delta => $item): ?>
  <div class="mb3 ph1 ph4-s pp-blocks-layout__item-<?php print (1+$delta); ?>" <?php print $item_attributes[$delta]; ?>>
    <?php print render($item); ?>
  </div>
<?php endforeach;
?>
