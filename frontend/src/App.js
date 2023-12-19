import {useEffect, useState} from 'react';
import axios from 'axios';
import { Map } from 'react-kakao-maps-sdk';

const TodoWriteForm = ({addTodo:_addTodo}) =>{

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = () => {
    if(newTodoTitle.trim().length===0) return;
    _addTodo(newTodoTitle);
    setNewTodoTitle("");
  };

  return(
    <div>
      <input 
        type="text" 
        placeholder="할일을 입력해주세요."
        value={newTodoTitle}
        onChange={(e)=>setNewTodoTitle(e.target.value)}  
      />
      <button onClick={addTodo}>할 일 추가</button>
    </div>
  )
}

const TodoListItem = ({todo, todos, index, removeTodo:_removeTodo, modifyTodo:_modifyTodo}) => {

  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo);

  const removeTodo = () => {
    _removeTodo(index)
  }

  const changeToEditMode = () => {
    setEditMode(true);
  }

  const changeToReadMode = () => {
    setEditMode(false);
  }

  const modifyTodo = () => {

    if(newTodoTitle.trim().length===0) return;

    _modifyTodo(index, newTodoTitle)
    changeToReadMode();
  } 

  return (
    <li>
      {editMode ? (
        <>
          <input 
            type="text" 
            placeholder="할일" 
            value={newTodoTitle}
            onChange={(e)=>setNewTodoTitle(e.target.value)}
          />
          &nbsp;
          <button onClick={modifyTodo}>수정완료</button> 
          &nbsp;
          <button onClick={changeToReadMode}>수정취소</button> 
        </>
        ) : (
          <>
            {todo}
            &nbsp;
            <button onClick={changeToEditMode}>수정</button>
          </>
        )}
      &nbsp;
      <button onClick={removeTodo}>삭제</button>
    </li>
  );
};

const TodoList = ({todos, removeTodo, modifyTodo}) => {
 return (
  <div>
    <ul>
      {todos.map((todo, index)=>(
        <TodoListItem 
          key={index} 
          index={index} 
          todo={todo}  
          removeTodo={removeTodo}
          modifyTodo={modifyTodo}
        />
      ))}
    </ul>
  </div>
 )
};

function App() {

  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 요청을 보내는 부분
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1/');
        setData(response.data);
      } catch (error) {
        console.log(error)
      } finally {
      }
    };
    // fetchData 함수 호출
    fetchData();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 호출됨

  console.log(data)

  const [todos, setTodos] = useState([]);

  const addTodo = (newTitle) =>{
    //입력시 빈값 체크
    if(newTitle.trim().length === 0) return;
    
    setTodos([...todos, newTitle])
    // setNewTodoTitle('');
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((todo,_index) => _index !== index);
    setTodos(newTodos)
  }

  const modifyTodo = (index, todo) => {
    const newTodos = todos.map((_todo,_index) => _index !== index ? _todo : todo);
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <TodoWriteForm 
        addTodo={addTodo}
      />
      <hr/>
      <TodoList todos={todos} removeTodo={removeTodo} modifyTodo={modifyTodo}/>
      <hr/>
      <span>{JSON.stringify(data)}</span>
    </div>
  );
}

export default App;
