'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {Card, CardHeader, CardBody, CardFooter, Input, Divider, Button, ButtonGroup, Spinner} from "@nextui-org/react";

export default function Memo() {
    const router = useRouter()
    // ダイナミックルーティングのパラメータの取得
    const id = useParams<{id: string}>().id;
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputContent = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<{title:string,content:string} | null>(null);

    useEffect(() => {
        if(id){
            fetch("/api/memo/" + id)
                .then((res) => res.json())
                .then((json) => setData({title:json.title,content:json.content}))
                .catch(() => alert("error"));
        }
    }, [id]);

    const onClickSave = async () => {
        const res = await fetch('/api/memo/' + id, {
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
            {!data ? <Spinner />:
            <Card className="max-w-[800px]" fullWidth>
                <CardHeader className="flex gap-3">
                    <Input label="Title" defaultValue={data.title} ref={inputTitle}/>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input label="Content" defaultValue={data.content} ref={inputContent}/>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <ButtonGroup>
                        <Button onClick={() => {onClickSave()}}>Save</Button>
                        <Button onClick={() => {onClickDelete()}}>Delete</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
            }
        </main>
    );
}