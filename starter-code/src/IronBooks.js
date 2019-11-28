import React, { Component } from "react";
import users from "./users.json";
import Search from "./SearchForm";

class IronBooks extends Component {
  state = {
    users: users,
    query: "",
    studentChecked: false,
    teacherChecked: false
  };

  setQuery = query => {
    this.setState({
      query: query
    });
  };

  CheckStudentStatus = () => {
    this.setState({
      studentChecked: !this.state.studentChecked
    });
  };

  CheckTeacherStatus = () => {
    this.setState({
      teacherChecked: !this.state.teacherChecked
    });
  };

  render() {
    let filtered = this.state.users.filter(el =>
      el.firstName.includes(this.state.query)
    );

    if (this.state.studentChecked) {
      filtered = filtered.filter(el => el.role === "student");
    }

    if (this.state.teacherChecked) {
      filtered = filtered.filter(el => el.role === "teacher");
    }

    const singleUser = filtered.map((value,index) => {
      return (
        <tr key={index}>
          <td>{value.firstName}</td>
          <td>{value.lastName}</td>
          <td>{value.campus}</td>
          <td>{value.role}</td>
          {value.linkedin && (
            <td>
              <a href={value.linkedin}>
                <img width="20px" src="../linkedin.png" alt="Linkedin" />
              </a>
            </td>
          )}
        </tr>
      );
    });

    return (
      <div>
        <Search setQuery={this.setQuery} query={this.state.query} />
        <label htmlFor="student">Student</label>
        <input
          type="checkbox"
          name="student"
          checked={this.state.CheckStudentStatus}
          onChange={this.CheckStudentStatus}
          value="student"
        />
        <label htmlFor="teacher">Teacher</label>
        <input
          type="checkbox"
          name="teacher"
          checked={this.state.CheckTeacherStatus}
          onChange={this.CheckTeacherStatus}
          value="teacher"
        />

        <table
          style={{
            textAlign: "left",
            padding: "2px"
          }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>{singleUser}</tbody>
        </table>
      </div>
    );
  }
}

export default IronBooks;
