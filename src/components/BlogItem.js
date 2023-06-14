import {Button, Card} from "antd";
import {Link} from "react-router-dom";

function BlogItem(props) {
    return(
        <>
            <Card style={{margin: "auto 0", marginTop: "15px"}}
                  id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{marginRight: "auto", display: "flex", flexDirection: "column", width:"100%"}}>
                        <div className={"author"} style={{color:"#424242"}}>
                            {props.first_name} {" "} {props.last_name}
                        </div>
                        <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:16, marginTop:10}}>
                            {props.blog_title}
                        </div>
                        <div className={"description"} style={{color:"#888888", fontSize:12, marginTop:10}}>
                            {props.blog_description}
                        </div>
                        <Link to={`/blog/${props.blog_id}`} style={{width:"100%"}}>
                            <Button type={"primary"} style={{backgroundColor:"#6D8251",
                                marginTop:10}}>
                                Read more
                            </Button>
                        </Link>
                    </div>
                    {props.blog_avatar && true && (
                        <div style={{marginLeft: "auto", width:"40%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        {props.blog_avatar}
                    </div>)}
                </div>
            </Card>
        </>
    )
}

export default BlogItem;