import { useState,useEffect} from 'react';
import { addTodo, deleteTodo,completeTodo,editTodo} from '../action/index';
import { useDispatch,useSelector} from 'react-redux';
import delete_icon from './images/Trash.svg';
import complete_green_icon from './images/Check_Green.svg';
import complete_black_icon from './images/Check_Black.svg';
import edit_icon from './images/Pencil.svg';
import './style.css'


export default function Todo() {
    const [inputData,setInputData]=useState('');

    const dispatch = useDispatch();

    const list= useSelector((state)=>state.todoReducer.list);

    useEffect(()=>{
        window.localStorage.setItem("todo_task",JSON.stringify(list));
    },[list])


  return (

    <div>

        <div className='heading'>
            <div>
            <label>T</label>
            </div>
            <div>
            <label>O</label>
            </div>
            <div>
            <label>D</label>
            </div>
            <div>
            <label>O</label>
            </div>
        </div>

        <div className='input_todo'>

            <div>
                <input  placeholder='Create your todo' value={inputData} onChange={(event)=> setInputData(event.target.value)}/>
            </div>

            <div>
                <button onClick={()=>inputData!=="" && dispatch(addTodo(inputData),setInputData(''))}>+</button>
            </div>

        </div>

        <div className='todo_items'>

            {
                list.map((elem)=>{
                    return (

                        <div key={elem.id} className='todo_task'>

                            <div>
                                <button className='complete' onClick={()=> dispatch(completeTodo(elem.id))}>
                                    <img src={elem.complete?complete_green_icon:complete_black_icon} alt='complete_icon' width={30}></img>
                                </button>
                            </div>

                            <div className='item'>
                                {elem.complete?<h1><del>{elem.data}</del></h1>:<h1>{elem.data}</h1>}
                            </div>

                            <div>
                                <button className='delete' onClick={()=> dispatch(deleteTodo(elem.id))} >
                                    <img src={delete_icon} alt='delete_icon' width={30}></img>
                                </button>
                            </div>

                            <div>
                                <button className='edit' onClick={()=> dispatch(editTodo(elem.id))}>
                                    <img src={edit_icon} alt='edit_icon' width={30}></img>
                                </button>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}


