import { useState, useEffect } from 'react';
import { Card } from './Components/Card.jsx';
import { Comment } from './Components/Comment.jsx'
import world from './assets/world.gif';
import letters from './assets/UMG_letters.png';
import './App.css';

const fetchData = async (path) => {
  const ORIGIN = 'http://localhost:3000/';
  try {
    const resp = await fetch(`${ORIGIN}${path}`);
    
    if (resp?.ok) {
      const data = await resp.json();
      return data;
    } else {
      console.error(`Error: ${resp.status} - ${resp.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Fetch error for ${path}: `, error);
    return null;
  }
}

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log('data: ', data);

  useEffect(() => {
    (async () => {
      const posts = await fetchData('posts');
      const comments = await fetchData('comments');

      setData({
        posts,
        comments
      });
      setIsLoading(false);
    })()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={world} className="world-logo" alt="logo" />
          <div className="text-bckg"></div>
          <img src={letters} className="letter-logo" alt="logo" />
        </div>
        <div>
          <h1>Docker Test</h1>
        </div>
      </header>
      <div className="App-body">
        {
          !isLoading && data
          && data?.posts
          && !!data.posts.length && data.posts.map(post => {
          const postCom = data.comments.filter(com => {
            return com.postId === post.id
          });
          
          return (
            <Card 
            key={post.id}
            title={post.title}
            content={post.content}
            >
            <hr/>
            <h4>Comments:</h4>
              {
                !!postCom.length && postCom.map(com => {
                  console.log('What the!')
                  return (<Comment
                    author={com.author}
                    date={com.date}
                    body={com.body}
                  />)
                })
              }
            </Card>
          )
        })}
      </div>
    </div>
  );
}

export default App;
