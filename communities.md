---
layout: page
title: Communities
permalink: /communities/
---

<div>

{% for community in site.communities %}
  <h2>{{ community.name }}</h2>
{% endfor %}

</div>
