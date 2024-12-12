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

    const matches = []
    const foundStars = Object.keys(constellations).forEach(constellation => {
      const starNames = constellations[constellation].starNames
      const justMatches = starNames.forEach(starName => {

        stars.forEach(star => {
          if (starName === star.name) {
            matches.push(star)
          }
        })
      })
    })

    return matches.sort((a, b) => a.visualMagnitude - b.visualMagnitude)
  },

  starsByColor() {

    const colorGroups = stars.reduce((obj, star) => {
      if (!obj[star.color]) {
        obj[star.color] = []
      }
      if (!obj[star.color].includes(star)) {
        obj[star.color].push(star)
      }
      return obj
    }, {})
    return colorGroups

  },

  constellationsStarsExistIn() {

    const brightness = stars.sort((a, b) => a.visualMagnitude - b.visualMagnitude)
    const names = brightness.filter(star => star.constellation)
    return names.map(star => star.constellation)
  }
};


// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    let allDamage = 0
    let allWeapons = characters.flatMap(char => char.weapons)
    Object.keys(weapons).forEach(weapon => {
      allWeapons.forEach(hit => {
        if (hit === weapon) {
          allDamage += weapons[weapon].damage
        }
      })
    })
    return allDamage
  },

  charactersByTotal() {

    return characters.reduce((arr, hero) => {
      const key = hero.name
      const value = hero.weapons.reduce((obj, weapon) => {
        if (weapons[weapon]) {
          obj.damage += weapons[weapon].damage
          obj.range += weapons[weapon].range
        }
        return obj
      }, { damage: 0, range: 0 })
      arr.push({ [key]: value })
      return arr
    }, [])

  },
};


// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {

    let awesomeDinos = Object.keys(dinosaurs).filter(dino => dinosaurs[dino].isAwesome)
    return movies.reduce((obj, movie) => {
      let justMovieDinos = movie.dinos.filter(dino => awesomeDinos.includes(dino))
      if (!obj[movie.title]) {
        obj[movie.title] = justMovieDinos.length
      }
      return obj
    }, {})
  },

  averageAgePerMovie() {

    return movies.reduce((obj, movie) => {
      let ages = 0
      if (!obj[movie.director]) {
        obj[movie.director] = {}
      }
      const totalAge = movie.cast.reduce((sum, member) => {
        if (humans[member]) {
          sum += movie.yearReleased - humans[member].yearBorn
        }
        return sum
      }, 0)
      const avgAge = Math.floor(totalAge / movie.cast.length)
      obj[movie.director][movie.title] = avgAge
      return obj
    }, {})

  },

  uncastActors() {

    const unemployed = []
    Object.keys(humans).forEach(human => {
      const isEmployed = movies.some(movie => movie.cast.includes(human))
      if (!isEmployed) {
        unemployed.push({
          name: human,
          nationality: humans[human].nationality,
          imdbStarMeterRating: humans[human].imdbStarMeterRating
        })
      }
    })
    return unemployed.sort((a, b) => a.nationality.localeCompare(b.nationality))
  },

  actorsAgesInMovies() {

    const actorsAges = []
    Object.keys(humans).forEach(human => {
      const isEmployed = movies.some(movie => movie.cast.includes(human))

      if (isEmployed) {
        actorsAges.push({
          name: human,
          ages: movies.reduce((arr, movie) => {
            if (movie.cast.includes(human)) {
              arr.push(movie.yearReleased - humans[human].yearBorn)
            }
            return arr
          }, [])
        })
      }
    })
    return actorsAges
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
