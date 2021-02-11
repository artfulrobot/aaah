<?php

/**
 * @file
 * Article Listings view.
 */
?>
<div class="df-s mh-2-s mh-4-m fw-wrap pv5">
<?php foreach ($rows as $id => $row): ?>
  <div class="ph2-s ph4-m" >
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
</div>
