---
layout: content-feed
title: Calendar
permalink: /calendar/
---
<section class="blog blog--resource blog--calendar">
  <div class="container">
    {% assign sorted-events = site.events | sort: 'start' | group_by_exp: "item", "item.start | date: '%B %Y'" %}
    {% for month in sorted-events %}
      {% assign thismonth = month.name | date: "%B %Y" %}
      {% if thismonth != lastmonth %}
        <h2 class="resource-header">{{thismonth}}</h2>
      {% endif%}
      {% assign lastmonth = thismonth %}
      <div class="post-list resource-list">

        {% for event in month.items %}
          <div class="post-card resource-card">

            {% assign organiser = site.communities | where: 'dataID', event.organiserid %}

            {% if organiser.first.featured-img %}
              <figure class="post-card__thumb">
                <img
                  src="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_placehold.jpg"
                  data-srcset="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb.jpg, {{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb@2x.jpg 2x"
                  class="lazyload blur"
                  alt="{{event.title}}"
                />
                <noscript><img src="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb.jpg" alt="{{ event.title }}"></noscript>
                <div class="post-card__cover"><h2>{{event.title | strip_html | truncate: 50}}</h2></div>
              </figure>
            {% else %}
              <figure class="post-card__thumb">
                <div class="dark-bg"></div>
                <div class="post-card__cover"><h2>{{event.title | strip_html | truncate: 50}}</h2></div>
              </figure>
            {% endif %}


            <a class="post-card__inner" href="{{ event.url }}">
              <div class="post-card__header">
                <p>{{event.start | date_to_string }} // {{event.start | slice: 11, 5}} // {{event.geographic}}</p>
                <p>{{ event.excerpt | strip_html | truncatewords:20 }}</p>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    {% endfor %}
  </div>
</section>
