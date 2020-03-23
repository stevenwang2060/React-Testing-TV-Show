import React from 'react';
import { render } from '@testing-library/react';
import Episodes from './Episodes';

const testEpisode = [
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

test("Episodes renders the episode by component and rerenders with props", () => {
    const { rerender, queryAllByTestId } = render(
        <Episodes episodes = {[]}/>
    )
    expect(queryAllByTestId(/episodecontainer/i)).toStrictEqual([]);

    rerender(<Episodes episodes ={testEpisode}/>);
    expect(queryAllByTestId(/episodescontainer/i)).toHaveLength(1);
})