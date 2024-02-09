# Algolia Project

#### By Garrett Long

---

## Description

This project is a workflow for copying rules from one index to another index.

## Links

- [Live Demo](https://algolia-project.vercel.app/)
- [Github](https://github.com/getsalty/Algolia-Project)

## Architecture / Descision Making

#### Pages

- `/`
  - The main page - used for the whole workflow. I chose not to separate the workflow out into sub-pages due to not wanting the workflow to become split.
  - The main components for this page live within the `~/components/Landing` directory
- `404`
  - Basic 404

#### Auth

- I chose to go with Github authentication, but locally I was testing with both Github and Twitter.

#### CSS

- I noticed that many components on Algolia's website utilize `@algolia/satellite`. This seemed to be a wrapper around Tailwind, so I decided to mainly use Tailwind in this project.

#### Components

- I tried to mirror the main aspects of the Index/Rules tables on the Algolia Dashboard webpage. I did not add in all features (like sorting columns and select all functionality) due to time.

- I tried to use the `Instant Search` component from Algolia, but I did not fully understand how it filtered data structures on the backend and how it auto-magically updated the Widgets it contained. Since I could not come up with a way for finding / filtering indexes and rules, I ended up not using it.

#### Dataflow

- I used TRPC as the connection between front-end and back-end. This allowed me to have a fully type safe connection between the two sections. The main entry point for API calls is `~/pages/api/trpc/[trpc].ts`.

- I separated out the service for interfacing with Algolia. This service resides in `~/services/algolia.ts`. These services are called from the TRPC entry point.
- The Algolia service hosts the connection to Algolia, as well as the functionality for getting / setting Algolia data.

- I chose to only have one connection to Algolia and keep it on the back-end (instead of using the read-only token on the front-end as well).
