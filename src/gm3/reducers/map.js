/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 Dan "Ducky" Little
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** Tracks the state of the map.
 *
 */

import { MAP } from '../actionTypes';

import * as util from '../util';

const default_view = {
    center: [0, 0],
    resolution: 1000,
    coords: [0, 0],
    extent: null,
    activeSource: null,
    interactionType: null,
    selectionFeatures: []
};

export default function mapReducer(state = default_view, action) {
    switch(action.type) {
        case MAP.MOVE:
            // 'extent' should be null except for the case when it is being
            //  set in order to zoom there.  After the 'zoom' action happens
            //  it is reset to null.
            const new_view = {
                extent: null
            };
            for(const key of ['center', 'zoom', 'resolution']) {
                if(action[key]) {
                    new_view[key] = action[key];
                }
            }
            return Object.assign({}, state, new_view);
        case MAP.ZOOM_TO_EXTENT:
            return Object.assign({}, state, {extent: {bbox: action.extent, projection: action.projection}});
        case MAP.CURSOR:
            return Object.assign({}, state, {coords: action.coords});
        case MAP.CHANGE_TOOL:
            return Object.assign({}, state, {
                activeSource: action.src, 
                interactionType: action.tool
            })
        case MAP.ADD_SELECTION_FEATURE:
            return Object.assign({}, state, {
                selectionFeatures: [action.feature].concat(state.selectionFeatures)
            });
        case MAP.CLEAR_SELECTION_FEATURES:
            return Object.assign({}, state, {
                selectionFeatures: []
            });
        default:
            return state;
    }
};
