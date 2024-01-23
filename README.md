# ContentDash

## Description

This web application connects with various media platforms to show live streams and recent videos via OAuth 2.0 connections

## TODO

- [x] Twitch Integration
  - [x] Show live followed channels
  - [ ] Be able to watch live in the page
- [x] YouTube Integration
  - [x] videos from subscriptions
  - [x] Figure out quota "costs"
  - [x] automatically "refresh" the token if it is no longer good
  - [x] Seperate live from VODs?
    > This is not possible, as there is no differentiation between livestreams and videos
  - [x] "Paginate" YouTube videos, showing 8 at a time
    - [ ] Figure out why the screen moves when loading the next videos
  - [ ] Be able to watch videos in the page
- [x] Filters on main page
  - [x] Show/Hide providers
  - [x] Filter YouTube Videos by Channel
- [ ] Preferences Page
  - [ ] Integrations lists and other preferences
    > Do this as a form with form submission
- [ ] "FAQ" Page
  - [ ] Can't add Netflix, because there is no public API anymore
- [x] Update eslint config
- [x] Better loading indicators

## Notes

- The YouTube API Quota usage should be ~27 units per page refresh
  - 1 unit to get subscribed channels
    - Currently fetches the most recently active 25 channels
  - 1 unit to get the uploads playlist from those channels
  - 1 (25 total) unit PER channel to get video information from those playlists
- This means the application should be able to refresh subscription videos ~370 times before the daily quota is hit
  - This might either needs to be raised eventually, or see if there is a more quota efficient way to do this
