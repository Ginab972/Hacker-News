import Story from '../components/Story.js';
import view from '../utils/view.js';
import baseUrl from '../utils/baseUrl.js';

export default async function Stories(path) {
    const stories = await getStories(path);
    const hasStories = stories.length > 0;

    view.innerHTML = `<div>
    ${hasStories ? stories.map((story, i) => Story({...story, index: i +1 })).join('') : 'No stories'}
    </div>`;
}

async function getStories(path) {
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    if (isHomeRoute) {
        path = '/news';
    } else if (isNewRoute) {
        path = '/newest';
    }
    const response = await fetch(`${baseUrl}${path}`);
    const stories = await response.json();
    return stories;
}


// https://node-hnapi.herokuapp.com

// / (Top) -> /new

//  / new (new)  https://news.ycombinator.com/newest

//  / (ask) - >  https://news.ycombinator.com/ask

//  / (show) -> https://news.ycombinator.com/show

//  / (job) -> https://news.ycombinator.com/jobs

//id, title, points, user, time, time_ago, comments_count, type, url, domain,