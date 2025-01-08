const Users = ({ blogs }) => {
  const userCounts = blogs
    .map((blog) => blog.user.name)
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userCounts).map((user) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{userCounts[user]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
