class Destination {
  constructor(name, pictureFileName = "logo.png", region="eu", displayedPrice = 800, perDayPrice = 80, description="Un super voyage proposé par votre agence de voyage favorite", availability="Now", adultsMax = 6, areAnimalsAllowed = false, breakfastAvailable = true, dinnerAvailable = false,)
  {
    this.name = name
    this.city=city
    this.pictureFileName = pictureFileName
    this.region = region // eu ou as ou am
    this.displayedPrice = displayedPrice
    this.perDayPrice = perDayPrice
    this.description = description
    this.availability = availability
    this.adultsMax = adultsMax
    this.animalsAllowed = areAnimalsAllowed
    this.breakfastAvailable = breakfastAvailable
    this.dinnerAvailable = dinnerAvailable
  }
}

class UserData {
  constructor(username, password)
  {
    this.username = username
    this.password = password
  }
}

class WebsiteData  {
  constructor(destinationsList, usersList){
    this.destinationsList = destinationsList
    this.usersList = usersList
  }
}