---
layout: content-feed
title: Resources
permalink: /resources/
newsletter: false
---
<section class="blog blog--resource">
  <div class="container">
    {% assign resources_grouped = site.resources | group_by: 'for' %}
    {% for group in resources_grouped %}
      <h2 class="resource-header">{{group.name}}</h2>
      <div class="post-list resource-list">

        {% for resource in group.items %}
        <div class="post-card resource-card">
          <a class="post-card__inner" href="{{ resource.url | relative_url }}" title="{{resource.title}}">
            <div class="post-card__header">
              <h2>{{ resource.title | strip_html | truncate: 50 }}</h2>
            </div>
            {% if resource.summary %}
              <p>{{ resource.summary | strip_html | truncatewords:20 }}</p>
            {% else %}
              <p>{{ resource.content | strip_html | truncatewords: 20 }}</p>
            {% endif %}
          </a>
        </div>
        {% endfor %}
    </div>
    {% endfor %}
  </div>
</section>
