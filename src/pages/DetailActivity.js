import styles from '../styles/pages/detailactivity.module.css';
import Layout from '../components/layout';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { detailActivity } from '../action/activity';
import Header from '../components/organism/detailActivity/header';
import ModalAddTodo from '../components/organism/detailActivity/modalAddTodo';
import { EmptyTodo } from '../components/icons';
import TodoItem from '../components/organism/detailActivity/todoItems';
import Loading from '../components/elements/loading';
// import { getTodoActivity } from '../action/todo';


export default function DetailAcivity(){
    let { id } = useParams(); 
    const [activity, setActivity] = useState({});
    const [titleActivity, setTitleActivity] = useState('');
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [filterName, setFilterName] = useState('Terbaru');

    const [loading, setLoading] = useState(true);

    const getDetailActivity = useCallback( async () => {
        const response = await detailActivity(id);
        setActivity(response);
        setTitleActivity(response.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const compareStringForSort = (a, b)  => {
        return a.title < b.title ? -1  : a.title > b.title ? 1 : 0;
    }
    const handleFilterTodoItem = () => {
        let todo_items= [];
        
        switch(filterName){
            case 'Terlama' : 
                todo_items = activity?.todo_items?.sort((a,b) => a.id - b.id);
                setActivity({...activity, todo_items});
                break;
            case 'Terbaru' : 
                todo_items = activity?.todo_items?.sort((a,b) => b.id - a.id);
                return setActivity({...activity, todo_items});
            case 'A-Z':
                todo_items = activity.todo_items.sort(compareStringForSort);
                return setActivity({...activity, todo_items});
            case 'Z-A':
                todo_items = activity.todo_items.sort(compareStringForSort).reverse();
                return setActivity({...activity, todo_items});
            case 'Belum Selesai':
                todo_items = activity.todo_items.sort((a,b) => a.is_active - b.is_active);
                return setActivity({...activity, todo_items});
            default :
                return;   
        }
    }
    useEffect(() => {
        getDetailActivity();
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDetailActivity]);

    useEffect(() => {
        if(!loading){
            handleFilterTodoItem();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterName, loading, getDetailActivity]);
    return(
        <Layout>
            <Header 
                styles={styles}
                activity={activity}
                setActivity={setActivity}
                setShowModal={setShowModalAdd}
                titleActivity={titleActivity} 
                setTitleActivity={setTitleActivity}
                setFilter={setFilterName}
            />
            {loading ? 
                ( <Loading /> ) :
                (activity?.todo_items?.length > 0 ? 
                    <TodoItem 
                        getDetailActivity={getDetailActivity}
                        activity={activity} 
                        setActivity={setActivity}
                    />
                     :
                     <div data-cy="todo-empty-state">
                         <EmptyTodo className={styles.emptyTodoIcon} />
                     </div>
                )
            }
            <ModalAddTodo 
                id={id}
                getAllTodo={getDetailActivity} 
                showModal={showModalAdd} 
                setShowModal={setShowModalAdd} 
            />
            
        </Layout>
    )
}

