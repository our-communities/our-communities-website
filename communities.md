---
layout: content-feed
title: Communities
description: A list of communities whose events are included in our calendar.
image: /assets/img/posts/communities-og_thumb.jpeg
permalink: /communities/
newsletter: false
---
<section class="blog blog--resource blog--calendar">
  <div class="container">
    <div class="filters">
      <div class="type-wrap">
        <a href="{{ site.suggest_organiser_link }}"
          class="type-button btn">Suggest a new organiser</a>
      </div>
    </div>

    <div id="calendar-wrap">
    <h2 class="resource-header">Groups with Active Events</h2>
    <div class="post-list resource-list month-block">
      {% assign sorted_communities = site.communities | sort:'title' %}
      {% for community in sorted_communities %}
        {% assign sorted-events = site.events | where: 'organiserid', community.dataID %}
        {% if sorted-events.size > 0 %}
          {% include community-card.html show-active="false"%}
        {% endif %}
      {% endfor %}
    </div>

      <h2 class="resource-header">All Groups</h2>
      <div class="post-list resource-list month-block">
      {% for community in sorted_communities %}
        {% assign sorted-events = site.events | where: 'organiserid', community.dataID %}
        {% if sorted-events.size > 0 %}
          {% include community-card.html showactive="true"%}
        {% else %}
          {% include community-card.html showactive="false"%}
        {% endif %}
      {% endfor %}
      </div>
    </div>
  </div>
</section>
