import React, { PropTypes } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as courseActions from '../../actions/courseActions';
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

  // courseRow(course, index) {
  //   return <div key={index}>{course.title}</div>;
  // }

  // redirectToAddCoursePage() {
  //   browserHistory.push('/course');
  // }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave(){
    alert(`Saving ${this.state.course.title}`);
  }

  render() {
    const { courses } = this.props;

    return (
      <div>
        <h1>Courses</h1>
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

// CoursesPage.propTypes = {
//   courses: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// };

// function mapStateToProps(state, ownProps) {
//   return {
//     courses: state.courses
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(courseActions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
export default CoursesPage;
