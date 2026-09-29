# Branch Spatial Convenience

A spatial wayfinding and service-discovery system for businesses with multiple physical outlets.

## Why this exists

A conventional branch locator answers **where is the nearest outlet?** Branch Spatial Convenience asks a more useful question: **which outlet can satisfy what I need, and which option is most convenient right now?**

The system turns a distributed outlet network into a visible spatial information architecture:

`customer intent → service → outlet capability → availability → convenience → route`

## Repository prototype

The `prototype/index.html` file is a standalone, responsive HTML prototype based on the Co-op Bank case study developed in the design exploration.

It demonstrates:

- horizontal branch/service discovery
- fastest-service hero recommendation
- spatial scaffold navigation
- service-aware outlet matching
- light/dark mode
- keyboard navigation
- reduced-motion support
- optional haptics via the browser vibration API
- responsive desktop/tablet/mobile behaviour

## Product model

An outlet is represented as a set of capabilities rather than only a geographic point:

- services
- opening hours
- facilities
- accessibility
- status
- route information
- optional capacity/wait data

This makes the same architecture applicable to banking, healthcare, retail, telecom, logistics, automotive, government and other distributed physical networks.

## Convenience model

The prototype deliberately separates **nearest** from **most convenient**. A future production implementation can calculate a recommendation from distance, travel time, service capability, opening hours, queue/wait time, accessibility and user preferences.

The current Co-op prototype uses static demonstration data; it does not claim live branch queue information.

## Spatial language

The interface is structured as:

`network → outlet → capability → action`

The scaffold is therefore both navigation and information architecture, rather than a decorative card grid.

## Next integration layer

A production version can expose a service-aware endpoint such as:

```text
GET /convenience?intent=foreign-exchange&lat=...&lng=...
```

returning a recommended outlet plus reasons and alternatives.
