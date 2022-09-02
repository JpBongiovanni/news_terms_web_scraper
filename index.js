const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const app = express()

const newspapers = [
    {
        name: 'alternet',
        address: 'https://www.alternet.org/',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'cnn',
        address: 'https://www.cnn.com/',
        base: ''
    },
    {
        name: 'demNow',
        address: 'https://www.democracynow.org/',
        base: ''
    },
    {
        name: 'dailyBeast',
        address: 'https://www.thedailybeast.com/',
        base: ''
    },
    {
        name: 'HuffPost',
        address: 'https://www.huffpost.com/',
        base: ''
    },
    {
        name: 'theIntercept',
        address: 'https://theintercept.com/',
        base: ''
    },
    {
        name: 'jacobin',
        address: 'https://jacobinmag.com/',
        base: ''
    },
    {
        name: 'motherJones',
        address: 'https://www.motherjones.com/',
        base: ''
    },
    {
        name: 'msnbc',
        address: 'https://www.msnbc.com/',
        base: ''
    },
    {
        name: 'theNewYorker',
        address: 'https://www.newyorker.com/',
        base: ''
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/',
        base: ''
    },
    {
        name: 'nation',
        address: 'https://www.thenation.com/',
        base: ''
    },
    {
        name: 'slate',
        address: 'https://slate.com/',
        base: ''
    },
    {
        name: 'vox',
        address: 'https://www.vox.com/',
        base: ''
    },
    {
        name: 'abc',
        address: 'https://abcnews.go.com/',
        base: ''
    },
    {
        name: 'abc',
        address: 'https://abcnews.go.com/',
        base: ''
    },
    {
        name: 'The Atlantic',
        address: 'https://www.theatlantic.com/',
        base: ''
    },
    {
        name: 'Bloomberg',
        address: 'https://www.bloomberg.com/',
        base: ''
    },
    {
        name: 'CBS',
        address: 'https://www.cbsnews.com/',
        base: ''
    },
    {
        name: 'Economist',
        address: 'https://www.economist.com/',
        base: ''
    },
]

const wordCount = []





//takes array, counts the duplicates and puts them in an object
function theCount(arr, count) {
    for(const element of arr){
        if(count[element]){
            count[element] += 1;
        } else {
            count[element] = 1;
        }
    }
}
//takes the object, and converts it back into a 2D array and sorts it
function sortCount(countArr, count){
    for(let element in count){
        countArr.push([element, count[element]])
    }
    countArr.sort(function(a, b) {
        return b[1] - a[1];
    })
}


