import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Content from "./content";
import {Layout,Typography} from "antd";

const MusicDetail = () => {

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
            console.log(data.songs[0].al.picUrl);
        }
        detail();
    },[])

    return (
        <Content style={{marginLeft:"15vw",marginRight:"15vw"}}>
            <div style={{float:"left",display:"flex",marginTop:"20px"}}>
                <img src={imgUrl} style={{width:"150px",height:"150px",borderRadius:"50%",border:"3px solid #F9F9F9"}}/>
                <Typo>
                    <span style={{marginLeft:"20px",}}>{songs.name}</span>
                </div>
            </div>
        </Content>
    );
};

export default MusicDetail;
