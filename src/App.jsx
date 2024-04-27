import { useState } from "react"
import SearchBar from "./components/SearchBar"
import UsersList from "./components/UsersList"
import Button from "./components/Button"
import UserDetails from "./components/UserDetails"
import { githubRequest } from "./assets/GitHubRequest"

const App = () => {
  const [users, setUsers] = useState(null)

  const [newSearch, setNewSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const searchUsers = async () => {
    const url = 'https://api.github.com/search/users?q=' + newSearch
    try {
      const result = await githubRequest(url)
      setUsers(result)
      setSelectedUser(null)
    } catch (error) {
      console.error('Erreur lors de la requête API :', error)
    }
  }

  const findUsersDetails = async (username) => {
    const url = 'https://api.github.com/users/' + username
    try {
        const result = await githubRequest(url)
        setSelectedUser(result)
    } catch (error) {
        console.error('Erreur lors de la requête API :', error)
    }
  }

  

  return (
    <>
      <div className="main">
        <div className="global">
          <h1>GitHub Inspector</h1>
          <SearchBar onChange={(e) => setNewSearch(e.target.value)}/>
          <Button onClick={searchUsers} />
          <UsersList users={users} onSelectUser={findUsersDetails} />
        </div>
        <div className="detail">
          <UserDetails user={selectedUser} />
        </div>
      </div>
    </>
  )
}

export default App
