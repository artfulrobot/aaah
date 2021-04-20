<?php
/**
 * @file
 * views-view-table.tpl.php
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $class: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * @ingroup views_templates
 */
?>
 <div id="forum-topic-list">
  <?php if (!empty($title)) : ?>
    <caption><?php print $title; ?></caption>
  <?php endif; ?>

  <div class="forum-table forum-table-topics <?php print $classes; ?>">
    <?php foreach ($rows as $count => $row): ?>
      <article class="forum-topic <?php print implode(' ', $row_classes[$count]); ?>">
        <?php if (empty($shadow[$count])): ?>
          <?php preg_match('@\s*(<a href.*?</a>).* by (<a href.*?</a>|<span .*</span>) » (.*$)@s', $row['title'], $parts); ?>

          <div class="forum-topic-title-meta">
            <div class="forum-topic-title">
              <?php if (!empty($sticky[$count])):?>
                <span class="sticky-label"><?php print t('Sticky:'); ?></span>
              <?php endif; ?>
              <div class="forum-topic-title"><?php print $parts[1] ?? '';?></div>
            </div>

            <div class="forum-topic-meta">
              <div class="forum-topic-author"><?php print $parts[2];?></div>
              <div class="forum-topic-date"><?php print $parts[3] ?? '';?></div>
            </div>
          </div>

          <div class="forum-topic-latest" >
            <?php print str_replace('<br />', ' comments ', $row['comment_count']) . " ";?>
            <?php if (preg_match('@by (<a .*?</a>)<br />(.*$)@s', $row['last_updated'], $matches)):
              print 'Last updated: ' . $matches[1] . " on " . $matches[2];
            endif;?>
          </div>

          <?php foreach ($row as $field => $content): ?>
            <?php /* To add popup from teaser in the title of the td, add: title="<?php print $teasers[$count] ?>"
            <div class="views-field views-field-<?php print $fields[$field]; ?>">
            </div>
            <?php */?>
          <?php endforeach; ?>
        <?php else: ?> 
          <?php /* For shadow posts, we print only the icon and themed notice. */ ?>
          <div class="views-field views-field-<?php print $fields['topic_icon']; ?>">
            <?php print $row['topic_icon']; ?>
          </div>
          <div class="views-field views-field-<?php print $fields['title']; ?>" colspan="<?php print count($header) - 1; ?>">
             <?php print $shadow[$count]; ?>
          </div>
        <?php endif; ?>
      </article>
    <?php endforeach; ?>
  </div>
</div>
