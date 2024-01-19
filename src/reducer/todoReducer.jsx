
const initialData = {
    list: JSON.parse(localStorage.getItem("todo_task"))|| []
};

const todoReducer= (state=initialData,action)=>{
    switch(action.type){


        case "ADD_TODO":
            const {id, data,complete}= action.payload;

            return {
                ...state,
                list:[
                    ...state.list,
                    {
                        id:id,
                        data:data,
                        complete:complete,
                    }]
            }


        case "DELETE_TODO":
            const newList = state.list.filter((elem)=>elem.id !== action.id)
            return  {
                ...state,
                list : newList
            }


        case "COMPLETE_TODO":
            const newListCompleteStatus = state.list.map((elem)=>{
                if(elem.id===action.id)
                {
                    return {...elem,complete:true};
                }
                return elem;
            });
            return {
                ...state,
                list:newListCompleteStatus
            }


        case "EDIT_TODO":
            const newListUpdate = state.list.map((elem)=>{
                if(elem.id===action.id && elem.complete===false)
                {
                    const previous_data=elem.data;
                    var newData = prompt();
                    if (newData===null)
                    {
                        newData= previous_data;
                    }
                    return {...elem,data:newData};
                }
                return elem;
            });
            return {
                ...state,
                list:newListUpdate
            }


        default: return state;
    }
}

export default todoReducer;