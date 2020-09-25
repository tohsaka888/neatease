import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Content from "./content";
import {Layout,Typography,Button} from "antd";
import {PlayCircleOutlined} from '@ant-design/icons'
import Lyric from 'lyric-parser';

const MusicDetail = ({setMusicUrl}) => {

    const {Content} = Layout;
    const {id} = useParams();
    const [songs,setSongs] = useState({});
    const [imgUrl,setImgurl] = useState("");
    const [text,setText] = useState([]);
    const [start,setStart] = useState("");

    useEffect(()=>{
        const detail = async () => {
            const res = await fetch(`http://121.196.180.250:3000/song/detail?ids=${id}`);
            const data = await res.json();
            setSongs(data.songs[0]);
            setImgurl(data.songs[0].al.picUrl)
        }
        const lyric = async () => {
            const res = await fetch(`http://121.196.180.250:3000/lyric?id=${id}`);
            const data = await res.json();
            if(data.lrc){
                let lyric = new Lyric(data.lrc.lyric);
                console.log(lyric)
                setText(lyric.lines);
            }else{
                setText(["这首歌目前没有歌词哦"])
            }
        }
        detail();
        lyric();
    },[id]);

    const play1 = async () => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicUrl(data.data[0].url);
    }

    const {Title,Paragraph} = Typography;

    return (
        <Content style={{marginLeft:"15vw",marginRight:"15vw",background:"white"}}>
            <div style={{float:"left",display:"flex",marginTop:"20px",marginLeft:"30px"}}>
                <img src={imgUrl} style={{width:"170px",height:"170px",borderRadius:"50%",border:"5px solid",padding:"5px"}} alt={id}/>
                <Typography style={{marginLeft:"50px"}}>
                    <Title level={1} style={{fontFamily: "title", float: "left",textAlign:"left"}}>{songs.name}</Title>
                    {songs.ar &&
                        <div>
                            {songs.ar.map((item,index)=>{
                                return <div key={index} style={{float:"left",fontFamily:"text",width:"50vw"}}><span style={{float:"left",fontSize:"18px"}}>歌手:{item.name}</span></div>
                            })}
                        </div>
                    }
                    <Button type={"primary"} shape={"round"} style={{float:"left",marginTop:"30px"}} onClick={()=>{play1()}}><PlayCircleOutlined />播放</Button>
                    <Paragraph style={{float:"left",marginTop:"30px"}} ellipsis={{expandable:true,rows:30}}>
                        {text.map((item,index)=>{
                            return (
                                <Paragraph key={index} style={{float:"left",width:"26.3vw"}}>
                                    <span style={{float:"left"}}>{item.txt}</span>
                                </Paragraph>
                            )
                        })}
                    </Paragraph>
                </Typography>
            </div>
        </Content>
    );
};

export default MusicDetail;
