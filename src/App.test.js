import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import App from './App';

jest.mock('./api/fetchShow');

const show = {
    data: {
        "id": 2993,
        "url": "http://www.tvmaze.com/shows/2993/stranger-things",
        "name": "Stranger Things",
        "type": "Scripted",
        "language": "English",
        "genres": [
            "Drama",
            "Fantasy",
            "Science-Fiction"
        ],
        "status": "Running",
        "runtime": 60,
        "premiered": "2016-07-15",
        "officialSite": "https://www.netflix.com/title/80057281",
        "schedule": {
            "time": "",
            "days": [
                "Thursday"
            ]
        },
        "rating": {
            "average": 8.7
        },
        "weight": 98,
        "network": null,
        "webChannel": {
            "id": 1,
            "name": "Netflix",
            "country": null
        },
        "externals": {
            "tvrage": 48493,
            "thetvdb": 305288,
            "imdb": "tt4574334"
        },
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
        },
        "summary": "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
        "updated": 1582785474,
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/shows/2993"
            },
            "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1576476"
            }
        },
        "_embedded": {
            "episodes": [
                {
                    "id": 578669,
                    "url": "http://www.tvmaze.com/episodes/578669/stranger-things-1x08-chapter-eight-the-upside-down",
                    "name": "Chapter Eight: The Upside Down",
                    "season": 1,
                    "number": 8,
                    "airdate": "2016-07-15",
                    "airtime": "",
                    "airstamp": "2016-07-15T12:00:00+00:00",
                    "runtime": 60,
                    "image": {
                        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/67/168926.jpg",
                        "original": "http://static.tvmaze.com/uploads/images/original_untouched/67/168926.jpg"
                    },
                    "summary": "<p>Jim convinces Brenner to let him and Joyce enter the Upside Down to find Will... unaware that Brenner plans to recover Jane no matter what it takes. Meanwhile, Nancy and Jonathan prepare to trap the monster at the Byers house, but receive an unexpected visitor.</p>",
                    "_links": {
                        "self": {
                            "href": "http://api.tvmaze.com/episodes/578669"
                        }
                    }
                }
            ]
        }
    }
}

test('App component initially renders with fetching data', async () => {
    mockFetchShow.mockResolvedValueOnce(show);

    const { getByText } = render(
        <App />
    )

    // Check to see if fetching data while <!show> renders
    getByText(/fetching data.../i);

    // Check to see if App component renders after fetching data
    await wait(() => {
        getByText(/select a season/i);
    })
})

test('Drop down works on click', async () => {
    mockFetchShow.mockResolvedValueOnce(show);

    const { getByText } = render(
        <App />
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    getByText(/season 1/i);
})

test('Season 1 displays after selecting from drop down', async () => {
    mockFetchShow.mockResolvedValueOnce(show);

    const { getByText } = render(
        <App />
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    const select = getByText(/season 1/i);
    fireEvent.mouseDown(select);

    // Assert that episodes are displaying for season one
    expect(getByText(/chapter eight/i)).toHaveTextContent(/the upside down/i);
})