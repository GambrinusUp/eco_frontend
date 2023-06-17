import {Card, Carousel, Tag} from "antd";
import {CommentOutlined, DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadPostReactionsThunkCreator} from "../store/postsReducer";

function PostItem(props) {
    const id = props.id;
    const likes = useSelector((state) => state.posts.likes);
    const dislikes = useSelector((state) => state.posts.dislikes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPostReactionsThunkCreator(id));
    }, [dispatch]);

    return(
        <>
            <Card style={{margin: "auto 0", marginTop: "15px"}}
                  id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
                    <div style={{marginRight: "auto", display: "flex", flexDirection: "column", width: "100%"}}>
                        <div className={"author"} style={{color:"#424242"}}>
                            {props.first_name} {" "} {props.last_name}
                        </div>
                        <div style={{marginTop:10}}>
                            {props.post_tags && props.post_tags.map((value) => (
                                <Tag key={value.category_id} color="green">{value.category_name}</Tag>
                            ))}
                        </div>
                        <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:16, marginTop:10}}>
                            {props.post_title}
                        </div>
                        <div style={{paddingTop:10}}>
                            <Carousel autoplay style={{backgroundColor:"#A9BE8C"}}>
                                <div>
                                    <h3>1</h3>
                                </div>
                                <div>
                                    <h3>2</h3>
                                </div>
                                <div>
                                    <h3>3</h3>
                                </div>
                                <div>
                                    <h3>4</h3>
                                </div>
                            </Carousel>
                        </div>
                        <div className={"description"} style={{color:"#888888", fontSize:12, marginTop:10}}>
                            {props.post_description}
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", paddingTop:20}}>
                            <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                <LikeOutlined style={{fontSize:20, paddingRight:5}}/>
                                {likes && (likes)}
                            </div>
                            <CommentOutlined style={{fontSize:20}}/>
                            <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                <DislikeOutlined style={{fontSize:20, paddingRight:5}}/>
                                {dislikes && (dislikes)}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default PostItem;