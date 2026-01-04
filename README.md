# RoboRank

**The competitive infrastructure for robotics sport.**

RoboRank is a unified platform for competitive robotics — providing Elo-based ratings, tournament management, and global leaderboards for robotics competitions worldwide.

![RoboRank](public/assets/logo2.png)

## Features

- **Unified Rating System** — Elo-based ratings across multiple disciplines (Sumo, Line Following, Combat, Hackathons)
- **Global Leaderboards** — Track individual competitors and teams worldwide
- **Tournament Discovery** — Find and register for upcoming robotics competitions
- **Live Tournament Brackets** — Real-time bracket updates and match tracking
- **Competitor Profiles** — Detailed stats, rating history, and achievements
- **Team Rankings** — Organizational leaderboards for schools, clubs, and teams

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Font Awesome 6

## Installation

```bash
# Clone the repository
git clone https://github.com/Ibrahim-almafrajy/RoboRank.git

# Navigate to the project
cd RoboRank

# Install dependencies
npm install

# Start development server
npm run dev
```

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Project Structure

```
RoboRank/
├── public/
│   └── assets/          # Static assets (logos, favicons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── data/            # Mock data (users, tournaments, matches)
│   ├── App.jsx          # Main app component
│   └── index.jsx        # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Disciplines

| Discipline | Description |
|------------|-------------|
| **Sumo** | Robot sumo wrestling competitions |
| **Line Following** | Autonomous line-tracking races |
| **Combat** | Robot combat and battle bots |
| **Hackathon** | Robotics hackathon challenges |

## Deployment

This project is deployed on [Vercel](https://vercel.com). Any push to the main branch triggers automatic deployment.

## Authors

- **Ibrahim Almafraji**
- **Vibhav Govardhanagiri**

## License

This project was created for educational/hackathon purposes.

---

*Built for the global robotics community*
