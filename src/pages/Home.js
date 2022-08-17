import { EmptyActivity, PlusIcon } from "../components/icons";
import Layout from "../components/layout";
import HeaderActivity from "../components/organism/activity/header";
import styles from "../styles/pages/home.module.css";
import { useEffect, useState } from 'react';
import CardActivity from "../components/organism/activity/cardActivity";
import { getActivity, addActivity, deleteActivity } from "../action/activity";
import ModalDelete from "../components/organism/activity/modalDelete";
import Button from "../components/elements/button";
import Loading from "../components/elements/loading";
import Alert from '../components/elements/alert/alert';



export default function Home(){
    const [activitys, setActivitys] = useState([]);
    const [activityToDeleted, setActivityToDeleted] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        const response = await getActivity();
        setActivitys(response.data);
        setLoading(false);
    }
    const handleAddActivity = async () => {
        const response = await addActivity();
        if(response.status !== 'failed'){
            fetchData();
        } 
    }
    const handleDeleteActivity = async (id) => {
        const response = await deleteActivity(id);
        if(response.status !== 'failed'){
            fetchData();
            setShowModal(false);
            setTimeout(() => setShowAlert(true), 50);
        }
    }
    const handleFindActivity = (id) => {
        const findActivity = activitys.filter(activity => activity.id === Number(id));
        setActivityToDeleted(findActivity[0]);
        setShowModal(true);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return(
        <Layout>
            <HeaderActivity title="Activity">
                <h1 data-cy="activity-title">Activity</h1>
                <Button onClick={handleAddActivity} background="primary" datacy="activity-add-button">
                    <PlusIcon />
                    Tambah
                </Button>
            </HeaderActivity>
            {loading ? <Loading /> : 
                activitys.length > 0 ? ( 
                    <div className={styles.allActivity}>
                        {activitys.map((act, index) => (
                            <CardActivity
                                createdAt={act.created_at}
                                findActivity={handleFindActivity}
                                id={act.id}
                                index={index}
                                title={act.title}
                            />
                        ))} 
                    </div> ) :

                    ( <div data-cy="activity-empty-state">
                        <EmptyActivity className={styles.emptyActivity} />                  
                    </div> )
            }
            <ModalDelete
                dataToDelete={activityToDeleted}
                showModal={showModal}
                setShowModal={setShowModal}
                handleDelete={handleDeleteActivity}
            />
            <Alert showAlert={showAlert} setShowAlert={setShowAlert}/>
        </Layout>
    )
}