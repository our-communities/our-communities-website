---
layout: content-feed
title: Resources
permalink: /resources/
---

{% for resource in site.resources %}
  {% include resource-card.html %}
{% endfor %}
