<?php

/**
 * @file
 * Theme implementation: Template for each forum post whether node or comment.
 *
 * All variables available in node.tpl.php and comment.tpl.php for your theme
 * are available here. In addition, Advanced Forum makes available the following
 * variables:
 *
 * - $top_post: TRUE if we are formatting the main post (ie, not a comment)
 * - $reply_link: Text link / button to reply to topic.
 * - $total_posts: Number of posts in topic (not counting first post).
 * - $new_posts: Number of new posts in topic, and link to first new.
 * - $links_array: Unformatted array of links.
 * - $account: User object of the post author.
 * - $name: User name of post author.
 * - $author_pane: Entire contents of the Author Pane template.
 */
?>

<?php if ($top_post): ?>
  <?php print $topic_header ?>
<?php endif; ?>

<?php // classes is like: "forum-post clearfix en posted-by-8671"
$classes = str_replace('clearfix', '', $classes) . ($top_post ? ' forum-topic' : ' forum-reply'); ?>
<div id="<?php print $post_id; ?>" class="<?php print $classes; ?>" <?php print $attributes; ?>>
  <div class="forum-post-info">
    <?php if (!empty($author_pane)): ?>
      <div class="forum-post-info__author">
      <i class="dcn-icon author" ></i>
        <span><?php print $author_pane; ?></span>
      </div>
    <?php endif; ?>

    <div class="forum-post-info__when">
      <i class="dcn-icon when" ></i>
      <span>
      <?php $created = ($comment->created ?? $node->created);?>
      <span class="date"><?php print date('j M Y' , $created) ?></span>
      <span class="time"><?php print date('g:i:a', $created); ?></span>
      </span>
    </div>

    <?php
    // This whole section is for printing the "new" marker. With core comment
    // we just need to check a variable. With Node Comment, we need to do
    // extra work to keep the views caching used for Node Comment from
    // caching the new markers.
    ?>
    <?php if (!$top_post): ?>
      <?php if (!empty($new)): ?>
        <a id="new"><span class="new">(<?php print $new ?>)</span></a>
      <?php endif; ?>

      <?php if (!empty($first_new)): ?>
        <?php print $first_new; ?>
      <?php endif; ?>

      <?php if (!empty($new_output)): ?>
        <?php print $new_output; ?>
      <?php endif; ?>
    <?php endif; ?>

    <?php if (!empty($in_reply_to)): ?>
   	 <span class="forum-in-reply-to"><?php print $in_reply_to; ?></span>
    <?php endif; ?>

    <?php /* Add a note when a post is unpublished so it doesn't rely on theming. */ ?>
    <?php if (!$node->status): ?>
      <span class="unpublished-post-note"><?php print t("Unpublished post") ?></span>
    <?php endif; ?>

<?php if (FALSE):?>
    <span class="forum-post-number"><?php print $permalink; ?></span>
<?php endif;?>
  </div> <?php /* End of post info div. */ ?>

  <div class="forum-post-wrapper">
    <div class="forum-post-panel-main">
      <span class="forum-decorative-arrow"></span>
      <?php if (FALSE && !empty($title)): // titles are pretty pointless ?>
        <div class="forum-post-title">
          <?php print $title ?>
        </div>
      <?php endif; ?>

      <div class="forum-post-content">
      <?php
        // @codingStandardsIgnoreStart
        // We hide the comments and links now so that we can render them later.
        hide($content['taxonomy_forums']);
        hide($content['comments']);
        hide($content['links']);
        if (!$top_post)
          hide($content['body']);
        print render($content);
        // @codingStandardsIgnoreEnd
      ?>
      <?php if (!empty($post_edited)): ?>
        <div class="post-edited">
          <?php print $post_edited ?>
        </div>
      <?php endif; ?>
      </div>
      <?php // xxx cannot get this to behave nicely.
      $the_reply_link = &$content['links']['comment']['#links'][$top_post ?  'comment-add' : 'comment-reply'];
      $the_reply_link["href"] = request_path();
      $the_reply_link["fragment"] = 'comment-form';
      $the_reply_link["title"] = 'POST';
      $content['links']['comment']['#links']['report'] = [
        'href' => '/report-forum',
        'query' => ['report_url' => request_path(), 'comment' => $top_post ? '' : $post_id],
        'title' => 'report',
        'attributes' => ['title' => 'Report a problem with this post.'],
      ];
        print render($content['links']); ?>

    </div>
  </div>
  <?php /* End of post wrapper div. */ ?>

  <div class="forum-post-footer">
    <?php if (FALSE) :?>
    <div class="forum-jump-links">
      <a href="#forum-topic-top" title="<?php print t('Jump to top of page'); ?>" class="af-button-small"><span><?php print t("Top"); ?></span></a>
    </div>
    <?php endif;?>

  </div>
  <?php /* End of footer div. */ ?>
</div>
<?php /* End of main wrapping div. */ ?>
<?php print render($content['comments']); ?>
