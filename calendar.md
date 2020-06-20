---
layout: content-feed
title: Calendar
description: Community curated calendar for tech events in the South West.
image: /assets/img/posts/calendar-og_sm.jpeg
permalink: /calendar/
newsletter: false
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
            <p>There's <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ month.items | size }}</span> event{% if month.items.size > 1%}<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span>{% endif %} remaining during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
          {% else %}
            <p>There <span class="are-is-{{thismonth | replace: " ", "-"}}">are</span> <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ month.items | size }}</span> event<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span> listed during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
          {% endif %}
        {% endif%}
        {% assign lastmonth = thismonth %}

        <div class="post-list resource-list month-block"
             data-month="{{lastmonth | replace: " ", "-"}}">

          {% for event in month.items %}
            {% assign organiser = site.communities | where: 'dataID', event.organiserid %}
            {% include event-card.html picture='true' %}
          {% endfor %}
        </div>
      {% endfor %}
    </div>

  </div>
</section>
