---
layout: content-feed
title: Calendar
permalink: /calendar/
---

<div class="post-card">
  <a href="{{ item.url | relative_url }}">
    {% if item.featured-img %}
      <figure class="post-card__thumb">item
        <img
          src="{{ site.url }}{{ site.baseurl }}/assets/img/posts/{{item.featured-img}}_placehold.jpg",
          data-srcset="{{ site.url }}{{ site.baseurl }}/assets/img/posts/{{item.featured-img}}_thumb.jpg, {{ site.url }}{{ site.baseurl }}/assets/img/posts/{{item.featured-img}}_thumb@2x.jpg 2x"
          class="lazyload blur"
          alt="{{item.name}}"
        />
        <noscript><img src="{{ site.url }}{{ site.baseurl }}/assets/img/posts/{{item.featured-img}}_thumb.jpg" alt="{{ item.name }}"></noscript>
      </figure>
    {% else %}
      <figure class="post-card__thumb">
        <div class="dark-bg"></div>
      </figure>
    {% endif %}
  </a>
  <a class="post-card__inner" href="{{ site.url }}{{ item.link}}">
    <div class="post-card__header">
      <h2>Event Title</h2>
    </div>
    <p>This is a description about a super awesome event.</p>
  </a>
</div>