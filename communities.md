---
layout: content-feed
title: Communities
permalink: /communities/
---
<section class="blog">
  <div class="container">
    <div class="post-list">
      {% assign sorted_communities = site.communities | sort:'title' %}
      {% for community in sorted_communities %}
        {% include community-card.html %}
      {% endfor %}
    </div>
  </div>
</section>
