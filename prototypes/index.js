const { kitties } = require('./datasets/kitties');
const { puppers } = require('./datasets/puppers');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { weather } = require('./datasets/weather');
const { boardGames } = require('./datasets/boardGames');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');
const { clubs } = require('./datasets/clubs')



// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangePetNames(kittyData) {
    const orangeKitties = kittyData.filter((cat) => {
      return cat.color === 'orange'
    })
    const orangeKittyNames = orangeKitties.map((cat) => {
      return cat.name
    })

    return orangeKittyNames
  },

  sortByAge(catAges) {
    const orderOfAge = catAges.sort((a, b) => {
      return b.age - a.age
    })
    return orderOfAge
  },

  growUp(kitties) {
    return kitties.map((cat) => {
      return {
        name: cat.name,
        age: cat.age + 2,
        color: cat.color
      }
    })
  }
};


// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    const memberClubs = clubs.reduce((acc, curr) => {
      curr.members.forEach((member) => {
        if (acc[member]) {
          acc[member].push(curr.club)
        } else {
          acc[member] = [curr.club]
        }
      })
      return acc
    }, {})

    return memberClubs
  }
};


const modPrompts = {
  studentsPerMod() {

    const studentsPerInstructor = mods.map((cohort) => ({ mod: cohort.mod, studentsPerInstructor: cohort.students / cohort.instructors }))
    return studentsPerInstructor
  }
};

const cakePrompts = {
  stockPerCake() {

    const cakeStock = cakes.map((cake) => ({ flavor: cake.cakeFlavor, inStock: cake.inStock }))
    return cakeStock
  },

  onlyInStock() {
    const cakesInStock = cakes.filter((cake) => cake.inStock)
    return cakesInStock
  },

  totalInventory() {
    const allCakes = cakes.reduce((acc, cake) => {
      return acc + cake.inStock
    }, 0)
    return allCakes
  },

  allToppings() {
    //     const allToppings = [...new Set(cakes.flatMap(cake => cake.toppings))]
    // return allToppings
    const allToppings = cakes.reduce((acc, cake) => {
      cake.toppings.forEach((topping) => {
        if (!acc.includes(topping)) {
          acc.push(topping)
        }
      })
      return acc
    }, [])
    return allToppings
  },

  groceryList() {
    const groceries = cakes.reduce((acc, cake) => {
      cake.toppings.forEach((topping) => {
        if (!acc[topping]) {
          acc[topping] = 1
        } else {
          acc[topping] += 1
        }
      })
      return acc
    }, {})
    return groceries
  }
};

// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    const feRooms = classrooms.filter((classroom) => classroom.program === 'FE')
    return feRooms
  },

  totalCapacities() {
    const capacities = classrooms.reduce((acc, classroom) => {
      if (!acc[classroom.program]) {
        acc[classroom.program] = 0
      }
      acc[classroom.program] += classroom.capacity
      return acc
    }, {})
    return {
      feCapacity: capacities['FE'],
      beCapacity: capacities['BE']
    }
  },

  sortByCapacity() {
    const allCapacity = classrooms.sort((a, b) => a.capacity - b.capacity)
    return allCapacity
  }
};


// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence(books) {
    const nonViolentBooks = books.filter((book) => (!book.genre.includes('Horror') && (!book.genre.includes('True Crime'))))
    nonViolentTitles = nonViolentBooks.reduce((acc, book) => {
      acc.push(book.title)
      return acc
    }, [])
    return nonViolentTitles
  },

  getNewBooks(books) {
    const newerBooks = books
      .filter(book => book.published >= 1990)
      .map((book => ({
        title: book.title,
        year: book.published
      })))
    return newerBooks
  },

  getBooksByYear(books, year) {
    const newerBooks = books
      .filter(book => book.published >= year)
      .map((book => ({
        title: book.title,
        year: book.published
      })))
    return newerBooks
  }
};


// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    let allTemps = []
    weather.forEach((location) => {
      allTemps.push((location.temperature.high + location.temperature.low) / 2)
    })
    return allTemps
  },

  findSunnySpots() {
    let sunnySpots = []
    weather.forEach((location) => {
      if (location.type.includes('sunny')) {
        sunnySpots.push(`${location.location} is ${location.type}.`)
      }
    })
    return sunnySpots
  },

  findHighestHumidity() {
    const wetPlaces = weather.sort((a, b) => b.humidity - a.humidity)
    let wettestPlace = wetPlaces.shift()
    return wettestPlace
  }
};

// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    let parkList = {
      parksToVisit: [],
      parksVisited: []
    }
    nationalParks.forEach((park) => {
      if (park.visited) {
        parkList.parksVisited.push(park.name)
      } else {
        parkList.parksToVisit.push(park.name)
      }
    })
    return parkList
  },

  getParkInEachState() {

    const orderedParks = nationalParks.reduce((acc, park) => {
      let eachPark = { [park.location]: park.name }
      acc.push(eachPark)
      return acc
    }, [])
    return orderedParks
  },

  getParkActivities() {
    let parkActivities = []
    nationalParks.forEach((park) => {
      park.activities.forEach((activity) => {
        if (!parkActivities.includes(activity)) {
          parkActivities.push(activity)
        }
      })
    })
    return parkActivities
  }
}


// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    let allBeers = []
    const allBrews = breweries.forEach((brewery) => {
      brewery.beers.forEach((beer) => {
        allBeers.push(beer.name)
      })
    })
    return allBeers.length
  },

  getBreweryBeerCount() {
    const breweryTapLists = breweries.map(brewery => ({
      name: brewery.name,
      beerCount: brewery.beers.length
    }))
    return breweryTapLists
  },

  getSingleBreweryBeerCount(breweryName) {

    const beerLength = breweries.find(brewery => brewery.name === breweryName)
    return beerLength.beers.length

  },

  findHighestAbvBeer() {

    const hangover = breweries.flatMap(brewery => brewery.beers)
    hangover.sort((a, b) => b.abv - a.abv)
    return hangover[0]

  }
};

// DATASET: weather from './datasets/boardGames

const boardGamePrompts = {
  listGames(type) {

    const certainGames = boardGames[type].map((game) => game.name)
    return certainGames
  },

  listGamesAlphabetically(type) {
    // Return an array of just the names of the games within a specified 
    // type, sorted alphabetically. 
    // e.g. given an argument of "childrens", return
    // ["Candy Land", "Connect Four", "Operation", "Trouble"]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  findHighestRatedGamesByType(type) {
    // Return an object which is the highest rated game within the specified type.
    // e.g. given the argument of 'party', return
    // { name: 'Codenames', rating: 7.4, maxPlayers: 8 },

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  averageScoreByType(type) {
    // Return the average score for the specified type.
    // e.g. given the argument of "strategy", return 7
    // note: do not worry about rounding your result.

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  averageScoreByTypeAndPlayers(type, maximumPlayers) {
    // Return the average score of any games that match the specified type
    // and maximum number of players.
    // e.g. given the arguments of "strategy" and 2, return 6.16666666667
    // note: do not worry about rounding your result.

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the star objects that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   {
    //     name: 'Achernar',
    //     visualMagnitude: 0.46,
    //     constellation: 'The Plow',
    //     lightYearsFromEarth: 140,
    //     color: 'blue'
    //   },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' },
    //   {
    //     name: 'Hadar',
    //     visualMagnitude: 0.61,
    //     constellation: 'The Little Dipper',
    //     lightYearsFromEarth: 350,
    //     color: 'blue'
    //   }
    // ]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Sort the stars by brightness and return an array of the star's constellation names
    // Brightest Stars are indicated by visualMagnitude - the lower the number, the brighter the star
    // e.g.
    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts,
  boardGamePrompts,
};
