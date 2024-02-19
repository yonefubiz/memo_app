'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {Card, CardHeader, CardBody, CardFooter, Input, Divider, Button, ButtonGroup} from "@nextui-org/react";

export default function Memo() {
    const router = useRouter()
    // ダイナミックルーティングのパラメータの取得
    const id = useParams().id;
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputContent = useRef<HTMLInputElement>(null);
    const [data, setData] = useState({title:"",content:""});

    useEffect(() => {
      fetch(id ? "/api/memo/" + id : "")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch(() => alert("error"));
    }, [id]);
    
    const onClickSave = async () => {
        const res = await fetch(id ? '/api/memo/' + id : "", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: inputTitle.current?.value, content: inputContent.current?.value}),
        });
        if(res.ok){
            alert("saved");
        }else{
            alert("error");
        }
    }

    const onClickDelete = async () => {
        const res = await fetch(id ? '/api/memo/' + id : "", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(res.ok){
            alert("deleted");
            router.push("/");
        }else{
            alert("error");
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <Input label="Title" defaultValue={data.title}/>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input label="Content" defaultValue={data.content}/>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <ButtonGroup>
                        <Button onClick={() => {onClickSave()}}>Save</Button>
                        <Button onClick={() => {onClickDelete()}}>Delete</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </main>
    );
}