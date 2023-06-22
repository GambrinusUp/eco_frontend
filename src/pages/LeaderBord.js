import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./style.module.css";
import {Pagination} from "antd";
import LeaderItem from "../components/LeaderItem";
import {ratingsUsersThunkCreator} from "../store/ratingsReducer";

const LeaderBord = () => {
    const dispatch = useDispatch()
    const ratings = useSelector((state) => state.ratings.usersRatings.users_ratings)
    const paginate = useSelector((state) => state.ratings.usersRatings)
    const [pageNum, setPageNum] = useState(1)

    function paginationSwitch(page, count){
        setPageNum(page)
    }

    useEffect(()=>{
        dispatch(ratingsUsersThunkCreator(localStorage.getItem("token"), pageNum))
    }, [dispatch, pageNum])

    if(!ratings){
        return(
            <div className={styles.chatsText} />
        )
    }
    return (
        <div className={styles.cardDeck}>
            <div className={styles.chatsFormBackground}>
                <div className={styles.chatTitle}>Топ эковложений</div>
                {ratings && ratings.map(thread =>
                    <LeaderItem data={thread}/>
                )}
                <Pagination className={styles.pagination}
                            onChange={paginationSwitch}
                            defaultCurrent={1}
                            total={paginate.pageInfo.pageCount * 10} />
            </div>

        </div>
    )
};

export default LeaderBord;