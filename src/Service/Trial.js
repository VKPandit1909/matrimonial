// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import LoginInsideHeader from "../Components/LoginInsideHeader";
// import { fetchUsers,filterValues } from "./Actions/Actions";
// function Trial({ userData, fetchUsers,filterValues }) {
//   console.log(userData, "data");
//   useEffect(() => {
//     fetchUsers()
//     filterValues()

//   }, []);
//   return userData.loading ? (
//     <h2>Loading</h2>
//   ) : userData.error ? (
//     <h2>{userData.error}</h2>
//   ) : (
//     <div>
//       User List

//       <div>
//         {userData &&
//           userData.users &&
//           userData.users.map((user) => {
//             console.log(user, "adarsh");
//             return(
//                 <div>{user.about}</div>
//             )
//           })}
//       </div>
//     </div>
//   );
// }
// const mapStateToProps = state => {
//     console.log(state,'state')
//   return {
//     userData: state.user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUsers: () => dispatch(fetchUsers()),
//     filterValues: () => dispatch(filterValues()),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Trial);

import React from "react";
const initialTodo = [
  { id: "a", task: "Do Something", complete: false },
  { id: "b", task: "Walk over here", complete: false },
];
const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      console.log(action, "trail");
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "UNDO_TODO":
      console.log(action, "trail");

      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};
const Trial = () => {
  const [todos, dispatch] = React.useReducer(todoReducer, initialTodo);
  const handleChange = (todo) => {
    dispatch({ type: todo.complete ? "UNDO_TODO" : "DO_TODO", id: todo.id });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleChange(todo)}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};
export default Trial;
