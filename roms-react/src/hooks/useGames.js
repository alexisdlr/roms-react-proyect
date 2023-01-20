import { useEffect, useState } from "react"

export const useGames = (id) => {
  const [games, setGames] = useState([])
  console.log(id)
  const url = id ? 'http://localhost:8800/api/games?consoleId='+id: 'http://localhost:8800/api/games'
  console.log(url)

  const getGames = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => setGames(data))
  }

  useEffect(() => {
    getGames()
  }, [])

  return {games}
}