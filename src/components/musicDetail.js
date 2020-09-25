import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Content from "./content";
import {Layout,Typography,Button} from "antd";
import {PlayCircleOutlined} from '@ant-design/icons'

const MusicDetail = ({setMusicUrl}) => {

    const {Content} = Layout;
    const {id} = useParams();
    const [songs,setSongs] = useState({});
    const [imgUrl,setImgurl] = useState("");

    useEffect(()=>{
        const detail = async () => {
            const res = await fetch(`http://121.196.180.250:3000/song/detail?ids=${id}`);
            const data = await res.json();
            setSongs(data.songs[0]);
            setImgurl(data.songs[0].al.picUrl)
            console.log(data.songs[0]);
        }
        detail();
    },[id]);

    const play1 = async () => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicUrl(data.data[0].url);
    }

    const {Title,Text,Paragraph} = Typography;

    return (
        <Content style={{marginLeft:"15vw",marginRight:"15vw",background:"white",height:"1000px"}}>
            <div style={{float:"left",display:"flex",marginTop:"20px",marginLeft:"30px"}}>
                <img src={imgUrl} style={{width:"170px",height:"170px",borderRadius:"50%",border:"5px solid",padding:"5px"}} alt={id}/>
                <Typography style={{marginLeft:"30px",float:"left"}}>
                    <Title level={1} style={{fontFamily: "title", float: "left"}}>{songs.name}</Title>
                    {songs.ar && <div>
                        <Paragraph style={{float:"left",fontFamily:"text"}}>歌手:
                            {songs.ar.map((item,index)=>{
                                return <span key={index}>{item.name}</span>
                            })}
                        </Paragraph>
                    </div>}
                    <Button type={"primary"} shape={"round"} style={{marginTop:"30px",float:"left"}} onClick={()=>{play1()}}><PlayCircleOutlined />播放</Button>
                </Typography>
            </div>
        </Content>
    );
};

export default MusicDetail;
