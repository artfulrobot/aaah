<?php
/**
 * @file
 * Default theme implementation to wrap comments.
 *
 * Available variables:
 * - $content: All comments for a given page. Also contains sorting controls
 *   and comment forms if the site is configured for it.
 *
 * The following variables are provided for contextual information.
 * - $node: Node object the comments are attached to.
 * The constants below the variables show the possible values and should be
 * used for comparison.
 * - $display_mode
 *   - COMMENT_MODE_FLAT_COLLAPSED
 *   - COMMENT_MODE_FLAT_EXPANDED
 *   - COMMENT_MODE_THREADED_COLLAPSED
 *   - COMMENT_MODE_THREADED_EXPANDED
 * - $display_order
 *   - COMMENT_ORDER_NEWEST_FIRST
 *   - COMMENT_ORDER_OLDEST_FIRST
 * - $comment_controls_state
 *   - COMMENT_CONTROLS_ABOVE
 *   - COMMENT_CONTROLS_BELOW
 *   - COMMENT_CONTROLS_ABOVE_BELOW
 *   - COMMENT_CONTROLS_HIDDEN
 *
 * @see template_preprocess_comment_wrapper()
 * @see advanced_forum_preprocess_comment_wrapper()
 */
?>
<a name="forum-comments"></a>
<div id="forum-comments" class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php $pager = render($content['comments']['pager']);?>
  <?php if ($pager): ?>
    <div class="forum-comment-pager">
      <div class="dcn-icon-message">
        <span class="dcn-icon-message__icon"><i class="dcn-icon exclamation"></i></span>
        <span class="dcn-icon-message__text">This topic has a lot of replies!
          Be sure to read the last page of comments to make sure your reply is relevant
          to where this conversation has gone. If the discussion has moved on from the
          original topic, please <a href="/node/add/forum/<?php print $node->forum_tid; ?>">start a
          new topic</a></span>
      </div>
      <?php print $pager; ?>
    </div>
  <?php endif;?>

  <?php print render($content['comments']); ?>

  <?php if ($pager): ?>
    <div class="forum-comment-pager">
      <div class="dcn-icon-message">
        <span class="dcn-icon-message__icon"><i class="dcn-icon exclamation"></i></span>
        <span class="dcn-icon-message__text">This topic has a lot of replies!
          Be sure to read the last page of comments to make sure your reply is relevant
          to where this conversation has gone. If the discussion has moved on from the
          original topic, please <a href="/node/add/forum/<?php print $node->forum_tid; ?>">start a
          new topic</a></span>
      </div>
      <?php print $pager; ?>
    </div>
  <?php endif;?>

  <?php if ($content['comment_form']): ?>
    <div id="forum-comment-form-wrapper">
      <h2 class="title comment-form"><?php print t('Add your reply'); ?></h2>
      <?php
        print FORUM_CODE_OF_CONDUCT;
        unset($content['comment_form']['actions']);
        $content['comment_form']['actions'] = ['#markup' => '<button value="Save" class="forum-post-reply-button" >POST</button>'];
        print render($content['comment_form']);
      ?>
    </div>
  <?php else: ?>
    <?php print $reply_link; ?>
  <?php endif; ?>
</div>
