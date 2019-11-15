---
layout: content-feed
title: Calendar
description: Community curated calendar for tech events in the South West.
image: /assets/img/posts/calendar-og_sm.jpeg
permalink: /calendar/
---

<section class="blog blog--resource blog--calendar">
  <div class="container">
    {% assign sorted-events = site.events | sort: 'start' | group_by_exp: "item", "item.start | date: '%B %Y'" %}
    {% for month in sorted-events %}
      {% assign thismonth = month.name | date: "%B %Y" %}
      {% if thismonth != lastmonth %}
        <h2 class="resource-header">{{thismonth}}</h2>
        {% assign shortMonth = thismonth | size %}
        {% if forloop.first %}
          <p>There's {{ month.items | size }} events remaining in {{month.name | date: "%B"}}.</p>
        {% else %}
          <p>There are {{ month.items | size }} events listed in {{month.name | date: "%B"}}.</p>
        {% endif %}
      {% endif%}
      {% assign lastmonth = thismonth %}
      <div class="post-list resource-list">

        {% for event in month.items %}
          <div class="post-card resource-card" data-location="{{event.geographic}}">

            {% assign organiser = site.communities | where: 'dataID', event.organiserid %}

            <a class="post-card__inner" href="{{ event.url }}" title="More info about {{event.title}}">
            {% if organiser.first.featured-img %}
              <figure class="post-card__thumb">
                <img
                  src="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_placehold.jpeg"
                  data-srcset="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb.jpeg,"
                  class="lazyload blur"
                  alt="{{event.title}}"
                />
                <noscript><img src="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb.jpeg" alt="{{ event.title }}"></noscript>
              </figure>
            {% else %}
              <figure class="post-card__thumb">
                <div class="dark-bg"></div>
              </figure>
            {% endif %}



              <div class="post-card__header">
                <h2>{{event.title | strip_html | truncate: 50}}</h2>

                <p>{{event.start | date_to_string }} // {{event.start | slice: 11, 5}} //
                  {% if event.geographic == 'undefined' %}
                    Venue TBC
                  {% else %}
                    {{event.geographic}}
                  {% endif %}
                </p>
                <p>{{ event.excerpt | strip_html | truncatewords:20 }}</p>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    {% endfor %}

  </div>
</section>
