---
layout: content-feed
title: Communities
description: A list of communities whose events are included in our calendar.
image: /assets/img/posts/communities-og_thumb.jpeg
permalink: /communities/
newsletter: false
---
<section class="blog blog--resource">
  <div class="container">
  <div class="filters">
    <a href="https://southwestcommunities.typeform.com/to/m1ApTyxR?utm_source=website&utm_medium=link&utm_campaign=add-new-organiser"
       class="btn">Suggest a new organiser</a>
       </div>
    <div class="post-list">
      {% assign sorted_communities = site.communities | sort:'title' %}
      {% for community in sorted_communities %}
        {% include community-card.html %}
      {% endfor %}
    </div>
  </div>
</section>
