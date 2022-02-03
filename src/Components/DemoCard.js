import React from "react";
import ReactDOM from "react-dom";
import { Pagination } from "antd";
import "./styles.css";
import "antd/dist/antd.css";

const pageSize = 6;

class App extends React.Component {
  state = {
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0
  };

  componentDidMount() {
    fetch("https://api.github.com/gists/public")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data,
          totalPage: data.length / pageSize,
          minIndex: 0,
          maxIndex: pageSize
        })
      );
  }

  handleChange = (page) => {
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    });
  };

  render() {
    const { data, current, minIndex, maxIndex } = this.state;
    return (
      <div className="App" style={{ marginTop: "20px" }}>
        <h1>Git Hub Accounts</h1>
        <ul>
          {data?.map(
            (data, index) =>
              index >= minIndex &&
              index < maxIndex && (
                <li
                  key={data.id}
                  style={{ lineHeight: "30px", fontWeight: "500" }}
                >
                  {data.owner.login}
                </li>
              )
          )}
        </ul>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={data.length}
          onChange={this.handleChange}
          style={{ bottom: "0px" }}
        />
      </div>
    );
  }
}



