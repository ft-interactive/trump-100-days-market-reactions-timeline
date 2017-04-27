export default () => ({ // eslint-disable-line

  // link file UUID
  id: 'c76e3d9c-2ab9-11e7-9ec8-168383da43b7',

  // canonical URL of the published page
  // "https://ig.ft.com/trump-100-days-market-reactions-timeline/" get filled in by the ./configure script
  url: 'https://ig.ft.com/trump-100-days-market-reactions-timeline/',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-04-28T00:00:00Z'),

  headline: 'Donald Trump’s first 100 days',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'A visual timeline of the events that moved markets during Trump’s first 100 days',

  topic: {
    name: 'Donald Trump',
    url: 'https://www.ft.com/donald-trump',
  },

  relatedArticle: {
    // text: 'Related article »',
    // url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  },

  mainImage: {
    title: '',
    description: '',
    url: '',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Joanna S Kao', url: 'https://www.ft.com/stream/authorsId/NWRlMDQ0Y2MtODA3Mi00N2VlLWEyZGItNWRmYTZhNDNiNWNi-QXV0aG9ycw==' },
    { name: 'Claire Manibog', url: 'https://www.ft.com/stream/authorsId/ZGVhNjk2NmEtN2ZkNy00NDllLTkyODAtYjE2NWNmNjg0NTcx-QXV0aG9ycw==' },
    { name: 'Lauren Leatherby', url: 'https://www.ft.com/stream/authorsId/YWVmZWY3ZmUtMWI4ZS00NjVlLWI2OGItNzU4NjYzY2NlMDRj-QXV0aG9ycw==' },
    { name: 'John Authers', url: 'https://www.ft.com/stream/authorsId/Q0ItMDAwMDkyMw==-QXV0aG9ycw==' },
  ],

  // Appears in the HTML <title>
  title: '',

  // meta data
  description: '',

  /*
  TODO: Select Twitter card type -
        "summary" or "summary_large_image"

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fig.ft.com%2Ftrump-100-days-market-reactions-timeline%2Fimages%2Ftrump-100-day-social.jpg?source=ig&width=1200',
  // socialHeadline: '',
  // socialSummary:  '',

  // TWITTER
  twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fig.ft.com%2Ftrump-100-days-market-reactions-timeline%2Fimages%2Ftrump-100-day-social.jpg?source=ig&width=1200',
  // twitterCreator: '@individual's_account',
  // tweetText:  '',
  // twitterHeadline:  '',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fig.ft.com%2Ftrump-100-days-market-reactions-timeline%2Fimages%2Ftrump-100-day-social.jpg?source=ig&width=1200',
  // facebookHeadline: '',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to "IG"
    however another value may be needed
    */
    // product: '',
  },
});
