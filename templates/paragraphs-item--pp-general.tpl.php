<?php /* This is the full width div */ ?>
<div class="<?php print $classes; /* includes ss-<sectionStyle> layout-<layout> */ ?>" <?php print $attributes; ?>>
  <div class="normal-content-width" >
    <div class="layout" >

      <?php if ($content['field_text'][0]['#markup'] ?? ''): ?>
        <div class="ppgen_col_text">
          <?php print $content['field_text'][0]['#markup'] ?? ''; ?>
        </div>
      <?php endif; ?>

      <?php if ($hasOther): ?>
        <div class="ppgen_col_other"><!-- flex, dir: column -->

            <?php if ($hasImage): ?>
              <div class="ppgen_image"><!-- allow this to be sized by flex -->
                <?php print render($content['field_image'][0]); ?>
              </div>
            <?php endif;?>

            <?php if ($video): ?>
              <div class="ppgen_video"><div class="ppgen_video_wrap"><?php print $video?></div></div>
            <?php endif;?>

            <?php print render($content["field_special"]); ?>

            <?php if ($content['field_caption'][0]['#markup'] ?? ''): ?>
              <div class="ppgen_caption"><!-- flex auto -->
                <?php print $content['field_caption'][0]['#markup'] ?? ''; ?>
              </div>
            <?php endif; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>