newspapers.forEach(newspaper => {
    
    axios.get(newspaper.address)
        .then(response => {
            
            const html = response.data
            const $ = cheerio.load(html)
            $("a", html).each(function () {
                let title = $(this).text()
                //separate words in string and put them into a new array
                titleWords = title.split(" ")
                for(let i = 0; i <= titleWords.length-1; i++){
                    
                    //filter out irrelevant words
                    if(titleWords[i] && 
                        titleWords[i].match(/^[a-zA-Z]+$/) &&
                        titleWords[i] !== "Apr" &&
                        titleWords[i] !== "a" &&
                        titleWords[i] !== "A" &&
                        titleWords[i] !== "An" &&
                        titleWords[i] !== "an" && 
                        titleWords[i] !== "as" &&
                        titleWords[i] !== "As" &&
                        titleWords[i] !== "World" &&
                        titleWords[i] !== "world" &&
                        titleWords[i] !== "All" &&
                        titleWords[i] !== "Years" &&
                        titleWords[i] !== "Alex" &&
                        titleWords[i] !== "January" && 
                        titleWords[i] !== "February" &&
                        titleWords[i] !== "March" &&
                        titleWords[i] !== "April" &&
                        titleWords[i] !== "May" &&
                        titleWords[i] !== "June" &&
                        titleWords[i] !== "Video" &&
                        titleWords[i] !== "video" &&
                        titleWords[i] !== "July" &&
                        titleWords[i] !== "August" &&
                        titleWords[i] !== "September" &&
                        titleWords[i] !== "October" &&
                        titleWords[i] !== "November" &&
                        titleWords[i] !== "December" &&
                        titleWords[i] !== "to" &&
                        titleWords[i] !== "To" &&
                        titleWords[i] !== "in" &&
                        titleWords[i] !== "In" &&
                        titleWords[i] !== "is" &&
                        titleWords[i] !== "Is" &&
                        titleWords[i] !== "on" &&
                        titleWords[i] !== "On" &&
                        titleWords[i] !== "Us" &&
                        titleWords[i] !== "US" &&
                        titleWords[i] !== "My" &&
                        titleWords[i] !== "my" &&
                        titleWords[i] !== "So" &&
                        titleWords[i] !== "so" &&
                        titleWords[i] !== "Of" &&
                        titleWords[i] !== "her" &&
                        titleWords[i] !== "the" &&
                        titleWords[i] !== "The" &&
                        titleWords[i] !== "And" &&
                        titleWords[i] !== "and" &&
                        titleWords[i] !== "are" &&
                        titleWords[i] !== "Are" &&
                        titleWords[i] !== "for" &&
                        titleWords[i] !== "For" &&
                        titleWords[i] !== "Jun" &&
                        titleWords[i] !== "House" &&
                        titleWords[i] !== "all" &&
                        titleWords[i] !== "Contact" &&
                        titleWords[i] !== "Donald" &&
                        titleWords[i] !== "best" &&
                        titleWords[i] !== "one" &&
                        titleWords[i] !== "Daily" &&
                        titleWords[i] !== "say" &&
                        titleWords[i] !== "York" &&
                        titleWords[i] !== "He" &&
                        titleWords[i] !== "he" &&
                        titleWords[i] !== "El" &&
                        titleWords[i] !== "Other" &&
                        titleWords[i] !== "Subscribe" &&
                        titleWords[i] !== "subscribe" &&
                        titleWords[i] !== "up" &&
                        titleWords[i] !== "Up" &&
                        titleWords[i] !== "out" &&
                        titleWords[i] !== "but" &&
                        titleWords[i] !== "But" &&
                        titleWords[i] !== "You" &&
                        titleWords[i] !== "you" &&
                        titleWords[i] !== "Have" &&
                        titleWords[i] !== "have" &&
                        titleWords[i] !== "How" &&
                        titleWords[i] !== "how" &&
                        titleWords[i] !== "with" &&
                        titleWords[i] !== "With" &&
                        titleWords[i] !== "was" &&
                        titleWords[i] !== "Was" &&
                        titleWords[i] !== "why" &&
                        titleWords[i] !== "Why" &&
                        titleWords[i] !== "terms" &&
                        titleWords[i] !== "about" &&
                        titleWords[i] !== "I" &&
                        titleWords[i] !== "It" &&
                        titleWords[i] !== "it" &&
                        titleWords[i] !== "Please" &&
                        titleWords[i] !== "donate" &&
                        titleWords[i] !== "Lives" &&
                        titleWords[i] !== "Involved" &&
                        titleWords[i] !== "Columns" &&
                        titleWords[i] !== "Browse" &&
                        titleWords[i] !== "Keeps" &&
                        titleWords[i] !== "If" &&
                        titleWords[i] !== "Tip" &&
                        titleWords[i] !== "interesting" &&
                        titleWords[i] !== "Hollowed" &&
                        titleWords[i] !== "Jim" &&
                        titleWords[i] !== "Nick" &&
                        titleWords[i] !== "Kind" &&
                        titleWords[i] !== "Act" &&
                        titleWords[i] !== "Somebody" &&
                        titleWords[i] !== "Somewhere" &&
                        titleWords[i] !== "reveal" &&
                        titleWords[i] !== "hidden" &&
                        titleWords[i] !== "dots" &&
                        titleWords[i] !== "chain" &&
                        titleWords[i] !== "of" &&
                        titleWords[i] !== "About" &&
                        titleWords[i] !== "Politics" &&
                        titleWords[i] !== "We" &&
                        titleWords[i] !== "we" &&
                        titleWords[i] !== "New" &&
                        titleWords[i] !== "new" &&
                        titleWords[i] !== "What" &&
                        titleWords[i] !== "what" &&
                        titleWords[i] !== "at" &&
                        titleWords[i] !== "At" &&
                        titleWords[i] !== "Has" &&
                        titleWords[i] !== "has" &&
                        titleWords[i] !== "Can" &&
                        titleWords[i] !== "can" &&
                        titleWords[i] !== "More" &&
                        titleWords[i] !== "more" &&
                        titleWords[i] !== "Be" &&
                        titleWords[i] !== "be" &&
                        titleWords[i] !== "by" &&
                        titleWords[i] !== "By" &&
                        titleWords[i] !== "us" &&
                        titleWords[i] !== "his" &&
                        titleWords[i] !== "His" &&
                        titleWords[i] !== "that" &&
                        titleWords[i] !== "That" &&
                        titleWords[i] !== "this" &&
                        titleWords[i] !== "This" &&
                        titleWords[i] !== "News" &&
                        titleWords[i] !== "news" &&
                        titleWords[i] !== "Media" &&
                        titleWords[i] !== "media" &&
                        titleWords[i] !== "magazine" &&
                        titleWords[i] !== "Magazine" &&
                        titleWords[i] !== "after" &&
                        titleWords[i] !== "After" &&
                        titleWords[i] !== "Breaking" &&
                        titleWords[i] !== "Follow" &&
                        titleWords[i] !== "When" &&
                        titleWords[i] !== "when" &&
                        titleWords[i] !== "Do" &&
                        titleWords[i] !== "do" &&
                        titleWords[i] !== "Know" &&
                        titleWords[i] !== "know" &&
                        titleWords[i] !== "Says" &&
                        titleWords[i] !== "says" &&
                        titleWords[i] !== "Out" &&
                        titleWords[i] !== "our" &&
                        titleWords[i] !== "Our" &&
                        titleWords[i] !== "your" &&
                        titleWords[i] !== "Your" &&
                        titleWords[i] !== "they" &&
                        titleWords[i] !== "They" &&
                        titleWords[i] !== "back" &&
                        titleWords[i] !== "Back" &&
                        titleWords[i] !== "get" &&
                        titleWords[i] !== "Get" &&
                        titleWords[i] !== "take" &&
                        titleWords[i] !== "Take" &&
                        titleWords[i] !== "Could" &&
                        titleWords[i] !== "could" &&
                        titleWords[i] !== "Now" &&
                        titleWords[i] !== "now" &&
                        titleWords[i] !== "byslZC" &&
                        titleWords[i] !== "from" &&
                        titleWords[i] !== "Getty" &&
                        titleWords[i] !== "Images" &&
                        titleWords[i] !== "dnUTOP" &&
                        titleWords[i] !== "Over" &&
                        titleWords[i] !== "Policy" &&
                        titleWords[i] !== "their" &&
                        titleWords[i] !== "will" &&
                        titleWords[i] !== "not" &&
                        titleWords[i] !== "Not" &&
                        titleWords[i] !== "David" &&
                        titleWords[i] !== "its" &&
                        titleWords[i] !== "End" &&
                        titleWords[i] !== "against" &&
                        titleWords[i] !== "People" &&
                        titleWords[i] !== "people" &&
                        titleWords[i] !== "than" &&
                        titleWords[i] !== "Most" &&
                        titleWords[i] !== "fydubv" &&
                        titleWords[i] !== "were" &&
                        titleWords[i] !== "Aug" &&
                        titleWords[i] !== "men" &&
                        titleWords[i] !== "MSNBC" &&
                        titleWords[i] !== "most" &&
                        titleWords[i] !== "over" &&
                        titleWords[i] !== "Terms of Use" &&
                        titleWords[i] !== "Terms" &&
                        titleWords[i] !== "privacy policy" &&
                        titleWords[i] !== "Privacy Policy" &&
                        titleWords[i] !== "Privacy" &&
                        titleWords[i] !== "CBS" &&
                        titleWords[i] !== "Podcasts" &&
                        titleWords[i] !== "into" &&
                        titleWords[i] !== "Into" &&
                        titleWords[i] !== "who" &&
                        titleWords[i] !== "Day" &&
                        titleWords[i] !== "day" &&
                        titleWords[i] !== "Books" &&
                        titleWords[i] !== "Newsletters" &&
                        titleWords[i] !== "American" &&
                        titleWords[i] !== "first" &&
                        titleWords[i] !== "Business" &&
                        titleWords[i] !== "Entertainment" &&
                        titleWords[i] !== "Will" &&
                        titleWords[i] !== "Reports" &&
                        titleWords[i] !== "make" &&
                        titleWords[i] !== "One" &&
                        titleWords[i] !== "Help" &&
                        titleWords[i] !== "found" &&
                        titleWords[i] !== "CNN" &&
                        titleWords[i] !== "Advertise" &&
                        titleWords[i] !== "Since" &&
                        titleWords[i] !== "Jan" &&
                        titleWords[i] !== "Feb" &&
                        titleWords[i] !== "Mar" &&
                        titleWords[i] !== "Apr" &&
                        titleWords[i] !== "May" &&
                        titleWords[i] !== "Jun" &&
                        titleWords[i] !== "Jul" &&
                        titleWords[i] !== "Aug" &&
                        titleWords[i] !== "Sep" &&
                        titleWords[i] !== "Oct" &&
                        titleWords[i] !== "Nov" &&
                        titleWords[i] !== "Dec" &&
                        titleWords[i] !== "Travel" &&
                        titleWords[i] !== "them" &&
                        titleWords[i] !== "some" &&
                        titleWords[i] !== "Should" &&
                        titleWords[i] !== "may" &&
                        titleWords[i] !== "Use" &&
                        titleWords[i] !== "time" &&
                        titleWords[i] !== "just" &&
                        titleWords[i] !== "view" &&
                        titleWords[i] !== "Would" &&
                        titleWords[i] !== "life" &&
                        titleWords[i] !== "Work" &&
                        titleWords[i] !== "Coupons" &&
                        titleWords[i] !== "Service" &&
                        titleWords[i] !== "From"
                    )
                    wordCount.push(titleWords[i])
                } 
            })
        })
})



app.get('/', (req, res) => {
    res.json('Welcome to my News API, go to /news to see the top utilized terms in real time')
})

app.get('/news', (req, res) => {
    const count = {}
    const countArr = []
    theCount(wordCount, count)
    sortCount(countArr, count)
    res.json(countArr)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))