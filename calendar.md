---
layout: content-feed
title: Calendar
permalink: /calendar/
---
<section class="blog">
  <div class="container">
    <div class="post-list">
      {% assign sorted-events = site.events | sort: 'start' %}
      {% for event in sorted-events %}
      <div class="post-card">
        <a class="post-card__inner" href="{{ event.url }}">
          <div class="post-card__header">
            <h2>{{event.title | strip_html | truncate: 50}}</h2>
            <p>{{event.start | date_to_string }} // {{event.start | slice: 11, 5}} // {{event.geographic}}</p>
            <p>{{ event.excerpt | strip_html | truncatewords:20 }}</p>
          </div>
        </a>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
