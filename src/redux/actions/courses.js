import * as actionTypes from "../actionTypes";

const requestCourse = (uuid) => {
  return {
    type: actionTypes.REQUEST_COURSE,
    uuid
  }
};

const receiveCourse = (uuid, data) => {
  return {
    type: actionTypes.RECEIVE_COURSE,
    uuid,
    data
  }
};

export const fetchCourse = (uuid) => async (dispatch, getState, api) => {
  const state = getState();
  let courseData = state.courses.data[uuid];

  // don't fetch again
  if (courseData)
    return;

  // request action
  dispatch(requestCourse(uuid));

  // perform request
  courseData = await api.getCourse(uuid);

  // receive action
  dispatch(receiveCourse(uuid, courseData));
};


const requestCourseSearch = (query, page) => {
  return {
    type: actionTypes.REQUEST_COURSE_SEARCH,
    query,
    page
  }
};

const receiveCourseSearch = (query, page, data) => {
  return {
    type: actionTypes.RECEIVE_COURSE_SEARCH,
    query,
    page,
    data
  }
};

export const fetchCourseSearch = (query, page) => async (dispatch, getState, api) => {
  const state = getState();
  let courseSearchData = state.courses.searches[query];

  // don't fetch again
  if (courseSearchData)
    return;

  // request action
  dispatch(requestCourseSearch(query, page));

  // perform request
  courseSearchData = await api.searchCourses(query, page);

  // receive action
  dispatch(receiveCourseSearch(query, page, courseSearchData));
};