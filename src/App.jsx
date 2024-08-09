import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import NoteList from "./components/NoteList/NoteList";
import NoteItem from "./components/NoteList/NoteItem/NoteItem";
import User from "./components/User/User";

function App() {
  const [notesArr, setNotesArr] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [title, setTitle] = useState('No title');
  
  
  const inputRef = useRef(null);
  const inputTitle = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesArr));
    localStorage.setItem("title", JSON.stringify(title));
  }, [notesArr, title]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      clickHandler()
    }
  }, [notesArr])

  const clickHandler = useCallback(() => {
    const inputVal = inputRef.current.value;
    if (inputVal.trim() !== "") {
      setNotesArr([...notesArr, inputVal]);
    } else {
      alert("Fild can`t be empty");
    }
    inputRef.current.value = "";
  }, [notesArr]);

  const deleteNote = useCallback(
    (event) => {
      const deletedNote = Number(event.target.getAttribute("data-index"));
      notesArr.splice(deletedNote, 1);
      setNotesArr([...notesArr]);
    },
    [notesArr]
  );

  const changeTitle = () => {
    setTitle(inputTitle.current.value);
    inputTitle.current.value = ''
  }
  console.log(notesArr)

  return (
    <>
      <div className="inputHolder">
        <input type="text" maxLength={20} ref={inputRef} onKeyDown={handleKeyDown}></input>
        <button onClick={clickHandler}>Add note</button>
      </div>
      {notesArr.length !== 0 && 
      <div className="inputHolder">
        <input type="text" ref={inputTitle}/>
        <button onClick={changeTitle}>Change title</button>
      </div>
      }
      <div className="usersHolder">
        <User/>
      </div>
        {notesArr.length === 0 ? (
          <p>User`s note list is empty</p>
        ) : (
          <NoteList title={title}>
            {notesArr.map((note, index) => (
              <NoteItem
                key={index}
                note={note}
                id={index}
                delete={(event) => deleteNote(event)}
              />
            ))}
          </NoteList>
        )}
    </>
  );
}

export default App;
