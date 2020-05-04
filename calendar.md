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

    {% include filters.html %}

    <div id="calendar-wrap">

      {% for month in sorted-events %}
        {% assign thismonth = month.name | date: "%B %Y" %}
        {% if thismonth != lastmonth %}
          <h2 class="resource-header">{{thismonth}}</h2>
          {% assign shortMonth = thismonth | size %}
          {% if forloop.first %}
            <p>There's <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ month.items | size }}</span> event<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span> remaining during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
          {% else %}
            <p>There <span class="are-is-{{thismonth | replace: " ", "-"}}">are</span> <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ month.items | size }}</span> event<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span> listed during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
          {% endif %}
        {% endif%}
        {% assign lastmonth = thismonth %}

        <div class="post-list resource-list month-block"
             data-month="{{lastmonth | replace: " ", "-"}}">

          {% for event in month.items %}
            {% assign organiser = site.communities | where: 'dataID', event.organiserid %}

            <div class="post-card resource-card event-card"
            data-location="{% if event.venue == 'Online event' %}Online event{% else %}{{event.geographic}}{% endif %}"
            data-type="{{organiser.first.type}}">

              <a class="post-card__inner" href="{{ event.url }}" title="More info about {{event.title}}">
              {% if organiser.first.featured-img %}
                <figure class="post-card__thumb">
                  <img
                    src="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_placehold.jpeg"
                    data-srcset="{{ site.url }}{{ site.baseurl }}/assets/img/communities/{{organiser.first.featured-img}}_thumb.jpeg,"
                    class="lazyload blur"
                    alt="{{event.title}}."
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
                    {% if event.venue == 'Online event' %}
                      Online event
                    {% elsif event.geographic == 'undefined' %}
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

  </div>
</section>
