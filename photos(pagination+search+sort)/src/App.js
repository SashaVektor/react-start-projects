import React, { useEffect, useState } from 'react';
import Collection from './components/Collection';
import './index.scss';

const collectionsLink = 'https://5c3755177820ff0014d92711.mockapi.io/photo_collections';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`${collectionsLink}?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then((json) => {
        setCollections(json)
      })
      .catch(() => alert('Getting error'))
      .finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => 
          <li onClick = {() => setCategoryId(index)} key={index} className={categoryId === index ? 'active' : ''} >{obj.name}</li>)}
        </ul>
        <input className="search-input" value={searchValue}
          placeholder="Поиск по названию" onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      <div className="content">
        {isLoading ? <h2>Loading...</h2> : collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())
        ).map((obj, i) => <Collection key={i} {...obj} />)}
      </div>
      <ul className="pagination">
       {
        [...Array(5)]
        .map((_, i) => <li onClick={() => setPage(i + 1)} className = {page === i + 1 ? 'active' : ''}key={i}>{i + 1}</li>)
       }
      </ul>
    </div>
  );
}

export default App;
