const db = require("../src/config/db.config");


// ================= ACTORS =================
const actorsData = [
  // Dune
  { name: "Timothée Chalamet", birthday: "1995-12-27", nationality: "USA", gender: "MALE" },
  { name: "Zendaya", birthday: "1996-09-01", nationality: "USA", gender: "FEMALE" },
  { name: "Rebecca Ferguson", birthday: "1983-10-19", nationality: "Sweden", gender: "FEMALE" },
  { name: "Josh Brolin", birthday: "1968-02-12", nationality: "USA", gender: "MALE" },
  { name: "Austin Butler", birthday: "1991-08-17", nationality: "USA", gender: "MALE" },

  // Deadpool
  { name: "Ryan Reynolds", birthday: "1976-10-23", nationality: "Canada", gender: "MALE" },
  { name: "Hugh Jackman", birthday: "1968-10-12", nationality: "Australia", gender: "MALE" },
  { name: "Emma Corrin", birthday: "1995-12-13", nationality: "UK", gender: "OTHER" },
  { name: "Morena Baccarin", birthday: "1979-06-02", nationality: "Brazil", gender: "FEMALE" },
  { name: "Matthew Macfadyen", birthday: "1974-10-17", nationality: "UK", gender: "MALE" },

  // thêm tiếp toàn bộ actors...
  { name: "Jack Black", birthday: "1969-08-28", nationality: "USA", gender: "MALE" },
  { name: "Awkwafina", birthday: "1988-06-02", nationality: "USA", gender: "FEMALE" },
  { name: "Viola Davis", birthday: "1965-08-11", nationality: "USA", gender: "FEMALE" },
  { name: "Dustin Hoffman", birthday: "1937-08-08", nationality: "USA", gender: "MALE" },
  { name: "James Hong", birthday: "1929-02-22", nationality: "USA", gender: "MALE" },

  { name: "Amy Poehler", birthday: "1971-09-16", nationality: "USA", gender: "FEMALE" },
  { name: "Phyllis Smith", birthday: "1951-07-10", nationality: "USA", gender: "FEMALE" },
  { name: "Lewis Black", birthday: "1948-08-30", nationality: "USA", gender: "MALE" },
  { name: "Tony Hale", birthday: "1970-09-30", nationality: "USA", gender: "MALE" },
  { name: "Maya Hawke", birthday: "1998-07-08", nationality: "USA", gender: "FEMALE" },

  { name: "Tom Cruise", birthday: "1962-07-03", nationality: "USA", gender: "MALE" },
  { name: "Hayley Atwell", birthday: "1982-04-05", nationality: "UK", gender: "FEMALE" },
  { name: "Ving Rhames", birthday: "1959-05-12", nationality: "USA", gender: "MALE" },
  { name: "Simon Pegg", birthday: "1970-02-14", nationality: "UK", gender: "MALE" },

  { name: "Keanu Reeves", birthday: "1964-09-02", nationality: "Canada", gender: "MALE" },
  { name: "Donnie Yen", birthday: "1963-07-27", nationality: "Hong Kong", gender: "MALE" },
  { name: "Bill Skarsgård", birthday: "1990-08-09", nationality: "Sweden", gender: "MALE" },
  { name: "Laurence Fishburne", birthday: "1961-07-30", nationality: "USA", gender: "MALE" },
  { name: "Hiroyuki Sanada", birthday: "1960-10-12", nationality: "Japan", gender: "MALE" },

];

// ================= MOVIES =================
const moviesData = [
  {
    title: "Dune: Part Two",
    type: "ACTING",
    cast: [
      ["Timothée Chalamet", "Paul Atreides"],
      ["Zendaya", "Chani"],
      ["Rebecca Ferguson", "Lady Jessica"],
      ["Josh Brolin", "Gurney Halleck"],
      ["Austin Butler", "Feyd-Rautha"],
    ],
  },
  {
    title: "Deadpool & Wolverine",
    type: "ACTING",
    cast: [
      ["Ryan Reynolds", "Deadpool"],
      ["Hugh Jackman", "Wolverine"],
      ["Emma Corrin", "Villain"],
      ["Morena Baccarin", "Vanessa"],
      ["Matthew Macfadyen", "Paradox"],
    ],
  },
  {
    title: "Inside Out 2",
    type: "VOICE",
    cast: [
      ["Amy Poehler", "Joy"],
      ["Phyllis Smith", "Sadness"],
      ["Lewis Black", "Anger"],
      ["Tony Hale", "Fear"],
      ["Maya Hawke", "Anxiety"],
    ],
  },
  {
    title: "Kung Fu Panda 4",
    type: "VOICE",
    cast: [
      ["Jack Black", "Po"],
      ["Awkwafina", "Zhen"],
      ["Viola Davis", "Villain"],
      ["Dustin Hoffman", "Shifu"],
      ["James Hong", "Mr. Ping"],
    ],
  },
  {
    title: "Mission: Impossible – Dead Reckoning",
    type: "ACTING",
    cast: [
      ["Tom Cruise", "Ethan Hunt"],
      ["Hayley Atwell", "Grace"],
      ["Ving Rhames", "Luther"],
      ["Simon Pegg", "Benji"],
      ["Rebecca Ferguson", "Ilsa"],
    ],
  },
  {
    title: "John Wick: Chapter 4",
    type: "ACTING",
    cast: [
      ["Keanu Reeves", "John Wick"],
      ["Donnie Yen", "Caine"],
      ["Bill Skarsgård", "Marquis"],
      ["Laurence Fishburne", "Bowery King"],
      ["Hiroyuki Sanada", "Shimazu"],
    ],
  },
];

// ================= SEED =================
async function seed() {
  try {
    console.log("🌱 Seeding...");

    // Insert actors
    for (const actor of actorsData) {
      await db.execute(
        `INSERT INTO actors (name, birthday, nationality, gender)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=name`,
        [actor.name, actor.birthday, actor.nationality, actor.gender]
      );
    }

    console.log("✅ Actors done");

    // Insert movie_cast
    for (const movie of moviesData) {
      const [movieRows] = await db.execute(
        `SELECT id FROM movies WHERE title = ?`,
        [movie.title]
      );

      if (!movieRows.length) {
        console.log("❌ Missing movie:", movie.title);
        continue;
      }

      const movieId = movieRows[0].id;

      for (let i = 0; i < movie.cast.length; i++) {
        const [name, character] = movie.cast[i];

        const [actorRows] = await db.execute(
          `SELECT id FROM actors WHERE name = ?`,
          [name]
        );

        if (!actorRows.length) continue;

        await db.execute(
          `INSERT INTO movie_cast 
          (movie_id, actor_id, character_name, role_type, is_main, cast_order)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            movieId,
            actorRows[0].id,
            character,
            movie.type,
            i < 2,
            i + 1,
          ]
        );
      }
    }

    console.log("✅ DONE");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();