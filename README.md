<div align="center">
  <br>
  <img src="public/logo.png" width="100">
  <h1>Vex Collective</h1>
  <br>
</div>

### What is this?

<br>

**Vex Collective** is a tool for visualizing your character's statistics using a variety of methods such as heatmaps, radar charts, and graphs.

A collection of data is pulled from the Destiny API and made available for easier navigation.

Vex Collective is a tool I created to explore the Destiny API and potentially provide some useful information for myself and anyone else.

<h1></h1>

### Features

- API Explorer
  - Send GET and POST requests to every _Destiny 2_ endpoint from the Bungie API.
  - Explore the Destiny 2 Manifest and get more detailed data about characters, activities, items, etc.
- Character Statistics

  - View your characters equipped inventory and weapon/armor stats.
  - View your accounts Crucible stats and character stats such as time played, earned Triumphs, etc.

- [ ] Add feature to view lore books, similar to in-game

### Todo

- [ ] Make image links clickable in data explorer
- [ ] View Triumps/Records
- [ ] See character's most recently played PvP match and statistics
- [x] View general overview of overall stats (KD,KDA,KAD,Total Kills/Deaths/Assists, Precision Kills, Suicides, Wins, Losses, Win/Loss Ratio, Time Played in Crucible, Score, Combat Rating, Average Lifespan, Resurrections)
- [x] View stats of weapon usage (accuracy, kills, precision kills)
- [ ] View more medals earned on account, and the "golden medals"
- [x] Add button to show profile JSON tree in stats page
- [x] Redesign stats page to show currently equipped gear

### Tools

- **IndexedDB** for storing the Destiny 2 Manifest in browser memory (reduces the number of times a user has to download the massive manifest and all its definitions)
- [**Next.js**](https://nextjs.org/)
- [**Zustand**](https://zustand-demo.pmnd.rs/) for state management
- [**Mantine**](https://mantine.dev) for some UI componenets
- [**Tailwind CSS**](https://tailwindcss.com/) for more custom CSS
- [**tRPC**](https://trpc.io/) for handling the backend
- [**bungie-api-ts**](https://github.com/DestinyItemManager/bungie-api-ts) for getting TypeScript types for my requests to the Destiny 2 API
