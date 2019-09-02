---
layout: content-feed
title: Communities
description: A list of communities whose events are included in our calendar.
image: /assets/img/posts/communities-og_sm.jpeg
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
