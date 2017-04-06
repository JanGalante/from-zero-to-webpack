import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions'; // all exports will be a property on courseActions, like courseActions.createCourse
// import CourseList from './CourseList';
// import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    // the constructor is a goog place to init state
    super(props, context);
    //this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.state = {
      course: { title: '' }
    }

    // make the bind in the constructor is the recomended pattern
    // since it gives better performance
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // redirectToAddCoursePage() {
  //   browserHistory.push('/course');
  // }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    // alert(`Saving ${this.state.course.title}`);
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    // this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    const { courses } = this.props;

    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        {/*<input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>*/}
        <h2>Add course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          /*onChange={this.onTitleChange.bind(this)} // avoid bind here, since it create a new functon and give performance issues */
          value={this.state.course.title} />

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

// validation
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // dispatch: PropTypes.func.isRequired, //connect give you access to the dispatch propterty when not sending the parameter mapDispatchToProps... this.props.dispatch
  // createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired, // bindActionCreators returns an object
};

function mapStateToProps(state, ownProps) {
  // return object with properties that we want to be exposed in our component

  
  return {
    courses: state.courses // state.courses is the property in the root reducer
  };

  //reduc helper function
}

function mapDispatchToProps(dispatch) {
  // manually using dispatch
  // return {
  //   createCourse: course => dispatch(courseActions.createCourse(course))
  // };

  //redux helper function
  return {
    // mapping to all actions in courseActions
    actions: bindActionCreators(courseActions, dispatch)
  };
}


// export a component that is decorated with the react-reduct connect function
// components that can inteact with redux... container component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// the above is the same as...
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);

// you can skip the mapDispatchToProps
// then connect give you access to the dispatch propterty... this.props.dispatch
// export default connect(mapStateToProps)(CoursesPage); 


