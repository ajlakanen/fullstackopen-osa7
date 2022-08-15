import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { useField } from "./hooks";

import styled from "styled-components";

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const FooterStyle = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} vote</p>
      <p>
        For more info, see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <FooterStyle>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </FooterStyle>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0,
    });
    navigate("/");
    props.setNotification(
      `A new anecdote "${content.input.value}" was created`
    );
    setTimeout(() => {
      props.setNotification("");
    }, 2000);
  };

  const handleResetclick = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <Input {...content.input} />
        </div>
        <div>
          author
          <Input {...author.input} />
        </div>
        <div>
          url for more info
          <Input {...info.input} />
        </div>
        <Button>create</Button>
        <Button onClick={handleResetclick}>reset</Button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <Page>
      <h1>Software anecdotes</h1>
      <Navigation>
        <Menu anecdotes={anecdotes} />
      </Navigation>
      {notification.length > 0 ? notification : <></>}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </Page>
  );
};

export default App;
