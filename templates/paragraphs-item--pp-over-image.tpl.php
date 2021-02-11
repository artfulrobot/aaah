<?php

/**
 * @file
 */
?>
<div class="<?php print $classes; ?>"<?php print $attributes; ?> style="background-image:url(<?php print $background_image_url?>);">
  <div class="dcn-veil">
    <div class="<?php print $content_classes; ?>"<?php print $content_attributes; ?>>
      <?php print $content['field_text'][0]['#markup']; ?>
    </div>
  </div>
</div>
