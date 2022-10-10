---
title: 🚨 Weekly linkcheck failed
labels: Maintanance, bug
---

On devportal, we check the links on a weekly basis to ensure the links in on our docs are working.

The last ``linkcheck`` run failed, so it may have found broken links on the devportal docs. Partial logs output can be found here:

{{ env.BROKEN }}

For full logs, check the [last workflow run](https://github.com/aiven/devportal/actions/workflows/linkcheck.yaml) on {{ date | date('dddd, MMM Do YYYY, hh:mm A') }} (UTC) to see the broken links and fix it.