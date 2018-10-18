---
layout: content-feed
title: Communities
permalink: /communities/
---
<section class="blog">
  <div class="container">
    <div class="post-list">
      {% for community in site.communities %}
        {% include community-card.html %}
      {% endfor %}
    </div>
  </div>
</section>
