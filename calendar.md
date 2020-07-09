---
layout: content-feed
title: Calendar
description: Community curated calendar for tech events in the South West.
image: /assets/img/posts/calendar-og_thumb.jpeg
permalink: /calendar/
newsletter: false
---

<section class="blog blog--resource blog--calendar">
  <div class="container">
    {% assign sorted-events = site.events | sort: 'start' | group_by_exp: "item", "item.start | date: '%B %Y'" %}

    {% include filters.html %}

    {% assign count = 0 %}
    {% for month in sorted-events %}
      {% for event in month.items %}
        {% assign today_date = 'now' | date: '%F' %}
        {% assign start_date = event.start | date: '%F' %}
        {% if today_date > start_date %}
          {% assign count = count | plus: 1 %}
        {% endif %}
      {% endfor %}
    {% endfor %}

    {% if count > 0 %}

      <div id="calendar-wrap">
        <h2 class="resource-header">Ongoing Events</h2>
        <p>There's {{ count }} recurring event{% if count > 1%}s{% endif %} happening at the moment.</p>

        <div class="post-list resource-list month-block">
          {% for month in sorted-events %}
            {% for event in month.items %}
              {% assign today_date = 'now' | date: '%F' %}
              {% assign start_date = event.start | date: '%F' %}
              {% if today_date > start_date %}
                {% assign organiser = site.communities | where: 'dataID', event.organiserid %}
                {% include event-card.html picture='true' ongoing='true' %}
              {% endif %}
            {% endfor %}
          {% endfor %}
        </div>
      {% endif %}

      {% for month in sorted-events %}
        {% assign thismonth = month.name | date: "%B %Y" %}
        {% assign todaymonth = 'now' | date: "%B %Y" %}

        {% assign today_month = 'now' | date: '%s' %}
        {% assign event_month = month.name | date: '%s' %}

        {% if event_month > today_month or thismonth == todaymonth%}

            <h2 class="resource-header">{{thismonth}}</h2>

            {% assign count = 0 %}
            {% for event in month.items %}
              {% assign today_date = 'now' | date: '%F' %}
              {% assign event_date = event.start | date: '%F' %}

              {% if event_date >= today_date %}
                {% assign count = count | plus: 1 %}
              {% endif%}  
            {% endfor %}

            {% if thismonth == todaymonth %}
              <p>There's <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ count }}</span> event{% if count > 1%}<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span>{% endif %} remaining during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
            {% else %}
              <p>There <span class="are-is-{{thismonth | replace: " ", "-"}}">are</span> <span class="num-remaining-{{thismonth | replace: " ", "-"}}">{{ count }}</span> event<span class="num-remaining-plural-{{thismonth | replace: " ", "-"}}">s</span> listed during {{month.name | date: "%B"}}<span class="num-remaining-location-{{thismonth | replace: " ", "-"}}"></span><span class="type-text-{{thismonth | replace: " ", "-"}}"></span>.</p>
            {% endif %}
            {% assign lastmonth = thismonth %}


          <div class="post-list resource-list month-block"
              data-month="{{lastmonth | replace: " ", "-"}}">

            {% for event in month.items %}
              {% assign today_date = 'now' | date: '%F' %}
              {% assign event_date = event.start | date: '%F' %}

              {% if event_date >= today_date %}
                {% assign organiser = site.communities | where: 'dataID', event.organiserid %}
                {% include event-card.html picture='true' ongoing='false' %}
              {% endif%}  
            {% endfor %}
          </div>

        {% endif %}

        
      {% endfor %}
    </div>

  </div>
</section>
