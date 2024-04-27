/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { githubRequest } from "../assets/GitHubRequest"

let repoList = []

const UserDetails = ({ user }) => {
    const [repoList, setRepoList] = useState([])

    const findUsersDetails = async (username) => {
        const url = 'https://api.github.com/users/' + username + '/repos'
        try {
            const result = await githubRequest(url)
            setRepoList(result)
        } catch (error) {
            console.error('Erreur lors de la requête API :', error)
        }
    }
    useEffect(() => {
        if (user !== null) {
            findUsersDetails(user.login)
        }
    }, [user])

    if (!user) {
        return <div></div>
    }

    return (
        <div className="userDetails">
            <img src={user.avatar_url} alt={user.login} />
            <p>{user.login}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <div>
                <h3>Repositories ({repoList.length})</h3>
                <ul>
                { repoList.map((repo, index) => (
                        <li key={index}>
                            <a href={repo.svn_url} target="_blank">{repo.name}</a>
                            <p>{repo.description}</p>
                        </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default UserDetails
