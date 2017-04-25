import * as bertha from 'bertha-client';
import * as d3TimeFormat from 'd3-time-format';
import moment from 'moment';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async () => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  const data = await bertha.get('1GGUiKq2qc4DkedcYNA4gqOoDar06jlTfaORH3ASXXPo', ['events', 'top|object']).then((result) => {
    const events = result.events.sort((a, b) => new Date(a.date) - new Date(b.date));
    events.forEach((event) => {
      event.numDay = moment(event.date).diff(moment([2017, 0, 20]), 'days');
      event.dateTimelineFormatted = d3TimeFormat.timeFormat('%b %d')(new Date(event.date));
    });

    return {
      events,
      text: result.top,
    };
  }).catch(e => console.log('Error fetching from Bertha', e));
  /*
  An experimental demo that gets content from the API
  and overwrites some model values. This requires the Link File
  to have been published. Also next-es-interface.ft.com probably
  isn't a reliable source. Also this has no way to prevent development
  values being seen in productions... use with care.

  try {
    const a = (await axios(`https://next-es-interface.ft.com/content/${d.id}`)).data;
    d.headline = a.title;
    d.byline = a.byline;
    d.summary = a.summaries[0];
    d.title = d.title || a.title;
    d.description = d.description || a.summaries[1] || a.summaries[0];
    d.publishedDate = new Date(a.publishedDate);
    f.comments = a.comments;
  } catch (e) {
    console.log('Error getting content from content API');
  }

  */

  d.headline = data.text.headline;
  d.summary = data.text.standfirst;

  return {
    ...d,
    flags,
    onwardJourney,
    data,
  };
};
