import * as types from './actionTypes'

// actions creators are convinient fuctions
export function createCourse(course) {
    return { type: types.CREATE_COURSE, course }; // return an action. action must have a type property
}