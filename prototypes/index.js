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
    return clubs.reduce((obj, club) => {
      club.members.forEach((member) => {
        if (obj[member]) {
          obj[member].push(club.club)
        } else {
          obj[member] = [club.club]
        }
      })
      return obj
    }, {})
  }
}
  ;


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
      return acc += cake.inStock
    }, 0)
    return allCakes
  },

  allToppings() {
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

    const sortedGames = boardGames[type].map((game) => game.name)
    sortedGames.sort()
    return sortedGames

  },

  findHighestRatedGamesByType(type) {

    const bestGame = boardGames[type].reduce((highest, game) => {
      return (highest.rating > game.rating) ? highest : game
    })
    return bestGame

  },

  averageScoreByType(type) {
   
    const gameScore = boardGames[type].reduce((score, game) => {
      score += game.rating
      return score
    }, 0)
    return gameScore / boardGames[type].length
  },

  averageScoreByTypeAndPlayers(type, maximumPlayers) {

    const score = boardGames[type].filter((game) => game.maxPlayers === maximumPlayers)
    const avgScore = score.reduce((acc, game) => {
      acc += game.rating
      return acc
    }, 0)
    return avgScore / score.length
  }
};


// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {

    const teachers = instructors.map(instructor => {
      const students = cohorts.filter(cohort => cohort.module === instructor.module)
      const collectedStudents = students.reduce((sum, cohort) => sum + cohort.studentCount, 0)
      return ({ name: instructor.name, studentCount: collectedStudents })
    })

    return teachers
  },

  studentsPerInstructor() {

    const students = cohorts.reduce((object, cohort) => {
      const teachers = instructors.filter(instructor => instructor.module === cohort.module)
      object[`cohort${cohort.cohort}`] = cohort.studentCount / teachers.length
      return object
    }, {})

    return students
  },

  modulesPerTeacher() {

    return instructors.reduce((acc, instructor) => {
      if (!acc[instructor.name]) {
        acc[instructor.name] = [];
      }
      instructor.teaches.forEach(topic => {
        cohorts.forEach(cohort => {
          cohort.curriculum.forEach(curriculum => {
            if (topic === curriculum && !acc[instructor.name].includes(cohort.module)) {
              acc[instructor.name].push(cohort.module)
            }
          })
        })
      })
      acc[instructor.name].sort((a, b) => a - b)
      return acc
    }, {})
  },

  curriculumPerTeacher() {

    let topicObj = {};
    cohorts.forEach(classes => {
      classes.curriculum.forEach(topic => { 
        if (!topicObj[topic]) {
          topicObj[topic] = []
        }
        instructors.forEach(teach => {
          teach.teaches.forEach(lesson => {
            if (topic.includes(lesson) && !topicObj[topic].includes(teach.name)) {
              topicObj[topic].push(teach.name)
            }
          })
        })
      })

    })
    return topicObj
  }
};


// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {

    const keys = Object.keys(bosses).flatMap((boss) => {
      return [{
        bossName: bosses[boss].name, 
        sidekickLoyalty: bosses[boss].sidekicks.reduce((sum, sidekick) => {
          const match = sidekicks.find(helper => helper.name === sidekick.name)
          if (match) {
            sum += match.loyaltyToBoss
          }
          return sum
        }, 0)
      }]
    })
    return keys
  }
}


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
const matches = []
const foundStars = Object.keys(constellations).forEach(constellation => {
  const starNames = constellations[constellation].starNames
  const justMatches = starNames.forEach(starName => {

    stars.forEach(star => {
      if(starName === star.name) {
        matches.push(star)
      }
    })
  })
  
})

return matches.sort((a,b)=> a.visualMagnitude - b.visualMagnitude)
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
