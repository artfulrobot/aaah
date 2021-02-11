<div class="ov-h <?php print $classes; ?>" <?php print $attributes; ?>>
  <div class="normal-content-width <?php print $content_classes; ?>" <?php print $content_attributes; ?>>
    <div class="df-m mh-3" >
      <div class="ph3 fi-2-m <?php print $image_wrapper_classes;?>">
        <div class="pos-r w100 h100">
          <div class="pos-a-m w100 h100 df fd-col <?php print $image_vertical_alignment ?>">
            <div class="<?php print $image_layout_class ?> pos-r">
              <?php print render($content['field_image'][0]); ?>
            </div>
            <?php if (!empty($content['field_caption'][0]['#markup'])):?>
              <div class="fi-0 bc-g8 ph2 pv2 field_caption">
                <?php print $content['field_caption'][0]['#markup'] ?? ''; ?>
              </div>
            <?php endif;?>
          </div>
        </div>
      </div>

      <div class="field_text ph3 fi-2-m pt3 <?php print $text_wrapper_classes;?>">
        <?php print $content['field_text'][0]['#markup'] ?? ''; ?>
      </div>

    </div>
  </div>
</div>
