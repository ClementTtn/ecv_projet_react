/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const UsersList = ({ users, onSelectUser }) => {
    const handleClick = (user) => {
        onSelectUser(user.login)
    }

    if (!users?.items?.length) {
        return ""
    }

    return (
        <div>
            <h3>Résultats : { users.total_count }</h3>
            <ul>
                { users.items.map((user, index) => (
                    <li key={index} onClick={() => handleClick(user)}>
                        <img src={user.avatar_url} alt={user.login} />
                        <p>{user.login}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList
