'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {Card, CardHeader, CardBody, CardFooter, Input, Divider, Button, ButtonGroup} from "@nextui-org/react";

export default function Memo() {
    const router = useRouter()
    const id = useSearchParams().get("id");

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
        fetch('/api/memo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: inputTitle.current?.value, content: inputContent.current?.value}),
        }).then((res) => res.json())
        .then((json) => router.push("/memo/" + json.id))
        .catch(() => alert("error"));
    }

    const onClickDelete = async () => {
        fetch('/api/memo', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: inputTitle.current?.value, content: inputContent.current?.value}),
        }).then((res) => res.json())
        .then((json) => router.push("/"))
        .catch(() => alert("error"));
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